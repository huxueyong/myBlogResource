<?php
header('Content-Type: application/json;charset=UTF-8');
$cb = $_REQUEST['callback'];
//@$co_id = $_REQUEST['coid'] or die('{"msg":"coid request"}');
$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT cnc_id, cnc_first_name, cnc_second_name ,GROUP_CONCAT(cnc_second_name ORDER BY cnc_id ASC) FROM collection_notes_class GROUP BY cnc_first_name ORDER BY 	cnc_id ASC";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';