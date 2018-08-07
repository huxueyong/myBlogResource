<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
//@$ajaxHttpHost=$_SERVER["HTTP_REFERER"];//$_SERVER["REQUEST_HOST"];//$_SERVER["HTTP_HOST"];
@$bookConId = $_REQUEST['bookConId'] or die('{"msg":"bookConId request"}');

// if($bookId===null){
// 	$bookId=8;
// }

require('init.php');

$sql = "SELECT `bookCon_id`, `bookCon_title`, `bookCon_content`,`book_id`,`book_name`,`book_cover` FROM `book_content`,`book_list` WHERE `book_id`=`bookCon_bookListID` AND `bookCon_id`=$bookConId ";

$result = mysqli_query($conn,$sql);
$output= mysqli_fetch_all($result,MYSQLI_ASSOC)[0];

$outputStr=json_encode($output);
echo $cb.'('.$outputStr.')';