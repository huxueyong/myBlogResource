<?php
header('Content-Type: application/json;charset=UTF-8');

@$cb = $_REQUEST['callback'];

@$demoTypeId = $_REQUEST['typeId'];

if($demoTypeId===null){
    $demoTypeId=0;
}

require('init.php');

if($demoTypeId==0){
		$sql= "SELECT `demo_id`,`demo_name`,`demo_img`,`demo_preview_url`,`demo_git_url`,`demo_type_id`,`demo_type_name` FROM `demo_list` ORDER BY `demo_order`";
}else{
		$sql= "SELECT `demo_id`,`demo_name`,`demo_img`,`demo_preview_url`,`demo_git_url`,`demo_type_id`,`demo_type_name` FROM `demo_list` WHERE `demo_type_id`='$demoTypeId'  ORDER BY `demo_order`";
};

$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$resultStr=json_encode($list);
echo $cb.'('.$resultStr.')';