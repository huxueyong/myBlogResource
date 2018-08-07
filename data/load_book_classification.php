<?php
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];

require('init.php');

$sql = "SELECT * FROM book_classification";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';