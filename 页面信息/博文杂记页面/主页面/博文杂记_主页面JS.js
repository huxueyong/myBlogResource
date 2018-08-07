//页面初始化
$(".sideBar").load("/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});
//页面初始化——任务1：页面加载完成后，异步加载右侧导航数据
$.ajax({
    type: "GET",
    url: "http://118.89.242.134/myBlogResource/data/load_originalNotesSkillTypeToMenu.php",
    success: function (list) {
        // console.log(list);
        var originalNotesMenuHtml = "";
        $.each(list, function (i, v) {
            originalNotesMenuHtml += `<h2><a data-onsc-id="${v.onsc_id}">${v.onsc_name}</a></h2><div>`;
            var onstIdArr = v["GROUP_CONCAT(`onst_id` ORDER BY `onst_id` ASC)"].split(",");
            var onstNameArr = v["GROUP_CONCAT(`onst_name` ORDER BY `onst_id` ASC)"].split(",");
            $.each(onstIdArr, function (j, p) {
                originalNotesMenuHtml += `<h3><a data-onst-id="${p}">${onstNameArr[j]}</a></h3>`;
            });
            originalNotesMenuHtml += `</div>`;
        });
        console.log(originalNotesMenuHtml);
        $("#menuBody").html(originalNotesMenuHtml);
        h2SlideDiv("#menuBody");
    }
});

var loadOriginalNotesByPageArr = [];//缓存数据空间

function loadOriginalNotesSourceByPage(skillType, pageNum) {
    if (loadOriginalNotesByPageArr[skillType + "-" + pageNum]) {
        console.log("缓存被调用！");
        var list = loadOriginalNotesByPageArr[skillType + "-" + pageNum];
        var num = list.pageNum;
        var pageCount = list.pageCount;
        var source = list.skillType;
        //缓存数据
        loadOriginalNotesByPageArr[source + "-" + num] = list;
        //更新文章列表
        var dataList = list.data;
        updateNotesList(dataList);
        //更新页码显示

        updatePageNum(num, pageCount, source);

    } else {
        console.log("ajax被调用！");
        $.ajax({
            type: "GET",
            url: "http://118.89.242.134/myBlogResource/data/load_originalNotesList_bySkillType.php",
            data: {skillType: skillType, pageNum: pageNum},
            success: function (list) {

                //如果list.data不为空，则缓存数据
                if (list.data.length != 0) {
                    console.log(list);
                    var num = list.pageNum;
                    var pageCount = list.pageCount;
                    var source = list.skillType;
                    loadOriginalNotesByPageArr[source + "-" + num] = list;
                    //更新文章列表
                    var dataList = list.data;
                    updateNotesList(dataList);
                    //更新页码显示

                    updatePageNum(num, pageCount, source);
                } else {
                    $("#tbodyContent").html(`<tr><td class="noData" colspan="4"></td></tr>`);
                    $("div#pageContent").html("");
                }
            }
        });
    }

}

function updateNotesList(dataList) {
    var tbodyHtml = "";
    console.log(dataList);
    $.each(dataList, function (i, v) {
        var originalNoteLabelArr = [];
        var originalNoteLabelStr = v["originalNote_label"];
        var originalNotePubdate = new Date(parseInt(v["originalNote_pubdate"]));
        var onPudateYear = originalNotePubdate.getFullYear();
        var onPudateMonth = originalNotePubdate.getMonth()+1;
        var onPudateDate = originalNotePubdate.getDate();
        var isOriginal=v["originalNote_isOriginal"];

        if (originalNoteLabelStr !== "") {
            originalNoteLabelArr = originalNoteLabelStr.split(",");
        }
        tbodyHtml += `<tr>
		                    <td class="onTitle">`;
        if(isOriginal==1){
            tbodyHtml +=`<span class="isOriginal">原创</span>`;
        }else{
            tbodyHtml +=`<span>转载</span>`;
        }
        tbodyHtml +=`<a target="_blank" href="/noteContent.html?onid=${v.originalNote_id}">${v.originalNote_title}</a></td>
		<td class="onClasses"><span data-onsc-id="${v.onsc_id}" class="onsc">${v.onsc_name}</span><span data-onst-id="${v.onst_id}" class="onst">${v.onst_name}</span></td>
		<td class="onPubdate"><span class="pubdate">${onPudateYear}-${onPudateMonth}-${onPudateDate}</span></td>
		<td class="onLabel">`;
        if (originalNoteLabelArr.length !== 0) {
            $.each(originalNoteLabelArr, function (j, p) {
                tbodyHtml += `<span>${p}</span>`
            });
        }

    });
    tbodyHtml += `</td></tr>`;
    $("#tbodyContent").html(tbodyHtml);

}

function updatePageNum(num, pageCount, source) {
    var pageHtml = "";
    if (num == 1) {
        if (pageCount <= 5) {
            pageHtml += `<ol class="pageList" data-onst-id="${source}" data-record-count="${pageCount}"><li class="active"><a href="1">1</a></li>`;
            for (let i = num + 1; i <= pageCount; i++) {
                pageHtml += `<li><a href="${i}">${i}</a></li>`;
            }
            pageHtml += `</ol><p class="pageCount">总计 <span>${pageCount}</span> 页</p>`;
        } else {//pageCount>5
            pageHtml += `<ol class="pageList" data-onst-id="${source}" data-record-count="${pageCount}"><li class="active"><a href="1">1</a></li><li><a href="2">2</a></li><li><a href="3">3</a></li><li><a href="4">4</a></li><li><a href="5">5</a></li></ol><p class="pageCount">总计 <span>${pageCount}</span> 页</p>`;
        }
    } else if (num == 2) {
        if (pageCount <= 5) {
            pageHtml += `<ol class="pageList" data-onst-id="${source}" data-record-count="${pageCount}"><li><a href="1">1</a></li><li class="active"><a href="2">2</a></li>`;
            for (let i = num + 1; i <= pageCount; i++) {
                pageHtml += `<li><a href="${i}">${i}</a></li>`;
            }
            pageHtml += `</ol><p class="pageCount">总计 <span>${pageCount}</span> 页</p>`;
        } else {//pageCount>5
            pageHtml += `<ol class="pageList" data-onst-id="${source}" data-record-count="${pageCount}"><li><a href="1">1</a></li><li class="active"><a href="2">2</a></li><li><a href="3">3</a></li><li><a href="4">4</a></li><li><a href="5">5</a></li></ol><p class="pageCount">总计 <span>${pageCount}</span> 页</p>`;
        }
    } else if (num >= 3) {

        if (pageCount - num < 2) {
            pageHtml += `<ol class="pageList" data-onst-id="${source}" data-record-count="${pageCount}">`;
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
            pageHtml += `</ol><p class="pageCount">总计 <span>${pageCount}</span> 页</p>`;
        } else {//pageCount - num>=2
            pageHtml += `<ol class="pageList" data-onst-id="${source}" data-record-count="${pageCount}"><li><a href="${num - 2}">${num - 2}</a></li><li><a href="${num - 1}">${num - 1}</a></li><li class="active"><a href="${num}">${num}</a></li><li><a href="${num + 1}">${num + 1}</a></li><li><a href="${num + 2}">${num + 2}</a></li></ol><p class="pageCount">总计 <span>${pageCount}</span> 页</p>`;
        }
    }

    $("div#pageContent").html(pageHtml);
}

loadOriginalNotesSourceByPage(0, 1);

$("#menuBody").on("click", "div>h3>a", function (e) {
    e.preventDefault;
    var skillType = $(this).attr("data-onst-id");
    var pageNum = 1;

    loadOriginalNotesSourceByPage(skillType, pageNum);

});

$("div#pageContent").on("click", "a", function (e) {
    e.preventDefault();
    if($(this).parent().hasClass("active")){
        console.log("大哥，别点了，现在就是你想要的！！！");
        return;
    }else{
        var pageNum = parseInt($(this).attr("href"));
        var skillType = $(this).parent().parent().attr("data-onst-id");
        loadOriginalNotesSourceByPage(skillType, pageNum);
    }
});

$("div#originalNoteContainer").on("click", "span.onst", function () {
    var skillType = $(this).attr("data-onst-id");
    var pageNum = 1;
    loadOriginalNotesSourceByPage(skillType, pageNum);
});