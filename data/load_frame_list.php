<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
@$first = $_REQUEST['first'] or die('{"msg":"fl_first_en request"}');
@$second = $_REQUEST['second'] or die('{"msg":"fl_second_en request"}');
//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');

$sql = "SELECT * FROM `frame_list` WHERE `fl_first_en`='$first' AND `fl_second_en`='$second' ORDER BY `fl_score` DESC";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';