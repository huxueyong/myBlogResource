$(function () {

    //加载左侧导航
    $(".sideBar").load("/sidebar.html",function(){
        h2SlideDiv(".sideBarContent");
    });
    // console.log(window);
    var bookId = location.search.substr(1);

    if(bookId===""){
        window.location.href="/book.html";
    }else{
        $.ajax({
            type: "GET",
            url: "http://118.89.242.134/myBlogResource/data/load_book_content_menu.php",
            data: bookId,
            success: function (dataList) {

                /*                    console.log(dataList["bookDescribe"]);
                                    console.log(dataList["firstLevelMenu"]);
                                    console.log(dataList["secondLevelMenu"]);*/
                console.log(dataList);
                var bookMenuHtml = "";
                var aboutBookHtml="";

                if (dataList["firstLevelMenu"].length !== 0) {

                    for (var i = 0, ilen = dataList["firstLevelMenu"].length; i < ilen; i++) {

                        bookMenuHtml += `<h2><a data-bookCon-id="${dataList["firstLevelMenu"][i]["bookCon_id"]}">${dataList["firstLevelMenu"][i]["bookCon_title"]}</a></h2>`;

                        if (dataList["secondLevelMenu"][i].length !== 0) {
                            var bookConIdArr = dataList["secondLevelMenu"][i][0]["GROUP_CONCAT(`bookCon_id` ORDER BY `bookCon_order` ASC)"].split(",");
                            var bookConTitleArr = dataList["secondLevelMenu"][i][0]["GROUP_CONCAT(`bookCon_title` ORDER BY `bookCon_order` ASC)"].split(",");
                            // console.log(booConTitleArr);
                            bookMenuHtml += "<div>";

                            for (var j = 0, jlen = bookConIdArr.length; j < jlen; j++) {
                                bookMenuHtml += `<h3><a data-bookCon-id="${bookConIdArr[j]}">${bookConTitleArr[j]}</a></h3>`;
                            }

                            bookMenuHtml += "</div>";

                        }


                    }

                } else {

                }

                aboutBookHtml+=`<div class="bookCover"><img src="http://118.89.242.134/myBlogResource/img/book/book_cover/${dataList["bookDescribe"]["book_cover"]}" alt=""></div>
                                        <div class="bookName">《${dataList["bookDescribe"]["book_name"]}》</div>
                                        <div class="bookBtn"><a  class="bookshelf" href="/book.html" target="_self">返回书架</a><a class="articleCatalogues">本文导航</a></div>
                                        <div class="articleCataloguesContainer"><div class="accBody"></div></div>`;
                // console.log(bookMenuHtml);
                $("#menuBody").html(bookMenuHtml);
                h2SlideDiv("#menuBody");
                $("#aboutBook").html(aboutBookHtml);
                $("title").html(`${dataList["bookDescribe"]["book_name"]}_BUXUEYONG_BLOG`);

                var firstBookConId=dataList["firstLevelMenu"][0]["bookCon_id"];
                // console.log(firstBookConId);
                loadBookContentByBookId(firstBookConId);


            }

        });
    }

    function loadBookContentByBookId(id) {
        $.ajax({
            type: "GET",
            url: "http://118.89.242.134/myBlogResource/data/load_book_content_byBookConId.php",
            data: {"bookConId": id},
            success: function (datalist) {
                console.log(datalist);
                var bookConHeaderHtml = "";
                var bookConBodyHtml = "";
                /*                        bookConHeaderHtml += `<div data-book-id="${datalist["book_id"]}"><img src="${datalist["book_cover"]}" alt="">${datalist["book_name"]}</div>`;
                                        $("#bookContentHeader").html(bookConHeaderHtml);*/

                bookConHeaderHtml += `<div data-bookCon-id="${datalist["bookCon_id"]}" class="bookConTitle">${datalist["bookCon_title"]}</div>`;

                $("#bookContentHeader").html(bookConHeaderHtml);

                if(datalist["bookCon_content"]!==""){
                    bookConBodyHtml += `${datalist["bookCon_content"]}`;
                }else{
                    bookConBodyHtml+=`<div class="noBookContent"></div>`;
                }


                $("#bookContentBody").html(bookConBodyHtml);
                contentOperate("#bookContentBody");
                createMenu("#bookContentBody",".accBody");
                h2SlideDiv(".accBody");
                menuScrollContent("#bookContentBody",".accBody");
                Prism.highlightAll();
                if($("#bookContentBody>h2").length===0){
                    $("div#aboutBook>.bookBtn>a.articleCatalogues").removeClass("checked");
                    $("div#aboutBook>.articleCataloguesContainer").slideUp();

                }
            }
        });
    };

    $("#menuBody").on("click","a",function(e){
        e.preventDefault();
        if($(this).hasClass("checked")){
            // $(this).removeClass("checked");
            return;
        }else{
            $("#menuBody a").removeClass("checked");
            $(this).addClass("checked")
            var bookConId=$(this).attr("data-bookcon-id");
            loadBookContentByBookId(bookConId);
        }
    });

    $("div#aboutBook").on("click",".bookBtn>a.articleCatalogues",function(e){
        e.preventDefault();
        if($("#bookContentBody>h2").length!==0){
            $(this).toggleClass("checked");
            $("div#aboutBook>.articleCataloguesContainer").slideToggle();
        }else {
            $("div#aboutBook>.articleCataloguesContainer").slideUp();
            $(this).removeClass("checked");
        }

    })

})