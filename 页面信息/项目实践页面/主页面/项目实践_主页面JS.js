//页面初始化
$(".sideBar").load("/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});

//图片3D旋转效果  开始
$(".project-list").on("mouseenter mouseleave",".box-3d",function(e) {
    spin(e,this);
});

function spin(e,obj) {
    var sTop = getScrollTop();
    var w = obj.offsetWidth;
    var h = obj.offsetHeight;
    var x = e.pageX - obj.getBoundingClientRect().left - w/2;
    var y = e.pageY - obj.getBoundingClientRect().top - sTop - h/2;
    var direction = Math.round((((Math.atan2(y, x) * 180 / Math.PI) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
    var eventType = e.type;
    var box3D = $(obj).find(".box-3d-content");
    if(eventType == 'mouseenter'){
        switch (direction){
            case 0:
                box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(-90deg)");
                break;
            case 1:
                box3D.css("transform","translateZ(-85px) rotateY(-90deg) rotateX(0deg)");
                break;
            case 2:
                box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(90deg)");
                break;
            case 3:
                box3D.css("transform","translateZ(-85px) rotateY(90deg) rotateX(0deg)");
                break;
        }
    }else{
        box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(0deg)");
    }
}

//获取滚动条高度
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
//图片3D旋转效果  结束

function load_projectList_byProjectType(typeStr) {
    $.ajax({
        url:"http://118.89.242.134/myBlogResource/data/load_project_list.php",
        type:"GET",
        data:typeStr,
        dataType:"jsonp",
        success:function(datalist){
            update_projectList_container(datalist);
            setTimeout(function () {
                $(".loading-container").fadeOut("slow");
            },1000)

        },
        error:function (errorInformation) {
            console.log(errorInformation);

        }
    })
}

function update_projectList_container(datalist) {
    var projectListHtml = "";

    $.each(datalist,function(i,v){
        projectListHtml += `
                    <li class="project-list-item" data-project-id="${v.project_id}">
                        <div class="box-3d">
                            <div class="box-3d-content" style="transform: translateZ(-85px) rotateY(0deg) rotateX(0deg);">
                                <img src="${v.project_img}">
                                <img src="${v.project_img}">
                                <img src="${v.project_img}">
                                <img src="${v.project_img}">
                                <img src="${v.project_img}">
                            </div>
                        </div>
                        <div class="about-project">
                            <p class="project-name">${v.project_name}</p>
                        </div>`;
        if(v["project_skillType"] != ""){
            projectListHtml +=`
                        <div class="project-skillType">
                            <p>${v.project_skillType}</p>
                        </div>`;
        }

        projectListHtml += `</li>`;
    });

    $(".project-list").html(projectListHtml);
}

var typeStr=window.location.search.substr(1);
load_projectList_byProjectType(typeStr);