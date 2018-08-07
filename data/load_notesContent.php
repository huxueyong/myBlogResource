<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
@$co_id = $_REQUEST['coid'] or die('{"msg":"coid request"}');
$conn = mysqli_connect('sql.hk41.vhostgo.com','nyc2016', 'cg5s2zdr', 'nyc2016', 3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT co_id,co_name,co_img,co_content FROM course_detail WHERE co_id='$co_id'";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_assoc($result);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';