<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
//@$ajaxHttpHost=$_SERVER["HTTP_REFERER"];//$_SERVER["REQUEST_HOST"];//$_SERVER["HTTP_HOST"];
@$snstId = $_REQUEST['snstId']; //or die('{"msg":"skillType request"}');

if($snstId===null){
		$snstId=3;
}

require('init.php');

$sql = "SELECT `sncourse_id`,`sncourse_name`,`sncourse_img`,`sncourse_number`,`sncourse_addtime`,`sncourse_resourceUrl`,`sncourse_resourcePwd`,`sncourse_isVip`,`sncsource_id`,`sncsource_name`,`snst_id`,`snst_name` FROM `study_note_course`,`study_note_skilltype`,`study_note_course_source` WHERE `sncourse_snstID`=`snst_id` AND  `sncourse_sncsourceID`=`sncsource_id` AND `snst_id`=$snstId";

$result = mysqli_query($conn,$sql);
$output= mysqli_fetch_all($result,MYSQLI_ASSOC); 

$outputStr=json_encode($output);
echo $cb.'('.$outputStr.')';