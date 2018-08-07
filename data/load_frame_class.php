<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
//@$co_id = $_REQUEST['coid'] or die('{"msg":"coid request"}');
//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');

$sql = "SELECT * ,GROUP_CONCAT(fc_second_cn ORDER BY fc_id ASC) ,GROUP_CONCAT(fc_second_en ORDER BY fc_id ASC) FROM `frame_class` GROUP BY fc_first_cn ORDER BY fc_id ASC";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';