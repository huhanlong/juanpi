define(["jquery"],function($){

  function secondmenu(){
    $(function(){
      $.ajax({
        url:"./../data/1.json",
        success:function(result){
          var sidemenu = result;
          
          for(var i=0;i<sidemenu.length;i++){
            // console.log(sidemenu[i].id)
            var node = $(` <dd class="menu-dd" id="${sidemenu[i].id}"><a href="html/shopall.html" target="_blank">${sidemenu[i].txt}</a></dd>
            <div id="" class="second-menu second-menu${sidemenu[i].id}"></div>
            `)
            node.appendTo($(".banner-c-dl"));
            // console.log(node)
            
            var child = sidemenu[i].child
            var classify = child.classify
            console.log(classify)
            var node1 = $(`<h1>${child.title}</h1>
            <p>${classify}</p>
            <p>${classify}</p>
            <p>${classify}</p>
            <p>${classify}</p>
            <p>${classify}</p>
            <p>${classify}</p>
            `).appendTo($(`.second-menu${sidemenu[i].id}`))
          } tabmenu();
        }
      })
    })
  } 
  
      function tabmenu(){
        var menulist = $(".banner-c-dl").find(".menu-dd")
        var menulist2 = $(".banner-c-dl").find(".second-menu")
        // console.log(menulist2)
      menulist.each(function(index,ietm){
        
          // console.log(ietm1)
        ietm.onmouseenter=function(){
            $(menulist2[index]).show();
            
        }
         $(menulist2[index]).onmouseenter=function(){
              $(menulist2[index]).show();
              
            }
        ietm.onmouseleave=function(){
         
            $(menulist2[index]).hide();
      }

      })
      }
      
  function download(){
    $(function(){
        $.ajax({
      url: "./../data/shop.json",
      success: function(result){
        // console.log(result);
        var sidelist = result.list;
        //JQ创建节点，html部分如何写，这里也如何写
        for(var i = 0; i < sidelist.length; i++){
            // console.log(i)
          //JQ创建节点的函数，返回值就是这个节点
          var node = $(`<div class="solid">
           
            <div class="shop fl" style="" >
                <div class="heart">
                    <span class="iconfont icon-shoucang"></span>
                    </div>
        <img src="${sidelist[i].pic_url}" alt="">
        <p>
        <span class="fristmonney">￥${sidelist[i].cprice }</span>
        <span class="secondmonney">￥${sidelist[i].oprice}</span>
        </p>
        <p><span class="font fl"style=" ">${sidelist[i].title}</span> <span class="residue fr">${sidelist[i].residue}</span></p> 
    </div></div>`)
            node.appendTo($(".shop-all"));
        }
      },
      error: function(msg){
        console.log(msg);
      }
    })
    
    })
    } 

function ceiling(){
     var oDiv = document.querySelector('.Ceiling')
    // console.log(oDiv)
    var oAsde = document.querySelector('aside')
    window.onscroll=function(){
        var distent =parseInt(document.body.scrollTop||document.documentElement.scrollTop)
        if(distent>500){
            // console.log(distent)
            oDiv.style.top ='0px'
            // oAsde.style.display = 'block'
        }else{
            // oAsde.style.display = 'none'
            oDiv.style.top = '-50px'

        } 
      //   oAsde.onclick = function(){
      //   var i=0
      //  var timer= setInterval(function(){
      //      if( document.body.scrollTop>0||document.documentElement.scrollTop>0){
              
      //       (document.body.scrollTop)-=10;
      //       //  console.log( document.body.scrollTop)
      //       document.documentElement.scrollTop-=10
      //      }else{
      //       clearInterval(timer)
      //      }
      //   },10)
      //    }
    }

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
        var ospan =document.querySelectorAll("div #shop-time");
        // console.log(ospan)
        for(var i=0;i<ospan.length;i++){
          $(ospan[i]).html(`剩余：${day}天${hour}小时${minit}分钟${seconds}秒`)
        }
        
        // ospan.html(node);
        },1000)
  }
  return{
    download,
    ceiling,
    secondmenu,
    time
  }
})