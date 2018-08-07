<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
//@$ajaxHttpHost=$_SERVER["HTTP_REFERER"];//$_SERVER["REQUEST_HOST"];//$_SERVER["HTTP_HOST"];
@$sncourseId = $_REQUEST['sncourseId'] or die('{"msg":"sncourseId request"}');
require('init.php');
$sncourseMenu = [];
//sql1:先根据课程编号查出所有章节
$sql = "SELECT `sncsection_id`, `sncsection_name` FROM `study_note_course_section`,`study_note_course` WHERE `sncsection_sncourseId`=`sncourse_id` AND `sncourse_id`=$sncourseId ORDER BY `sncsection_order` ASC";

$result = mysqli_query($conn,$sql);
$output= mysqli_fetch_all($result,MYSQLI_ASSOC);
$outputlength=count($output);

if($outputlength!==0){
		for($i=0;$i<$outputlength;$i++){
				$sncsectionId=$output[$i]["sncsection_id"];
				$sncsectionName=$output[$i]["sncsection_name"];
				$sql="SELECT `sncc_id`,`sncc_name`,`sncourse_isVip` FROM `study_note_course_content`,`study_note_course` WHERE `sncourse_id`=`sncc_sncourseId` AND `sncc_sncsectionId`=$sncsectionId ORDER BY `sncc_order` ASC";
				$result = mysqli_query($conn,$sql);
				//$sncourseMenu[$sncsectionName]=mysqli_fetch_all($result,MYSQLI_ASSOC);
				$sncourseMenu[$i]=[$sncsectionName =>mysqli_fetch_all($result,MYSQLI_ASSOC)];
		}
}else{
		$sql="SELECT `sncc_id`,`sncc_name`,`sncourse_isVip` FROM `study_note_course_content`,`study_note_course` WHERE `sncourse_id`=`sncc_sncourseId` AND `sncc_sncourseId`=$sncourseId ORDER BY `sncc_order` ASC";
		$result1 = mysqli_query($conn,$sql);
		$sncourseMenu["noSncsection"]=mysqli_fetch_all($result1,MYSQLI_ASSOC);
}

$sncourseMenuStr=json_encode($sncourseMenu);
echo $cb.'('.$sncourseMenuStr.')';