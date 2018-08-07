$(".sideBar").load("/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});
//页面初始化——任务1：页面加载完成后，异步加载右侧导航数据

$.ajax({
    type: "GET",
    url: "http://118.89.242.134/myBlogResource/data/load_studyNoteSkillTypeToMenu.php",
    dataType: "jsonp",
    success: function (list) {
        // console.log(list);
        var studyNotesMenuHtml = "";
        $.each(list, function (i, v) {
            studyNotesMenuHtml += "<h2><a data-snsc-id='"+v["snsc_id"]+"'>"+v["snsc_name"]+"</a></h2><div>";
            var snstIDArr = v["GROUP_CONCAT(`snst_id` ORDER BY `snst_id` ASC)"].split(",");
            var snstNameArr = v["GROUP_CONCAT(`snst_name` ORDER BY `snst_id` ASC)"].split(",");
            $.each(snstIDArr, function (j, p) {
                studyNotesMenuHtml += "<h3><a data-snst-id='"+p+"'>"+snstNameArr[j]+"</a></h3>";
            });
            studyNotesMenuHtml += "</div>";
        });
        // console.log(studyNotesMenuHtml);
        $("#menuBody").html(studyNotesMenuHtml);
        h2SlideDiv("#menuBody");
    }
});

$("#menu").on("click", "div>h3>a", function (e) {
    e.preventDefault();
    $(".loading-container").css("display","block");
/*    console.log($(this).attr("data-snst-id"));*/
    var snstId = $(this).attr("data-snst-id");
    loadStudyNotesByskillType(snstId);
});

$("div#snlBody").on("click", "a.snopen", function (e) {
    e.preventDefault();
    //console.log($(this).parent().siblings().eq(2).children().eq(0).text());
    var snTitle = $(this).parent().siblings().eq(2).children().eq(0).text();
    var sncourseId = $(this).attr("data-sncourse-id");//获取课程编号sncourseId
    // var sncourseResourceUrl=$(this).attr("data-sncourse-resourceurl");//获取课程资源链接
    // var sncourseResourcePwd=$(this).attr("data-sncourse-pwd");//获取课程资源密码

    //更新资源下载区域数据

    // $("div#snmmLeft .snmmLeftbody>a").attr("href",sncourseResourceUrl);
    // $("div#snmmLeft .snmmLeftbody>p").html(sncourseResourcePwd);
    $("#studyNoteMenuModalHeader>h2").text(snTitle);


    loadStudyNotesMenuBysncourseId(sncourseId);//根据课程编号更新课程目录列表
    $("#studyNoteMenuModal").fadeIn("slow");
})

$("div#studyNoteMenuModalHeader>span").on("click",function () {
    $("#studyNoteMenuModal").fadeOut("slow");
    $("#snmmListContainer").html("");
})

var loadStudyNotesByPageArr = [];

loadStudyNotesByskillType(3);

function loadStudyNotesByskillType(skillTypeID) {
    if (loadStudyNotesByPageArr["snstId" + skillTypeID]) {
        console.log("缓存被调用！");
        var list = loadStudyNotesByPageArr["snstId" + skillTypeID];
        // console.log(list);
        updateStudyNotesList(list);
    } else {
        console.log("开始调用ajax!");
        $.ajax({
            type: "GET",
            url: "http://118.89.242.134/myBlogResource/data/load_studyNotesList_bySkillType.php",
            data: {"snstId": skillTypeID},
            dataType: "jsonp",
            success: function (list) {
                // console.log(list);
                //如果list不为空，则缓存数据
                if (list.length !== 0) {

                    loadStudyNotesByPageArr["snstId" + skillTypeID] = list;

                    updateStudyNotesList(list);

                } else {
                    $("#snlBody").html("<ul class='studyNoteListContent'><li class='noData'></li></ul>");
                }

            }
        });
    }
    setTimeout(function () {
        $(".loading-container").fadeOut("slow");
    },3000);
}

function updateStudyNotesList(dataList) {
    console.log(dataList);
    var snlBodyHtml = "";
    snlBodyHtml += "<ul class='studyNoteListContent'>";

    $.each(dataList, function (i, v) {
        var snAddTime = new Date(parseInt(v["sncourse_addtime"]));
        var snAddTimeYear = snAddTime.getFullYear();
        var snAddTimeMonth = snAddTime.getMonth() + 1;
        var snAddTimeDate = snAddTime.getDate();
        snlBodyHtml += "<li class='studyNoteItem' data-sncourse-id='"+v["sncourse_id"]+"'><div class='snskilltype'><p>"+v["snst_name"]+"</p></div><div class='snImg'><div class='snImgContent'><img src='"+v["sncourse_img"]+"' alt=''></div></div><div class='snTitle'><h2>"+v["sncourse_name"]+"</h2></div><div class='sndescription'><p class='snnumber'><span>资源编号：</span>"+v["sncourse_number"]+"</p><p class='sntime'><span>学习时间：</span>"+snAddTimeYear+"-"+snAddTimeMonth+"-"+snAddTimeDate+"</p></div><div class='snbutton'><a href='#' class='snopen' data-sncourse-id='"+v["sncourse_id"]+"'>资源查看</a>";

        if(v["sncourse_isVip"] != 0){
            snlBodyHtml += "<a class='snvip'>私有资源</a>";
        }else{
            snlBodyHtml += "<a class='snvip'>共享资源</a>";
        }

        snlBodyHtml += "</div></li>";
    });

    snlBodyHtml += "</ul>";

    $("#snlBody").html(snlBodyHtml);

};

var loadStudyNotesMenuArr=[];

function loadStudyNotesMenuBysncourseId(sncourseId) {
    if(loadStudyNotesMenuArr["sncourseId-"+sncourseId]){

        var list=loadStudyNotesMenuArr["sncourseId-"+sncourseId];

        updateSnmmListContainer(list);

    }else{
        $.ajax({
            type:"GET",
            url:"http://118.89.242.134/myBlogResource/data/load_studyNoteCourseSection_bysncourseId.php",
            data:{"sncourseId":sncourseId},
            dataType:"jsonp",
            success:function (list) {

                loadStudyNotesMenuArr["sncourseId-"+sncourseId]=list;

                updateSnmmListContainer(list);

            }
        });
    }
};

function updateSnmmListContainer(list) {
    console.log(list);
    var snmmListContainerHtml="";
    if(list["noSncsection"]){//没有章节设置

        if(list["noSncsection"].length!==0){//有课程列表信息
            var dataList=list["noSncsection"];
            snmmListContainerHtml+="<div class='noSncsection'><div>";

            $.each(dataList,function(i,v){
                if(v["sncourse_isVip"] !=0){
                    snmmListContainerHtml+=`
                            <h3><a href="/courseDetailsv${v.sncourse_isVip}.html?sncourseId=${v.sncourse_id}&snccId=${v.sncc_id}" data-sncc_id="${v.sncc_id}" target="_blank"><span>${i+1}</span>${v.sncc_name}</a></h3>
                            `;
                }else{
                    snmmListContainerHtml+=`
                            <h3><a href="/courseDetails.html?sncourseId=${v.sncourse_id}&snccId=${v.sncc_id}" data-sncc_id="${v.sncc_id}" target="_blank"><span>${i+1}</span>${v.sncc_name}</a></h3>
                            `;
                }

            });
            snmmListContainerHtml+="</div></div>";
            $("#snmmListContainer").html(snmmListContainerHtml);
        }else{//啥也没有，连个毛都没有
            snmmListContainerHtml+="<div class='noSncsection nodata'><p>没有任何数据</p></div>";
            $("#snmmListContainer").html(snmmListContainerHtml);
        }

    }else{

        console.log(list);

        $.each(list,function (i,v) {

            $.each(v,function (j,p) {
                snmmListContainerHtml+=`<h2><a><span>${i+1}</span>${j}</a></h2>`;
                snmmListContainerHtml+="<div>";

                if(p.length!==0){
                    $.each(p,function (k,q) {
                        if(q["sncourse_isVip"] !=0){
                            snmmListContainerHtml+=`
                            <h3><a href="/courseDetailsv${q.sncourse_isVip}.html?sncourseId=${q.sncourse_id}&snccId=${q.sncc_id}" data-sncc_id="${q.sncc_id}" target="_blank"><span>${i+1}</span>${q.sncc_name}</a></h3>
                            `;
                        }else{
                            snmmListContainerHtml+=`
                            <h3><a href="/courseDetails.html?sncourseId=${q.sncourse_id}&snccId=${q.sncc_id}" data-sncc_id="${q.sncc_id}" target="_blank"><span>${i+1}</span>${q.sncc_name}</a></h3>
                            `;
                        }
                        // snmmListContainerHtml+=`<h3><a href="/courseDetails.html?snccId=${q.sncc_id}" target="_blank"><span>${k+1}</span>${q.sncc_name}</a></h3>`;
                    })
                }else{
                    snmmListContainerHtml+="<h3><a class='nodata'>暂无更新笔记...</a></h3>";
                }
                snmmListContainerHtml+="</div>";
            });
        });

        $("#snmmListContainer").html(snmmListContainerHtml);
    }
}