<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
//@$co_id = $_REQUEST['coid'] or die('{"msg":"coid request"}');
//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');

$sql = "SELECT `cns_id`, `cns_name`, `cns_mark`, `cns_ico`,`cnsc_id`, `cnsc_name`, `cnsc_ico`,GROUP_CONCAT(cns_id ORDER BY cns_id ASC),GROUP_CONCAT(cns_name ORDER BY cns_id ASC),GROUP_CONCAT(cns_mark ORDER BY cns_id ASC) FROM collection_notes_source,collection_notes_source_class WHERE `cns_classID`=`cnsc_id` GROUP BY cnsc_id";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';