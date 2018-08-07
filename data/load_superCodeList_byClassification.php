<?php
/**
*接收客户端提交的
pageNum、     //客户端提交的请求页码
source,      //客户端提交的请求文章信息的类别
向客户端输出该页面中所有的产品的文章信息，输出的json格式形如：
	{
		source:"2",      //请求文章的类别信息，限制条件
		recordCount:36,     //满足条件的记录的总数
		pageSize:8,     //页面大小，每页最多显示的记录数
		pageCount:5,     //总的页数
		pageNum:3,      //当前显示的页号
		data:[{},{},{}...{}]  //当前页中的数据
	}
*/
header('Content-Type: application/json;charset=UTF-8');
@$cb = $_REQUEST['callback'];
//@$ajaxHttpHost=$_SERVER["HTTP_REFERER"];//$_SERVER["REQUEST_HOST"];//$_SERVER["HTTP_HOST"];
@$supercodeSCID = $_REQUEST['supercodeSCID']; //or die('{"msg":"skillType request"}');

if($supercodeSCID===null){
		$supercodeSCID=1;
}

@$pageNum = $_REQUEST['pageNum'];
if($pageNum===null){//客户未提交pageNum,默认值为1
	$pageNum=1;
}else{ //客户端提交了pageNum，需要把字符串解析为整数
	$pageNum = intval($pageNum);
	if($pageNum > 100){
		$pageNum = 100;
	}
}

$output = [
		'supercodeSCID' => $supercodeSCID,//字符串
		'recordCount' => 0,//必须为数字，注意格式
		'pageSize' => 10,//必须为数字，注意格式
		'pageCount' => 0,//必须为数字，注意格式
		'pageNum' => $pageNum,//必须为数字，注意格式
		'data' => null
		//'HttpHost' => $ajaxHttpHost
];

require('init.php');

//SQL1：查询总的符合条件的数据数量
$sql = "SELECT COUNT(*) FROM `supercode_list` WHERE `superCode_SCID`='$supercodeSCID'";
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


$sql = "SELECT `superCode_id`,`superCode_title`,`superCode_label`,`superCodeFC_id`,`superCodeFC_name`,`supercodeSC_id`,`supercodeSC_name` FROM `supercode_list`,`supercode_firstclassification`,`supercode_secondclassification` WHERE `superCodeFC_id`=`supercodeSC_FCID` AND `supercodeSC_id`=`superCode_SCID` AND `superCode_SCID`=$supercodeSCID ORDER BY `superCode_id` ASC LIMIT $start,$count";

$result = mysqli_query($conn,$sql);
$output['data']= mysqli_fetch_all($result,MYSQLI_ASSOC); 

$outputStr=json_encode($output);
echo $cb.'('.$outputStr.')';