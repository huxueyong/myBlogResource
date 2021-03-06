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
//header('Access-Control-Allow-Origin:http://www.huxueyong.cn');

//跨域处理
require('cross-domain.php');



//@$cb = $_REQUEST['callback'];
//@$ajaxHttpHost=$_SERVER["HTTP_REFERER"];//$_SERVER["REQUEST_HOST"];//$_SERVER["HTTP_HOST"];
@$skillType = $_REQUEST['skillType']; //or die('{"msg":"skillType request"}');

if($skillType===null){
		$skillType=0;
}

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
		'skillType' => $skillType,//字符串
		'recordCount' => 0,//必须为数字，注意格式
		'pageSize' => 10,//必须为数字，注意格式
		'pageCount' => 0,//必须为数字，注意格式
		'pageNum' => $pageNum,//必须为数字，注意格式
		'data' => null
		//'HttpHost' => $ajaxHttpHost
];

//$conn = mysqli_connect('bj-cdb-9cni3epp.sql.tencentcdb.com','root', 'asdfg8150245104', 'myblog', 63931);
//$sql = "SET NAMES UTF8";
//mysqli_query($conn, $sql);

require('init.php');

//SQL1：查询总的符合条件的数据数量
if($skillType==0){
		$sql= "SELECT COUNT(*) FROM `original_notes`";
}else{
		$sql = "SELECT COUNT(*) FROM `original_notes` WHERE `originalNote_skillType`='$skillType'";
};

$result = mysqli_query($conn,$sql);

if(!$result){
	echo "执行失败！可能的原因，SQL语法错误：$sql";
}else{

	//COUNT(*)结果集中有一行一列的数据
	$output['recordCount'] = intval(mysqli_fetch_row($result)[0]);

	//求得总页数
	$output['pageCount'] = ceil($output['recordCount'] / $output['pageSize']);

	if($output['pageCount']>100){
		$output['pageCount'] = 100;
	}

}






//SQL2:求得主体数据
$start = ($output['pageNum']-1)*$output['pageSize'];
$count = $output['pageSize'];//一次最多读取数据的数量

if($skillType==0){
		$sql = "SELECT `originalNote_id`,`originalNote_title`,`originalNote_img`,`originalNote_content`,`originalNote_isOriginal`,`originalNote_skillType`,`originalNote_pubdate`,`originalNote_label`,`onst_id`,`onst_name`,`onsc_id`,`onsc_name` FROM `original_notes`,`original_notes_skillType`,`original_notes_skillCategory` WHERE `originalNote_skillType`=`onst_id` AND `onst_classID`=`onsc_id` ORDER BY `originalNote_pubdate` DESC LIMIT $start,$count";
}else{
		$sql = "SELECT `originalNote_id`,`originalNote_title`,`originalNote_img`,`originalNote_content`,`originalNote_isOriginal`,`originalNote_skillType`,`originalNote_pubdate`,`originalNote_label`,`onst_id`,`onst_name`,`onsc_id`,`onsc_name` FROM `original_notes`,`original_notes_skillType`,`original_notes_skillCategory` WHERE `originalNote_skillType`=`onst_id` AND `onst_classID`=`onsc_id` AND `originalNote_skillType`=$skillType ORDER BY `originalNote_pubdate` DESC LIMIT $start,$count";
}

$result = mysqli_query($conn,$sql);

if(!$result){
	echo "执行失败！可能的原因，SQL语法错误：$sql";
}else{
	$output['data']= mysqli_fetch_all($result,MYSQLI_ASSOC); 
}

$outputStr=json_encode($output);
echo  $outputStr;
//echo $cb.'('.$outputStr.')';