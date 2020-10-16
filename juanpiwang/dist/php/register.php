<?php
    header("Content-type:text/html;charset=uft-8");

    $responseData = array("code"=>0,"msg"=>"");

    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createTime = $_POST['time'];

    if(!$username){
        $responseData['code']=1;
        $responseData['msg']="用户名不能为空";
        echo json_encode($responseData);
        exit;
    }

    if(!$password){
        $responseData['code']=2;
        $responseData['msg']="密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    
    if($password!=$repassword){
        $responseData['code']=3;
        $responseData['msg']="两次密码输入不一致";
        echo json_encode($responseData);
        exit;
    }

    $link = mysql_connect("localhost","root","123456");

    if(!$link){
        echo "数据库连接失败";
        exit;
    }

    mysql_set_charset("utf8");

	//4、选择数据库
	mysql_select_db("qd2005");

	//5、准备sql语句
	$sql = "SELECT * FROM user WHERE username = '{$username}'";
    // echo $sql;
	//6、发送sql语句
    $res = mysql_query($sql);
    // var_dump($res);

    $row = mysql_fetch_assoc($res);
    // var_dump($row);
    if($row){
        $responseData['code']=4;
        $responseData['msg'] = "用户名已存在";
        echo json_encode($responseData);
        exit;
    }

    $str = md5(md5(md5($password).'qingdao')."qianfeng");

    $sql1 = "INSERT INTO user(username,password,createTime) VALUES('{$username}','{$str}',{$createTime})";
    // echo $sql1;
    $res1 = mysql_query($sql1);

    if(!$res1){
        $responseData['code'] = 5;
    $responseData['msg'] = "服务器忙";
    echo json_encode($responseData);
    exit;
    }
    $responseData['msg']="注册成功";
    echo json_encode($responseData);
    mysql_close($link);
    

?>