<?php
header('Content-Type: application/json;charset=UTF-8');

//跨域处理
require('cross-domain.php');

//@$cb = $_REQUEST['callback'];
@$naID = $_REQUEST['naID']; //or die('{"msg":"naID request"}')

require('init.php');

$sql = "SELECT `networkArticle_id`,`networkArticle_title`,`networkArticle_img`,`networkArticle_url`,`networkArticle_content`,`networkArticle_pubdate`,`networkArticle_label`,`networkArticle_source_id`,`networkArticle_source_name`,`networkArticle_source_ico`,`nacf_id`,`nacf_name`,`nacs_id`,`nacs_name` FROM `network_article_list`,`network_article_source`,`network_article_category_first`,`network_article_category_second` WHERE `networkArticle_id`='$naID' AND `nacf_id`=`networkArticle_nacfID` AND `nacs_id`=`networkArticle_nacsID` AND `networkArticle_source_id`=`networkArticle_sourceID`";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_assoc($result);
$str=json_encode($list);
//echo $cb.'( ' .$str . ')';
echo $str;