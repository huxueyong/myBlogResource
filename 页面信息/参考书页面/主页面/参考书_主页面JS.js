$(function () {
    $(".sideBar").load("http://www.huxueyong.com/sidebar.html",function(){
        h2SlideDiv(".sideBarContent");
    });
    //初始化
    $.ajax({
        type: "GET",
        url: "http://118.89.242.134/myBlogResource/data/load_book_list_by_bookClassification.php",
        data: {"bookClassId": "1"},
        dataType: "jsonp",
        success: function (dataList) {
            //console.log(dataList);

            var bookListHtml = "";
            bookListHtml += "<ul class='bookListContent'>";
            $.each(dataList, function (i, v) {
                bookListHtml += `
            <li class="bookItem">
                <div class="bookCover">
                    <a href="/bookContent.html?bookId=${v.book_id}" target="_blank">
                        <img src="http://118.89.242.134/myBlogResource/img/book/${v.book_cover}" alt="${v.book_name}"/>
                        <span class="bookInfo" data-book-id="${v.book_id}"></span>
                    </a>
            </li> `;
            });
            //console.log(bookListHtml);
            bookListHtml += "</ul>";
            $("div.bookListContainer").html(bookListHtml);
        }

    });
//
    $("#menuBody>h2>a").click(function (i) {
        var bookClassId = $(this).attr("data-bookclass-id");
        $.ajax({
            type: "GET",
            url: "http://118.89.242.134/myBlogResource/data/load_book_list_by_bookClassification.php",
            data: {"bookClassId": bookClassId},
            dataType: "jsonp",
            success: function (dataList) {
                //console.log(dataList);

                var bookListHtml = "";
                bookListHtml += "<ul class='bookListContent'>";
                $.each(dataList, function (i, v) {
                    bookListHtml += `
            <li class="bookItem">
                <div class="bookCover">
                    <a href="/bookContent.html?bookId=${v.book_id}" target="_blank">
                        <img src="http://118.89.242.134/myBlogResource/img/book/${v.book_cover}" alt="${v.book_name}"/>
                        <span class="bookInfo" data-book-id="${v.book_id}"></span>
                    </a>
                </div>
            </li> `;
                });
                //console.log(bookListHtml);
                bookListHtml += "</ul>";
                $("div.bookListContainer").html(bookListHtml);
            }

        });
    });


})