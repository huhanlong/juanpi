define(["jquery"],function($){
    
        function register(){
        $(function(){
        //  var oBtn = document.getElementById("btn1");
        // var oInput = document.querySelectorAll("input");
        // var oAlert = document.querySelector("alert-danger");
        console.log($('#btn'));
        $("#btn").click(function(){
            // console.log("1")
        $.ajax({
            type:"post",
            url:"./../php/register.php",
            data:{
                    username:$('.login').find('input').eq(0).val(),
                    password:$('.login').find('input').eq(1).val(),
                    repassword:$('.login').find('input').eq(2).val(),
                    time:(new Date()).getTime()
            },
            success:function(result){
                var ojb = JSON.parse(result);
                
                $(".login").find(".alert-danger").show()
                // console.log($("login"))
                // oAlert.innerHTML=ojb.msg;
                if(ojb.code){
                    $(".alert-danger").attr('class',"danger")
                }else{
                    $(".alert-danger").attr('class',"success")
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
        })
        })
        
    }
    function vertifyFunc(){
        $(".login").find('alert-danger').hide();
        console.log("执行")
    }
return{
    register,
    vertifyFunc
}
})