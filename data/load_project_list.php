<?php
header('Content-Type: application/json;charset=UTF-8');

@$cb = $_REQUEST['callback'];

@$projectType = $_REQUEST['type'];

if($projectType===null){
    $projectType=0;
}

require('init.php');

if($projectType==0){
		$sql= "SELECT `project_id`,`project_name`,`project_img`,`project_skillType` FROM `project_list` ORDER BY `project_order`";
}else{
		$sql = "SELECT `project_id`,`project_name`,`project_img`,`project_skillType` FROM `project_list` WHERE `project_type`='$projectType'  ORDER BY `project_order`";
};

$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$resultStr=json_encode($list);
echo $cb.'('.$resultStr.')';