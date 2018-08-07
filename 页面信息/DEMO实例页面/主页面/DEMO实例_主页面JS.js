//页面初始化
$(".sideBar").load("/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});

//图片3D旋转效果  开始
$(".demo-list").on("mouseenter mouseleave",".box-3d",function(e) {
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

//效果预览 开始
$(".demo-list").on("click",".demo-preview",function(e){
    e.preventDefault();
    let demoPreviewUrl=$(this).attr("href");
    let demoName=$(this).attr("data-demo-name");
    layer.open({
        move: false,
        type: 2,
        title: demoName+'_HUXUEYONG_BLOG',
        shadeClose: true,
        shade: 0.8,
        area: ['80%', '90%'],
        content: demoPreviewUrl //iframe的url
    });
})
//效果预览 结束

//加载主体数据 开始

function load_demoList_byProjectType(typeIdStr) {
    $.ajax({
        url:"http://118.89.242.134/myBlogResource/data/load_demo_list.php",
        type:"GET",
        data:typeIdStr,
        dataType:"jsonp",
        success:function(datalist){
            update_demoList_container(datalist);
            setTimeout(function(){
                $(".loading-container").fadeOut("slow");
            },3000);
        },
        error:function (errorInformation) {
            console.log(errorInformation);

        }
    })
}

function update_demoList_container(datalist) {
    var demoListHtml = "";

    $.each(datalist,function(i,v){
        demoListHtml += `
            <li class="demo-list-item" data-demo-id="${v.demo_id}">
                <div class="box-3d">
                    <div class="box-3d-content" style="transform: translateZ(-85px) rotateY(0deg) rotateX(0deg);">
                        <img src="${v.demo_img}">
                        <img src="${v.demo_img}">
                        <img src="${v.demo_img}">
                        <img src="${v.demo_img}">
                        <img src="${v.demo_img}">
                    </div>
                </div>
                <div class="about-demo">
                    <p class="demo-name">${v.demo_name}</p>
                </div>
                 <div class="demo-type demo-type-${v.demo_type_id}" data-type-id="${v.demo_type_id}">
                    <p>${v.demo_type_name}</p>
                 </div>
                <div class="demo-button">
                    <a href="${v.demo_preview_url}" class="demo-preview" data-demo-name="${v.demo_name}">效果预览</a>
                    <a href="${v.demo_git_url}" target="_blank" class="demo-code">源代码</a>
                </div>
            </li>
        `;
    });

    $(".demo-list").html(demoListHtml);
}

var typeIdStr=window.location.search.substr(1);
load_demoList_byProjectType(typeIdStr);

//加载主体数据 结束