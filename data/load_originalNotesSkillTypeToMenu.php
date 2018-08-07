<?php
header('Content-Type: application/json;charset=UTF-8');

//跨域处理
require('cross-domain.php');

//@$cb = $_REQUEST['callback'];

//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');

$sql = "SELECT `onsc_id`,`onsc_name`,GROUP_CONCAT(`onst_id` ORDER BY `onst_id` ASC),GROUP_CONCAT(`onst_name` ORDER BY `onst_id` ASC) FROM original_notes_skillType,original_notes_skillCategory WHERE `onsc_id`=`onst_classID` GROUP BY `onsc_id`";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
//echo $cb.'( ' .$str . ')';
echo $str;