<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];

require('init.php');

$sql = "SELECT `resourceFC_id`,`resourceFC_name`,GROUP_CONCAT(`resourceSC_id` ORDER BY `resourceSC_id` ASC),GROUP_CONCAT(`resourceSC_name` ORDER BY `resourceSC_id` ASC),GROUP_CONCAT(`resourceSC_ico` ORDER BY `resourceSC_id` ASC) FROM `resource_firstclassification`,`resource_secondclassification` WHERE `resourceFC_id`=`resourceSC_rescourceFC_ID` GROUP BY `resourceFC_id`";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';