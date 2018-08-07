//页面初始化
$(".sideBar").load("/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});

var onargument = location.search.substr(1);
$.ajax({
    type: "GET",
    url: "http://118.89.242.134/myBlogResource/data/load_originalNoteContent.php",
    data: onargument,
    success: function (list) {
        console.log(list);
        $("div#noteRichContent>.richNoteTitle").html(list.originalNote_title);
        $("title").html(`${list.originalNote_title}_BUXUEYONG_BLOG`);
        $("div#noteRichContent>.richContent").html(list.originalNote_content);

        if($("div#noteRichContent>.richContent h2").length != 0){
            createMenu("div#noteRichContent>.richContent", "#menuBody");
            h2SlideDiv("#menuBody");
            menuScrollContent("div#noteRichContent>.richContent", "#menuBody");
        }

        contentOperate("div#noteRichContent>.richContent");
        Prism.highlightAll();

        $("span#seelargeImg").click(function(){
            var _this=$(this);
            var imgWidth=$(this).prev("img").width();
            var imgHeight=$(this).prev("img").height();
            $(this).parent().css("width",imgWidth);
            $(this).parent().css("height",imgHeight);
            console.log(imgWidth+","+imgHeight);
            // $(this).css("display","none");

            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                area: imgWidth,
                skin: 'layui-layer-nobg', //没有背景色
                shadeClose: true,
                scrollbar: false,
                skin: 'layui-layer-rim', //加上边框
                content: $(this).prev("img"),
                success: function(layero, index){
                    console.log(layero, index);
                    console.log(imgWidth+","+imgHeight);
                },
                end:function(){
                    // $(_this).css("display","inline-block");
                    // console.log(imgWidth+","+imgHeight);
                }
            });

        });

    },
    error:function (list) {
        console.log(list);
    }
});
