define(["jquery"],function($){
    function download(){
        $(function(){
            $.ajax({
          url: "./../data/shopall.json",
          success: function(result){
            // console.log(result);
            var sidelist = result.list;
            //JQ创建节点，html部分如何写，这里也如何写
            for(var i = 0; i < sidelist.length; i++){
                // console.log(i)
              //JQ创建节点的函数，返回值就是这个节点
              var node = $(`<div class="solid">
               <a href="http://localhost:8800/html/shop.html?id=${sidelist[i].goods_id} " target="${sidelist[i].target}" style="color:#333"
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
        </div></a></div>`)
                node.appendTo($(".shopall-shop"));
            }
          },
          error: function(msg){
            console.log(msg);
          }
        })
       
      })
    }


    function colse(){
		
        $('.off').click(function(){
        // console.log('1')
    $('.begin-banner').hide();
});	
// })
}
    return{
        download,
        colse
    }
})