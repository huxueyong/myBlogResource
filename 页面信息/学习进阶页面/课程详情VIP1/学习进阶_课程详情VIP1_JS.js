//页面初始化
$(".sideBar").load("http://www.huxueyong.com/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});

//功能点2：加载课程章节到右侧导航栏
function load_studyNoteCourseSection_bysncourseId_toMenu(sncourseIdStr) {
    $.ajax({
        type:"GET",
        url:"http://118.89.242.134/myBlogResource/data/load_studyNoteCourseSection_bysncourseId_toMenu.php",
        dataType:"jsonp",
        data:sncourseIdStr,
        success:function (list) {
            console.log(list);
            let menuBodyHtml="";
        //    开始
            if(list["noSncsection"]){//没有章节设置

                if(list["noSncsection"].length!==0){//有课程列表信息
                    var dataList=list["noSncsection"];

                    $.each(dataList,function(i,v){
                        menuBodyHtml += `<h2>
                                            <a data-sncc-id="${v.sncc_id}">${v.sncc_name}</a>
                                        </h2>`;
                    });

                    $("#menuBody").html(menuBodyHtml);
                }else{//啥也没有，连个毛都没有

                }

            }else{

                // console.log(list);

                $.each(list,function (i,v) {

                    $.each(v,function (j,p) {
                        menuBodyHtml+=`<h2><a>${j}</a></h2>`;
                        menuBodyHtml+="<div>";

                        if(p.length!==0){

                            $.each(p,function (k,q) {
                                menuBodyHtml += `<h3>
                                                    <a data-sncc-id="${q.sncc_id}">${q.sncc_name}</a>
                                                 </h3>`;
                            })

                        }else{

                        }
                        menuBodyHtml+="</div>";
                    });

                });

                $("#menuBody").html(menuBodyHtml);
            }

        //    结束
        h2SlideDiv("#menuBody");
        }
    })
};

var sncourseIdStr=window.location.search.substr(1);
load_studyNoteCourseSection_bysncourseId_toMenu(sncourseIdStr);

//功能点3：点击右侧导航，加载对应章节内容到内容主体

$("#menuBody").on("click","a[data-sncc-id]",function(e){
    e.preventDefault;
    console.log($(this).attr("data-sncc-id"));
    var SnccIdStr="snccId="+$(this).attr("data-sncc-id");
    load_studyNotCourseContent_bySnccId(SnccIdStr);
});

function load_studyNotCourseContent_bySnccId(SnccIdStr){
    $.ajax({
        url:"http://118.89.242.134/myBlogResource/data/load_studyNotCourseContent_bySnccId.php",
        type:"GET",
        data:SnccIdStr,
        dataType:"jsonp",
        success:function (list) {
            // console.log(list);
            updateStudyNotCourseContent(list);
        }
    })
};

function updateStudyNotCourseContent(list) {
    let snCourseContentHtml="";
    let snAddTime = new Date(parseInt(list["sncourse_addtime"]));
    let snAddTimeYear = snAddTime.getFullYear();
    let snAddTimeMonth = snAddTime.getMonth() + 1;
    let snAddTimeDate = snAddTime.getDate();
    snCourseContentHtml += `
                <div id="aboutCourse">
                    <div class="courseImg"><img src="${list.sncourse_img}" alt="huxueyong"></div>`;

    if(list["sncourse_isVip"] != 0){
        snCourseContentHtml +=`
                    <div class="courseVip">VIP资源</div>`;
    }else{
        snCourseContentHtml +=`
                    <div class="courseVip">共享资源</div>`;
    }

    snCourseContentHtml +=`<div class="courseName">
                        <h2>${list.sncourse_name}</h2>
                    </div>
                    <div class="courseOption">
                        <div class="courseNumber" data-sncourse-id="${list.sncourse_id}">
                            <span>课程编号：${list.sncourse_number}</span>
                        </div>
                        <div class="courseGit">
                            <span class="courseGitIco"><i class="fa fa-github"></i></span><span class="courseGitUrl"><a href="${list.sncourse_gitUrl}" target="_blank">笔记与练习</a></span>
                        </div>
                        <div class="courseAddtime">
                            <span>发布时间：${snAddTimeYear}年${snAddTimeMonth}月${snAddTimeDate}日</span>
                        </div>
                    </div>
                </div>
                <div id="noteRichContent">
                    <div class="richNoteTitle">
                        <!--<span class="courseSetion">第一章</span>-->
                        <span class="courseTitle" data-sncc-id="${list.sncc_id}">${list.sncc_name}</span>
                    </div>
                    <div class="richContent">${list.sncc_content}</div>
                </div>`;

    $("#courseContainer").html(snCourseContentHtml);
}

//功能点4：根据地址栏的snccId 加载对应的文章信息

var SnccIdStr=window.location.search.substr(1);
load_studyNotCourseContent_bySnccId(SnccIdStr);


