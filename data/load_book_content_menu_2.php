<?php
header('Content-Type: application/json;charset=UTF-8');

//跨域处理
require('cross-domain.php');

//@$ajaxHttpHost=$_SERVER["HTTP_REFERER"];//$_SERVER["REQUEST_HOST"];//$_SERVER["HTTP_HOST"];
@$bookId = $_REQUEST['bookId'];


require('init.php');
$bookMenu = [];

$sql ="SELECT `book_id`,`book_name`,`book_cover` FROM `book_list` WHERE `book_id`=$bookId";
$result = mysqli_query($conn,$sql);
$output= mysqli_fetch_all($result,MYSQLI_ASSOC)[0];
$bookMenu['bookDescribe'] = $output;


//查询出所有一级目录
$sql = "SELECT `bookCon_id`,`bookCon_title` FROM `book_content` WHERE `bookCon_menulevel`=1 AND `bookCon_bookListID`=$bookId ORDER BY `bookCon_order` ASC";

$result = mysqli_query($conn,$sql);
$output= mysqli_fetch_all($result,MYSQLI_ASSOC);
$outputlength=count($output);

if($outputlength!==0){

		$bookMenu['firstLevelMenu'] = $output;

		for($i=0;$i<$outputlength;$i++){
				$bookConId=$output[$i]["bookCon_id"];
				$bookConTitle=$output[$i]["bookCon_title"];
				$sql="SELECT GROUP_CONCAT(`bookCon_id` ORDER BY `bookCon_order` ASC),GROUP_CONCAT(`bookCon_title` ORDER BY `bookCon_order` ASC) FROM `book_content` WHERE `bookCon_menulevel`=2 AND `bookCon_menubelong`=$bookConId GROUP BY `bookCon_menubelong`";
				$result = mysqli_query($conn,$sql);
				//$sncourseMenu[$sncsectionName]=mysqli_fetch_all($result,MYSQLI_ASSOC);
				// $bookMenu['secondLevelMenu'][$i]=[$bookConId =>mysqli_fetch_all($result,MYSQLI_ASSOC)];
				$bookMenu['secondLevelMenu'][$i]=mysqli_fetch_all($result,MYSQLI_ASSOC);
		}
}else{

		$bookMenu['firstLevelMenu']=[];
		$bookMenu['secondLevelMenu']=[];

}

$bookMenuStr=json_encode($bookMenu);
echo $bookMenuStr;
