<?php
header('Content-Type: application/json;charset=UTF-8');

//跨域处理
require('cross-domain.php');

@$on_id = $_REQUEST['onid'] or die('{"msg":"onid request"}');

require('init.php');

$sql = "SELECT * FROM original_notes WHERE originalNote_id='$on_id'";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_assoc($result);
$str=json_encode($list);
//echo $cb.'( ' .$str . ')';
echo $str;