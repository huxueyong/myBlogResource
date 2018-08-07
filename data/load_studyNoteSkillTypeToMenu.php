<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];

//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');

$sql = "SELECT `snsc_id`,`snsc_name`,GROUP_CONCAT(`snst_id` ORDER BY `snst_id` ASC),GROUP_CONCAT(`snst_name` ORDER BY `snst_id` ASC) FROM `study_note_skillcategory`,`study_note_skilltype` WHERE `snst_snscID`=`snsc_id` GROUP BY `snsc_id` ORDER BY `snsc_id` ASC";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';