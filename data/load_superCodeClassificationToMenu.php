<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];

require('init.php');

$sql = "SELECT `superCodeFC_id`,`superCodeFC_name`,GROUP_CONCAT(`supercodeSC_id` ORDER BY `supercodeSC_id` ASC),GROUP_CONCAT(`supercodeSC_name` ORDER BY `supercodeSC_id` ASC) FROM `supercode_firstclassification`,`supercode_secondclassification` WHERE `superCodeFC_id`=`supercodeSC_FCID` GROUP BY `superCodeFC_id`";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';