<?php
   header("Content-type:text/html;charset=utf-8");
   //模拟官方的请求状态返回格式
   $responseData = array("code" => 0, "msg" => "");

   //取出我们提交过来的数据
   $username = $_POST['username'];
   $password = $_POST['password'];

   //我们需要对我们提交过来的数据，做一个简单的验证
  if(!$username){
    $responseData['code'] = 1;
    $responseData['msg'] = "用户名不能为空";
    echo json_encode($responseData);
    exit;
  }

  if(!$password){
    $responseData['code'] = 2;
    $responseData['msg'] = "密码不能为空";
    echo json_encode($responseData);
    exit;
  }

   //验证用户名是否重名
  //1、链接数据库
  $link = mysql_connect("localhost", "root", "123456");

  //2、判断数据库是否链接成功
  if(!$link){
    echo "数据库链接失败";
    exit; //退出程序
  }

  //3、设置访问字符集
  mysql_set_charset("utf8");

  //4、选择我们要访问数据库
  mysql_select_db("qd2005");

  //5、登陆
  //加密
  $str = md5(md5(md5($password).'qingdao')."qianfeng");

  $sql = "SELECT * FROM user WHERE username='{$username}' AND password='{$str}'";

  $res = mysql_query($sql);

  $row = mysql_fetch_assoc($res);

  if(!$row){
    $responseData['code'] = 3;
    $responseData['msg'] = "用户名或密码错误";
    echo json_encode($responseData);
    exit;
  }

  $responseData['msg'] = "登陆成功";
  echo json_encode($responseData);

  mysql_close($link);
?>
