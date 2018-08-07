//页面初始化
$(".sideBar").load("/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});
//功能点1：页面加载完成后，异步加载分类导航数据，生成导航结构，加载到右侧导航中（#menuBody）
$.ajax({
    type: "GET",
    url: "http://118.89.242.134/myBlogResource/data/load_networkarticleCategoryToMenu.php",
    success: function (list) {
        var html = "";
        $.each(list, function (i, v) {
            html += `<h2><a data-nacf-id="${v.nacf_id}">${v.nacf_name}</a></h2>`;
            html += "<div>";
            var nacsIdArr = v["GROUP_CONCAT(`nacs_id` ORDER BY `nacs_id` ASC)"].split(",");
            var nacsNameArr = v["GROUP_CONCAT(`nacs_name` ORDER BY `nacs_id` ASC)"].split(",");
            // var cnsMarkArr = v["GROUP_CONCAT(cns_mark ORDER BY cns_id ASC)"].split(",");
            $.each(nacsNameArr, function (j, p) {
                html += `<h3><a data-nacs-id="${nacsIdArr[j]}" data-nacs-name="${nacsNameArr[j]}">${p}</a></h3>`;
            });
            html += "</div>";
        });
        $("#menuBody").html(html);
        h2SlideDiv("#menuBody");
    }
});
// //功能点2：页面加载完成后，异步加载网络热文的前N条（20条）数据，加载到网页主体中（div#collectionNotesContent>.cnbody）、更新总记录数、页码
var loadNetworkArticlesByPageArr = [];//缓存数据空间

function loadNetworkArticlesAllByPage(nacsID,num) {//nacsID此时的值为0，代表不区分文章类别
    var dataList = null;
    // var cnheaderHtml = "";
    if (loadNetworkArticlesByPageArr[nacsID+"-"+num]) {
        console.log("缓存被调用了！")
        dataList = loadNetworkArticlesByPageArr[nacsID+"-"+num];
        updateNotesList(dataList);

        //更新页码条

        var pageCount = $(".pageList").attr("data-record-count");
        var nacsID = $(".pageList").attr("data-nacategorysecond-id");
        var nasourceID = 0;//不区分作者
        updatePageNum(num, pageCount, nacsID,nasourceID);


    } else {
        $.ajax({
            type: "GET",
            url: "http://118.89.242.134/myBlogResource/data/load_networkArticlesList_all.php",
            data: {pageNum: num},
            success: function (list) {
                // console.log(list);
                loadNetworkArticlesByPageArr[nacsID+"-"+num] = list.data;

                dataList = list.data;

                //任务1：获取数据加载到网页主体中
                updateNotesList(dataList);

                //任务2：更新.cnheader中的信息
                // cnheaderHtml += `<div class="cnheaderContent">
                //             <div class="cnheaderimg">
                //                 <img src="http://i1.cfimg.com/604780/b942fb88cc1131c0.jpg" alt="">
                //             </div>
                //             <div class="cnheaderdescription">
                //                 <h2 class="cnName">网络热文</h2>
                //                 <p class="cnNum"></p>
                //                 <p class="cnCount">共 <span>${list.recordCount}</span> 条记录</p>
                //             </div>
                //         </div>`;
                // $("div#collectionNotesContent>.cnheader").html(cnheaderHtml);

                //任务3：更新页码条
                var pageCount = list.pageCount;
                var nasourceID = 0;
                updatePageNum(num, pageCount, nacsID,nasourceID);
            }
        });
    }
};

loadNetworkArticlesAllByPage(0,1);

$("div.pageContent").on("click", "a", function (e) {
    e.preventDefault();
    var num = parseInt($(this).attr("href"));
    if ($(this).parent().parent().attr("data-nacategorysecond-id") == 0) {//此时不区分文章类别
        if ($(this).parent().hasClass("active")) {
            return;
        } else {
            loadNetworkArticlesAllByPage(0,num);
        };
    } else {
        // 此时data-nacategorysecond-id不为0，需要区分文章类别
        var nacsID=$(this).parent().parent().attr("data-nacategorysecond-id");
        // loadCollectionNotesSourceByPage(source,num)
        loadNetworkArticlesBynacsIDNum(nacsID,num);
    }
});

function updatePageNum(num, pageCount, nacsID,nasourceID) {
    var pageHtml = "";
    if (num == 1) {
        if (pageCount <= 5) {
            pageHtml += `<ol class="pageList" data-naCategorySecond-id="${nacsID}"  data-naSource-id="${nasourceID}" data-record-count="${pageCount}"><li class="active"><a href="1">1</a></li>`;
            for (let i = num + 1; i <= pageCount; i++) {
                pageHtml += `<li><a href="${i}">${i}</a></li>`;
            }
            pageHtml += `</ol><p class="pageCount">共 <span>${pageCount}</span> 页</p>`;
        } else {//pageCount>5
            pageHtml += `<ol class="pageList" data-naCategorySecond-id="${nacsID}" data-naSource-id="${nasourceID}" data-record-count="${pageCount}"><li class="active"><a href="1">1</a></li><li><a href="2">2</a></li><li><a href="3">3</a></li><li><a href="4">4</a></li><li><a href="5">5</a></li></ol><p class="pageCount">共 <span>${pageCount}</span> 页</p>`;
        }
    } else if (num == 2) {
        if (pageCount <= 5) {
            pageHtml += `<ol class="pageList" data-naCategorySecond-id="${nacsID}" data-naSource-id="${nasourceID}" data-record-count="${pageCount}"><li><a href="1">1</a></li><li class="active"><a href="2">2</a></li>`;
            for (let i = num + 1; i <= pageCount; i++) {
                pageHtml += `<li><a href="${i}">${i}</a></li>`;
            }
            pageHtml += `</ol><p class="pageCount">共 <span>${pageCount}</span> 页</p>`;
        } else {//pageCount>5
            pageHtml += `<ol class="pageList" data-naCategorySecond-id="${nacsID}" data-naSource-id="${nasourceID}" data-record-count="${pageCount}"><li><a href="1">1</a></li><li class="active"><a href="2">2</a></li><li><a href="3">3</a></li><li><a href="4">4</a></li><li><a href="5">5</a></li></ol><p class="pageCount">共 <span>${pageCount}</span> 页</p>`;
        }
    } else if (num >= 3) {

        if (pageCount - num < 2) {
            pageHtml += `<ol class="pageList" data-naCategorySecond-id="${nacsID}" data-naSource-id="${nasourceID}" data-record-count="${pageCount}">`;
            var start = pageCount - 4;
            if (start <= 0) {
                start = 1;
            }
            for (let i = start; i <= num - 1; i++) {
                pageHtml += `<li><a href="${i}">${i}</a></li>`;
            }
            pageHtml += `<li class="active"><a href="${num}">${num}</a></li>`;
            for (let i = num + 1; i <= pageCount; i++) {
                pageHtml += `<li><a href="${i}">${i}</a></li>`;
            }
            pageHtml += `</ol><p class="pageCount">共 <span>${pageCount}</span> 页</p>`;
        } else {//pageCount - num>=2
            pageHtml += `<ol class="pageList" data-naCategorySecond-id="${nacsID}"  data-naSource-id="${nasourceID}" data-record-count="${pageCount}"><li><a href="${num - 2}">${num - 2}</a></li><li><a href="${num - 1}">${num - 1}</a></li><li class="active"><a href="${num}">${num}</a></li><li><a href="${num + 1}">${num + 1}</a></li><li><a href="${num + 2}">${num + 2}</a></li></ol><p class="pageCount">共 <span>${pageCount}</span> 页</p>`;
        }
    }

    $("div.pageContent").html(pageHtml);
}

function updateNotesList(dataList) {
    var nabodyHtml = "";
    // console.log(dataList);
    nabodyHtml += `<table>
		            <thead>
			            <tr>
			                <th>头图</th>
			                <th>标题</th>
			                <th>来源/查看原文</th>
			                <th>类型</th>
			                <th>发布时间</th>
			            </tr>
		            </thead>
		            <tbody>`;
    $.each(dataList, function (i, v) {
        var networkArticlePubdate = new Date(parseInt(v["networkArticle_pubdate"]));
        var naPudateYear = networkArticlePubdate.getFullYear();
        var naPudateMonth = networkArticlePubdate.getMonth()+1;
        var naPudateDate = networkArticlePubdate.getDate();
        // var networkArticleLabelArr=[];
        // var networkArticleLabelStr=v["networkArticle_label"];
        // if(networkArticleLabelStr!==""){
        // 	networkArticleLabelArr=networkArticleLabelStr.split(",");
        // }
        nabodyHtml += `<tr>
							<td class="naImg"><img src="${v.networkArticle_img}" alt="huxueyong.com" /></td>
			                <td class="naTitle"><a href="/network_content.html?naID=${v.networkArticle_id}" target="_blank" data-networkArticle-id="${v.networkArticle_id}">${v.networkArticle_title}</a></td>
			                <td class="naSource"><div><span class="nast">${v.networkArticle_source_type}</span><span data-networkArticle-source-id="${v.networkArticle_source_id}" class="nasID">${v.networkArticle_source_name}</span><span class="naurl"><a href="${v.networkArticle_url}" target="blank"><i class="fa fa-eye"></i></a></span></div></td>
		                	<td class="naCategory">
								<div><span data-nacf-id="${v.nacf_id}" class="nacfID">${v.nacf_name}</span><span data-nacs-id="${v.nacs_id}" class="nacsID">${v.nacs_name}</span></div>
		                	</td>
			                <td class="naPubdate">${naPudateYear}年${naPudateMonth}月${naPudateDate}日</td>
			            </tr>`;
        // <td class="label">`;
        // if(networkArticleLabelArr.length!==0){
        // 	$.each(networkArticleLabelArr,function (j,p) {
        // 		nabodyHtml+=`<span>${p}</span>`
        // 	});
        // }

    });
    nabodyHtml += `</tbody><tfoot></tfoot></table>`;
    $("div#networkArticleContent>.nabody").html(nabodyHtml);

}

// //功能点3：点击右侧分类导航，异步加载请求对应的数据，并生成结构加载到主体中（div#collectionNotesContent>.cnbody）

function loadNetworkArticlesBynacsIDNum(nacsID,num) {
    // var cnheaderHtml = "";
    if (loadNetworkArticlesByPageArr[nacsID + "-" + num]) {//从缓存中获取数据
        console.log("缓存被调用");
        var dataList = loadNetworkArticlesByPageArr[nacsID + "-" + num]["data"];
        console.log(dataList);
        var pageCount = loadNetworkArticlesByPageArr[nacsID + "-" + num]["pageCount"];
        //拿到list后，完成以下三点任务
        //1.渲染数据到网页主体（div#collectionNotesContent>.cnbody）
        updateNotesList(dataList);

        // //3.更新页码条信息
        updatePageNum(num, pageCount, nacsID,0);

    } else {//无此条缓存信息时，通过ajax异步请求数据
        $.ajax({
            type: "GET",
            url: "http://118.89.242.134/myBlogResource/data/load_networkArticleList_bynacsID.php",
            data: {nacsID: nacsID, pageNum: num},
            success: function (list) {
                //如果list.data不是空数组，则将数据缓存至loadCollectionNotesByPageArr中
                console.log("ajax被调用了");
                console.log(list);
                if (list.data.length !== 0) {
                    loadNetworkArticlesByPageArr[nacsID + "-" + num] = list;
                    var pageCount = list.pageCount;
                    var dataList = list.data;
                    //任务1：渲染数据到网页主体（div#collectionNotesContent>.cnbody）中
                    updateNotesList(dataList);

                    // //任务2：更新.cnheader中的文章来源信息
                    // var v = dataList[0];
                    // cnheaderHtml += `<div class="cnheaderContent">
                    //            <div class="cnheaderimg">
                    //                <img src="${v.cns_ico}" alt="">
                    //            </div>
                    //            <div class="cnheaderdescription">
                    //                <h2 class="cnName" data-cns-id="${v.cns_id}">${v.cns_name}</h2>
                    //                <p class="cnNum">${v.cns_mark}</p>
                    //                <p class="cnCount">共 <span>${list.recordCount}</span> 条记录</p>
                    //            </div>
                    //        </div>`;
                    // $("div#collectionNotesContent>.cnheader").html(cnheaderHtml);
                    //任务3：更新页码条信息

                    updatePageNum(num, pageCount, nacsID,0);

                } else {//list.data为空数组，代表在该分类下无任何文章数据
                    // // 	//更新.cnheader 中的无任何数据的提示
                    // cnheaderHtml += `<div class="cnheaderContent">
                    //            <div class="cnheaderimg">
                    //                <img src="http://i1.cfimg.com/604780/4aa5f986a675c1c1.png" alt="">
                    //            </div>
                    //            <div class="cnheaderdescription">
                    //                <h2 class="cnName">暂无相关数据，请尝试查看其它内容....</h2>
                    //                <p class="cnNum"></p>
                    //                <p class="cnCount"></p>
                    //            </div>
                    //        </div>`;
                    // $("div#collectionNotesContent>.cnheader").html(cnheaderHtml);
                    // 	//更新.cnbody 中无任何数据的提示
                    $("div#networkArticleContent>.nabody").html(`<table>
														            <thead>
														            <tr>
														                <th>头图</th>
														                <th>标题</th>
														                <th>来源/查看原文</th>
														                <th>类型</th>
														                <th>发布时间</th>
														            </tr>
														            </thead>
														            <tbody>
														            <tr>
														                <td class="noData" colspan="5"></td>
														            </tr>
														            </tbody>
														            <tfoot></tfoot>
														        </table>`);
                    // console.log($("[data-nacs-id="+nacsID+"]"));
                    $("[data-nacs-id="+nacsID+"]").addClass("noData");
                    // 	//隐藏页码条（将.cnfooter中的html清空）
                    $("div.pageContent").html("");
                }

            }
        });
    }
}

$("#menuBody").on("click", "div>h3>a", function (e) {
    e.preventDefault;

    if($(this).hasClass("noData")){
        console.log("没数据了，你还点个屁！");
        $("div#networkArticleContent>.nabody").html(`<table>
														            <thead>
														            <tr>
														                <th>头图</th>
														                <th>标题</th>
														                <th>来源/查看原文</th>
														                <th>类型</th>
														                <th>发布时间</th>
														            </tr>
														            </thead>
														            <tbody>
														            <tr>
														                <td class="noData" colspan="5"></td>
														            </tr>
														            </tbody>
														            <tfoot></tfoot>
														        </table>`);
        $("div.pageContent").html("");
        return;
    };

    var nacsID = $(this).attr("data-nacs-id");
    var num = 1;

    loadNetworkArticlesBynacsIDNum(nacsID,num);

});
