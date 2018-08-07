<?php
header('Content-Type: application/json;charset=UTF-8');
$cb = $_REQUEST['callback'];
$source = $_REQUEST['source'] or die('{"msg":"source request"}');
$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT cncon_id,cncon_title,cncon_url,cnc_first_name,cnc_first_name_ico,cnc_second_name,cnc_second_name_ico,cncon_pubdate,cncon_label FROM collection_notes_content,collection_notes_class WHERE cnc_second_name=cncon_source AND cncon_source='$source'";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
$str=json_encode($list);
echo $cb.'( ' .$str . ')';