<?php
header('Content-Type: application/json;charset=UTF-8');

//跨域处理
require('cross-domain.php');

//@$cb = $_REQUEST['callback'];

//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');

$sql = "SELECT `nacf_id`,`nacf_name`,GROUP_CONCAT(`nacs_id` ORDER BY `nacs_id` ASC),GROUP_CONCAT(`nacs_name` ORDER BY `nacs_id` ASC) FROM network_article_category_first,network_article_category_second WHERE `nacf_id`=`nacs_nacfID` GROUP BY `nacf_id`";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
//echo $cb.'( ' .$str . ')';

echo $str;