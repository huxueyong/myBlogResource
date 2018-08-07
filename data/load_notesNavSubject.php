<?php
header('Content-Type: application/json;charset=UTF-8');
$cb = $_REQUEST['callback'];
$conn = mysqli_connect('sql.hk41.vhostgo.com','nyc2016', 'cg5s2zdr', 'nyc2016', 3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT su_id,su_name FROM course_subject WHERE su_classify='前端' ORDER BY su_id ASC";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result, MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';