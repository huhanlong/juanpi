define(["jquery","jquery-cookie"],function($){

            // console.log('1')


          function  tanchu(){
            var i =1
            
            var time = setInterval(function(){
            $(".jishiqi").show();  
               --i;
            if(i<0){
            clearInterval(time)
            $(".jishiqi").hide();
        }
    },1000)
          }
        function time(){
        setInterval(function(){
            var time = new Date()
              var time1 = new Date('2020/10/20')
              var a = time.getTime()
              // console.log(a)
              var b = time1.getTime()
              // console.log(b)
              var res = parseInt((b-a)/1000/60/60/24)
                var day=res
              // console.log(day)
            
              var res1 =parseInt( (b-a)/1000/60/60)
              var hour = res1-(res*24)
              // console.log(hour)
              var res2 =parseInt((b-a)/1000/60)
              // console.log(res2)
              var minit = res2-((day*24*60)+hour*60)
              // console.log(minit)
              var res3 =parseInt((b-a)/1000)
              var seconds = res3-((day*24*60*60)+(hour*60*60)+(minit*60))
            //   console.log(seconds)
              var ospan = document.getElementById("time-shop")
            //   console.log(ospan)
              ospan.innerHTML = `剩余：${day}天${hour}小时${minit}分钟${seconds}秒`
              },1000)
        }


        function valueByName(search,id){
                  var start = search.indexOf(id + '=');
                      // console.log(start)
                  if(start == -1){var end = search.indexOf('&',start)
                      if(end == -1){
                          end = search.length;
                      }
                      var str = search.substring(start,end);
                      var arr = str.split('=');
                      return arr[1];
                      
                  }else{
                      return null;
                  }
              } 
          // $(function(){
            
              function download(){
                sc_num();
                sc_msg();
                  $.ajax({
                    url: "./../data/shopall.json",
                    success: function(result){
                      // console.log(result);
                      var product_id=valueByName(location.search,"goods_id");
                      var sidelist = result.list;
                      // console.log(sidelist)
                      // console.log(product_id);
                      //JQ创建节点，html部分如何写，这里也如何写
                      for(var i = 0; i < sidelist.length; i++){
                          if(sidelist[i].goods_id == product_id){
                              // console.log("正确")
                          
                          // console.log(i)
                          // console.log(sidelist[i].shop_id)
                          //  if(sidelist[i] = product_id){
                              //  console.log(sidelist[i].pic_url)
                              
                              // console.log(sidelist[i].goods_id)
                              // console.log(i)
                              // var imgarr=sidelist[i].imgs;
                              // for( var j=0;j<imgarr.length;j++){
                        var node = $(`
                           <li class="one"><img src="${sidelist[i].pic_url}" alt="" name=""></li>
                           <li><img src="${sidelist[i].pic_url}" alt="" name=""></li>
                           <li><img src="${sidelist[i].pic_url}" alt="" name=""></li>
                           <li><img src="${sidelist[i].pic_url}" alt="" name=""></li>
                            `)
                           node.appendTo($("#fangda"));
                          var node2 = $(`
                          <img src="${sidelist[i].pic_url}" alt="" class="show">
                          <img src="${sidelist[i].pic_url}" alt="">
                          <img src="${sidelist[i].pic_url}" alt="">
                          <img src="${sidelist[i].pic_url}" alt="">
                          <div class="mark"></div>
                          `)
                          node2.appendTo($(".fangdajing-pic,.fangdajing-big"))

                          tabSwich();
                          // node2.appendTo($(".fangdajing-big"))
                              // }
                          //    console.log(sidelist[i].title)
                           var node1 = $(`<h1>${sidelist[i].title}</h1>
                      <div class="shop-body-content-price crl">
                          <span>￥${sidelist[i].cprice}</span>
                          <span>参考价:￥${sidelist[i].oprice}</span>
                          <span id="time-shop" class=" fr"> </span>
                      </div>`)
                      node1.appendTo($(".shop-body-content-Insert"));
          
                      var node2=$(`<li class="border-show"><img src="${sidelist[i].pic_url}" alt="">
                                          <span>棕色</span>
                                      </li>`)
                      node2.appendTo($(".shop-pic-color"))
                      var node3=$(`<button>立即购买</button>
                      <button id="${sidelist[i].goods_id}" class="sc_btn">加入购物车</button>`)
                      node3.appendTo($(".shop-body-content-button"))
                  }
                          // }else{
                          //     break;
                          // }
                          // console.log(i)
                        //JQ创建节点的函数，返回值就是这个节点
                        
                          
                         
                      }
                    },
                    error: function(msg){
                      console.log(msg);
                    }
                  })
                  $(".shop-body-content-button").on("click", ".sc_btn", function(){
                    //取出当前点击加入购物车按钮的id
                    tanchu()
                    var id = this.id;
                    // console.log(id)
                    var first = !($.cookie("goods"))
                    if(first){
                       $.cookie("goods", JSON.stringify([{id:id,num:1}]), {
                       expires: 7
                       });
                      }else{
                        var cookieArr = JSON.parse($.cookie("goods"));
                        // console.log(cookieArr)
                        var same = false; //假设没有相同的数据
                        // console.log("不同")
                        for(var i = 0; i < cookieArr.length; i++){
                          // console.log(cookieArr[i].id)
                          // console.log(id)
                          if(cookieArr[i].id == id){
                            same = true;
                            break;
                          }
                        }
                        same ? cookieArr[i].num++ : cookieArr.push({id:id, num: 1});

                        //3、将处理完的数据存储回去
                        $.cookie("goods", JSON.stringify(cookieArr), {
                          expires: 7
                        })
                      }
                      sc_msg();
                      sc_num();
                  })
                        
                  //加载购物车里面的数据
                  function sc_msg(){
                    var cookieStr = $.cookie("goods");
                    // console.log(cookieStr)
                    if(!cookieStr){
                      return;
                    }
                  
                  $.ajax({
                    url: "./../data/shopall.json",
                    success: function(arr){
                      var sideArr = arr.list
                      var cookieArr = JSON.parse(cookieStr);
                      // console.log(sideArr)

                      //精益求精  写算法
                      var newArr =[];
                      // console.log("1") 
                      // console.log(cookieArr)
                      for(var i = 0; i < sideArr.length; i++){
                        // console.log(sideArr[i].goods_id)
                       
                        for(var j = 0; j < cookieArr.length; j++){
                          // console.log("1")
                          // console.log(sideArr[i].goods_id)
                          // console.log(cookieArr[j].id)
                          if(cookieArr[j].id == sideArr[i].goods_id){
                            // console.log("1")
                            sideArr[i].num = cookieArr[j].num;
                            // console.log(cookieArr.num)
                            newArr.push(sideArr[i]);
                            break;
                          }
                        }
                      }
                       //通过newArr。处理数据，将数据添加页面上
                           
                      //  function jiazai(){

                       
                            for(var i = 0; i < newArr.length; i++){
                              
                              // console.log()
                               $(` <div class="goods" id="${newArr[i].goods_id}">
                              <input type="checkbox" class="fl checkout" >
                              <img src="${newArr[i].pic_url}" alt="" class="fl">
                              <div class="goods-Content fl">
                                  <p>${newArr[i].title}</p>
                                  <p>36，黑色</p>
                              </div>
                              <div class="goods-price fl">
                                 <span class="danjia">￥${newArr[i].cprice}</span><span>/￥${newArr[i].oprice}</span>
                              </div>
                              <div class="goods-number fl">
                                  <div>-</div>
                                  <span>${cookieArr[i].num}</span>
                                  <div>+</div>
                              </div>
                              <div class="goods-count fl">
                                  ￥<span>${newArr[i].cprice * cookieArr[i].num}</span>
                              </div>
                              <div class="Operation fl">
                                  <span class="delete">✖</span>
                              </div>
                          </div>`).appendTo('.shopcar-car');
                          
                          }
                        // }
                        //  jiazai();
                          sc_num();
                          alltotle();
                          
                          $(".shopcar-car").on("click", ".goods-number div", function(){
                            // console.log(this)
                            // alltotle();
                            // console.log(newArr)
                            // for(var i=0;i<newArr.length;i++){
                            // console.log(newArr[i].cprice)
                              
                            // }
                            var id = $(this).closest(".goods").attr("id");
                            var cookieArr = JSON.parse($.cookie("goods"));
                            for(var i = 0; i < cookieArr.length; i++){
                              if(cookieArr[i].id == id){
                                break;
                              }
                            }
                            if(this.innerHTML == "+"){
                              cookieArr[i].num++;
                              // console.log(sideArr)
                            }else{
                              cookieArr[i].num == 1 ? alert("数量为1，不能减少") : cookieArr[i].num--;
                            }
                            $.cookie("goods", JSON.stringify(cookieArr), {
                              expires: 7
                            })
                            // console.log(this)
                            //修改页面上的数量
                            $(this).siblings("span").html(`${cookieArr[i].num}`);
                            // console.log(newArr[i].cprice * cookieArr[i].num)
                            // var totlecount=parseFloat(newArr[i].cprice * cookieArr[i].num)
                            // console.log(totlecount)
                            $('.shopcar-car').find(`#${newArr[i].goods_id} .goods-count span`).html(`${newArr[i].cprice * cookieArr[i].num}`);
                            // jiazai();
                            alltotle();
                             sc_num();
                          })
                        
                          
                                  },
                                  error: function(msg){
                                    console.log(msg);
                                  }
                                })
                            }

                            //给购物车的删除按钮添加点击
                        $(".shopcar-car").on("click", ".delete", function(){
                          console.log(this)
                          var id = $(this).closest(".goods").remove().attr("id");
                          //删除页面上的节点  从cookie中删除数据
                          var cookieArr = JSON.parse($.cookie("goods"));
                          for(var i = 0; i < cookieArr.length; i++){
                            if(cookieArr[i].id == id){
                              cookieArr.splice(i, 1);
                              break;
                            }
                          }
                          if(cookieArr.length){
                            $.cookie("goods", JSON.stringify(cookieArr), {
                              expires: 7
                            })
                          }else{
                            $.cookie("goods", null);
                                    }
                                //更新数据数量
                                sc_num();
                        })
                  
                      
                         
                          // console.log(total)
                              //处理数量
                              function sc_num(){
                                var cookieStr = $.cookie("goods");
                                var sum = 0;
                                if(cookieStr){
                                  var cookieArr = JSON.parse(cookieStr);
                                  // console.log(cookieArr)
                                  for(var i = 0; i < cookieArr.length; i++){
                                    sum += cookieArr[i].num;
                                    // console.log(cookieArr[i].num)
                                  }
                                }
                                // $(".shop")
                                $(".Settlement").find(".sc_num-all").html(sum);
                              }
                            
                          }
             
                       
              //放大
            
              function fangda(){
                $(function(){
                     $(".fangdajing-pic").mouseenter(function () {
                  $(".mark,.fangdajing-big").show();
                })
                $(".fangdajing-pic").mouseleave(function () {
                  $(".mark,.fangdajing-big").hide();
                })
                $(".fangdajing-pic").mousemove(function(ev){
                  var l = ev.clientX - $(this).offset().left - 100;
                  l = Math.max(0, l);
                  l = Math.min(l, 200);
                  var t = ev.clientY - $(this).offset().top -100;
                  t = Math.max(0, t);
                  t = Math.min(t, 200);
                  $(".mark").css({
                    left: l,
                    top: t
                  })
                  $(".fangdajing-big img").css({
                    left: -2 * l,
                    top: -2 * t
                  })
                }) 
                })
                 
              }




              function tabSwich(){
                var iMglist=document.querySelectorAll(".fangdajing ul li")
               var iMgshow=document.querySelectorAll(".fangdajing-pic img")
               var iMgshow1=document.querySelectorAll(".fangdajing-big img")
              //  console.log(iMgshow1)
              //  console.log(iMglist)
              //  console.log(iMgshow)
               // var index;
               iMglist.forEach(function(ietm,a,arr){
                   // console.log(ietm)
                   // console.log(arr)
                   ietm.onmouseover=function(){
                       for(var i=0;i<arr.length;i++){
                           arr[i].className = ' '
                           iMgshow[i].className = ' '
                           iMgshow1[i].className=''
                       }
                       ietm.className = 'one'
                       iMgshow[a].className = 'show'
                       iMgshow1[a].className = 'show'
                   }
               })
                   }
                         //计算购物车总价钱
                         function alltotle(){
                          var allChecks = $('.shopcar-car').find(".goods")
                         
                       var total = 0;
                       var totalcount = 0;
                       allChecks.each(function(index,item){
                        //  console.log(allChecks)
                        // console.log(item)
                        // totalcount[index]=$(item).find('.goods-price .danjia').html().trim()
                         total+=$(item).find('.goods-count span').html().trim()*1
                       })
                      //  console.log(total)
                       console.log(totalcount)
                       $(".alltotle").html(`￥${total}`);
                       $(".alltotle-s").html(`￥${total}`);
                       }
              //关闭
              function colse(){
		
                $('.off').click(function(){
                // console.log('1')
              $('.begin-banner').hide();
            });	
            // })
          }
        return{
          tabSwich,
          time,
          download,
          fangda,
          colse,
          alltotle,
          
        }
// tabSwich();
})