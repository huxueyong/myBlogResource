<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];

@$bookClassId = $_REQUEST['bookClassId']; 

if($bookClassId===null){
		$bookClassId=1;
}

require('init.php');


$sql = "SELECT `book_id`,`book_name`,`book_cover`,`bookClass_id`,`bookClass_name` FROM `book_list`,`book_classification` WHERE `bookClass_id`=`book_classificationID` AND `book_classificationID`='$bookClassId'";

$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC); 
$str=json_encode($list);
echo $cb.'('.$str.')';