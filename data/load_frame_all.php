<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
@$num = $_REQUEST['num'];
if($num===null){
	$num = 1;
};
//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');
$sql = "SELECT * FROM frame_list ORDER BY fl_score DESC LIMIT 0,$num";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';