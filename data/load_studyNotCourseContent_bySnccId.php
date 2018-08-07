<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
@$sncc_id = $_REQUEST['snccId'] or die('{"msg":"snccId request"}');

require('init.php');

$sql = "SELECT `sncc_id`,`sncc_name`,`sncc_content`,`sncourse_id`,`sncourse_name`,`sncourse_img`,`sncourse_number`,`sncourse_addtime`,`sncourse_gitUrl`,`sncourse_isVip` FROM `study_note_course_content`,`study_note_course` WHERE  `sncc_sncourseId`=`sncourse_id` AND `sncc_id`='$sncc_id'";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_assoc($result);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';