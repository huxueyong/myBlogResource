<?php
/**
*接收客户端提交的
pageNum、     //客户端提交的请求页码
向客户端输出该页面中所有的产品的文章信息，输出的json格式形如：
	{
		recordCount:36,     //满足条件的记录的总数
		pageSize:8,     //页面大小，每页最多显示的记录数
		pageCount:5,     //总的页数
		pageNum:3,      //当前显示的页号
		data:[{},{},{}...{}]  //当前页中的数据
	}
*/
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
//@$source = $_REQUEST['source'] or die('{"msg":"source request"}');
@$pageNum = $_REQUEST['pageNum'];
if($pageNum===null){//客户未提交pageNum,默认值为1
	$pageNum=1;
}else{ //客户端提交了pageNum，需要把字符串解析为整数
	$pageNum = intval($pageNum);
	if($pageNum>100){
		$pageNum = 100;
	}
}

$output = [
		'recordCount' => 0,//必须为数字，注意格式
		'pageSize' => 10,//必须为数字，注意格式
		'pageCount' => 0,//必须为数字，注意格式
		'pageNum' => $pageNum,//必须为数字，注意格式
		'data' => null
];

//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');

//SQL1：查询全部的数据数量
$sql = "SELECT COUNT(*) FROM `collection_notes_content`";
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
$sql = "SELECT `cncon_id`, `cncon_title`, `cncon_url`, `cncon_source`, `cncon_pubdate`, `cncon_label`,`cns_id`, `cns_name`, `cns_mark`, `cns_ico`,`cnsc_id`, `cnsc_name`, `cnsc_ico` FROM collection_notes_content,collection_notes_source,collection_notes_source_class WHERE `cncon_source`=`cns_id` AND `cns_classID`=`cnsc_id` ORDER BY `cncon_pubdate` DESC LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
$output['data']= mysqli_fetch_all($result,MYSQLI_ASSOC); 

$outputStr=json_encode($output);
echo $cb.'('.$outputStr.')';