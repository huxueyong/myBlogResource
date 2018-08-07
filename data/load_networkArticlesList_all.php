<?php
/**
*接收客户端提交的
pageNum、     //客户端提交的请求页码
nacsID,      //客户端提交的请求文章信息的类别
向客户端输出该页面中所有的产品的文章信息，输出的json格式形如：
	{
		nacsID:"2",      //请求文章的类别信息，限制条件
		recordCount:36,     //满足条件的记录的总数
		pageSize:8,     //页面大小，每页最多显示的记录数
		pageCount:5,     //总的页数
		pageNum:3,      //当前显示的页号
		data:[{},{},{}...{}]  //当前页中的数据
	}
*/
header('Content-Type: application/json;charset=UTF-8');

//跨域处理
require('cross-domain.php');

//@$cb = $_REQUEST['callback'];
/*@$nacsID = $_REQUEST['nacsID'] or die('{"msg":"nacsID request"}');*/
@$pageNum = $_REQUEST['pageNum'];
if($pageNum===null){//客户未提交pageNum,默认值为1
	$pageNum=1;
}else{ //客户端提交了pageNum，需要把字符串解析为整数
	$pageNum = intval($pageNum);
	if($pageNum >100){
		$pageNum = 100;
	}
}

$output = [
		/*'nacsID' => $nacsID,//字符串*/
		'recordCount' => 0,//必须为数字，注意格式
		'pageSize' => 10,//必须为数字，注意格式
		'pageCount' => 0,//必须为数字，注意格式
		'pageNum' => $pageNum,//必须为数字，注意格式
		'data' => null
];

require('init.php');

//SQL1：查询总的符合条件的数据数量
$sql = "SELECT COUNT(*) FROM `network_article_list` ";
$result = mysqli_query($conn,$sql);
//COUNT(*)结果集中有一行一列的数据
$output['recordCount'] = intval(mysqli_fetch_row($result)[0]);

//求得总页数
$output['pageCount'] = ceil($output['recordCount'] / $output['pageSize']);
if($output['pageCount']>100){
		$output['pageCount'] = 100;
}

//SQL2:求得主体数据
$start = ($output['pageNum']-1)*$output['pageSize'];
$count = $output['pageSize'];//一次最多读取数据的数量
$sql = "SELECT `networkArticle_id`,`networkArticle_title`,`networkArticle_img`,`networkArticle_url`,`networkArticle_pubdate`, `networkArticle_label`,`networkArticle_source_id`, `networkArticle_source_name`, `networkArticle_source_type`, `networkArticle_source_ico`,`nacf_id`, `nacf_name`,`nacs_id`,`nacs_name` FROM `network_article_list`,`network_article_source`,`network_article_category_first`,`network_article_category_second` WHERE `networkArticle_nacfID`=`nacf_id` AND `networkArticle_nacsID`=`nacs_id` AND `networkArticle_sourceID`=`networkArticle_source_id` ORDER BY `networkArticle_pubdate` DESC LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
$output['data']= mysqli_fetch_all($result,MYSQLI_ASSOC); 

$outputStr=json_encode($output);
//echo $cb.'('.$outputStr.')';
echo $outputStr;