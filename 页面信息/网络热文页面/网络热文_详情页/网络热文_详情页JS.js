//页面初始化
$(".sideBar").load("/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});

function loadNetworkArticleRichContent(naID){
    $.ajax({
        url:"http://118.89.242.134/myBlogResource/data/load_networkArticleRichContent.php",
        data:naID,
        success:function(naData){
            console.log(naData);
            if(naData != null){
                var richNoteTitleHtml=`<div class="naTitie">${naData.networkArticle_title}</div>
								   <div class="naInformation">
								   		<div class="naCategory"><span class="naCategoryFirst" data-nacf-name="${naData.nacf_id}">${naData.nacf_name}</span><span class="naCategorySecond" data-nacs-name="${naData.nacs_id}">${naData.nacs_name}</span></div>
								   		<div class="naSource"><span class="naSourceName">来源：${naData.networkArticle_source_name}</span><span class="naSourceUrl"><a href="${naData.networkArticle_url}" target="_blank">原文链接</a></span></div>
								   </div>`;
                $("div#noteRichContent>.richNoteTitle").html(richNoteTitleHtml);
                $("title").html(`${naData.networkArticle_title}_网络热文_BUXUEYONG_BLOG`);
                $("div#noteRichContent>.richContent").html(naData.networkArticle_content);

                if($("div#noteRichContent>.richContent > h2").length>0){
                    createMenu("div#noteRichContent>.richContent", "#menuBody");
                    h2SlideDiv("#menuBody");
                    menuScrollContent("div#noteRichContent>.richContent", "#menuBody");
                }

                contentOperate("div#noteRichContent>.richContent");
                Prism.highlightAll();
            }else {
                alert("文章不存在！点击[确定]，返回文章列表")
                window.location.href="/networkArticles.html";
            }
        }
    })
};

var naID=location.search.substr(1);
loadNetworkArticleRichContent(naID);