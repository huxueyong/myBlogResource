function createMenu(a, b) {
	var menuH1 = "";
	menuH1 += "<h2><a>" + $(a).find("h2").eq(0).text() + "</a></h2><div>";
	for (var i = 1; i < $(a).find("h2,h3,h4").length; i++) {
		if ($(a).find("h2,h3,h4")[i].nodeName == "H2") {
			menuH1 += "</div><h2><a>" + $(a).find("h2,h3,h4").eq(i).text() + "</a></h2><div>";
		} else if ($(a).find("h2,h3,h4")[i].nodeName == "H3") {
			menuH1 += "<h3>" + $(a).find("h2,h3,h4").eq(i).text() + "</h3>";
		} else if ($(a).find("h2,h3,h4")[i].nodeName == "H4") {
			menuH1 += "<h4>" + $(a).find("h2,h3,h4").eq(i).text() + "</h4>";
		}
	}
	menuH1 += "</div>";
	$(b).html(menuH1);


	for (var i = 0; i < $(b).find("div").length; i++) {
		var menuH2 = "";
		menuH2 += "<h3><a>" + $(b).find("div").eq(i).find("h3").eq(0).text() + "</a></h3><ul>";
		for (var j = 1; j < $(b).find("div").eq(i).find("h3,h4").length; j++) {
			if ($(b).find("div").eq(i).find("h3,h4")[j].nodeName == "H3") {
				menuH2 += "</ul><h3><a>" + $(b).find("div").eq(i).find("h3,h4").eq(j).text() + "</a></h3><ul>"

			} else if ($(b).find("div").eq(i).find("h3,h4")[j].nodeName == "H4") {
				menuH2 += "<li><h4><a>" + $(b).find("div").eq(i).find("h3,h4").eq(j).text() + "</a></h4></li>"

			}
		}
		menuH2 += "</div>";
		$(b).find("div").eq(i).html(menuH2);

	}

	$(b).find("ul").each(function (i) {
		if ($(this).text().length == 0) {
			$(this).remove();
		}
	})
	$(b).find("h3").each(function (i) {
		if ($(this).text().length == 0) {
			$(this).remove();
		}
	})
	$(b).find("div").each(function (i) {
		if ($(this).text().length == 0) {
			$(this).remove();
		}
	})
}//a-正文板块的id，b-目录板块的id
//  点击一级目录，折叠二、三级目录函数
function h2SlideDiv(a) {
	$(a).find("h2").each(function (index) {
		//$(this).on("click", function () {
		//                $(this).toggleClass("checked");
		//});
		if ($(this).next().length == !0 && $(this).next()[0].nodeName == "DIV") {
			$(this).find("a").append("<i class='fa fa-plus-square-o'></i><i class='fa fa-minus-square-o'></i>");
			$(this).on("click", function () {
				$(this).toggleClass("checked");
				$(this).next().slideToggle(300);
			});
		}
		;
	});
	$(a).find("div > h3").each(function (index) {
		if ($(this).next().length == !0 && $(this).next()[0].nodeName == "UL") {
			$(this).on("click", function () {
				$(this).toggleClass("checked");
				$(this).next().slideToggle(300)
			})
		}
	});
}


//a-目录板块的id
//  点击目录，滚动正文
function menuScrollContent(a, b) {
	for (var i = 0; i < $(b).find("a").length; i++) {
		var menuH_index = "menuH" + i;
		$(b).find("a").eq(i).attr("data-index", "#" + menuH_index);
		$(a).find("h2,h3,h4").eq(i).attr("id", menuH_index);
	}

	$(b).find("a").on("click", function () {
		var cocol = "";
		cocol = $(this).attr("data-index");    //replace(/#/, "#content")
		cocol = $(cocol).offset().top - 50;
//        cocol = $(cocol).position().top - 130;
		$("html,body").stop().animate({scrollTop: cocol}, 1000);
	})
}


$("#menuHeader>div>span").eq(0).on("click", function () {
	$("#menuBody div").slideDown(300);
})
$("#menuHeader>div>span").eq(1).on("click", function () {
	$("#menuBody div").slideUp(300);
})

function contentOperate(a) {

	// $(a).find("h2").prepend("<img src='http://6990373.s21i-6.faiusr.com/4/ABUIABAEGAAgjpblxwUowNef8QIw8AE40gE.png'>");

	$(a).find("img").wrap("<p></p>");
	$(a).find("img").parent().append("<span id='seelargeImg'></span>");
	$(a).find("img").parent().parent().addClass("imgContainer");

	//$("#fullmeasureContent1239_1>h4").find("h4").prepend("<span>●</span>");

        $(a).find("a").attr("target","_blank");


	$(a).find("pre").addClass("line-numbers");


	$(a).find("pre").each(function (i) {
		if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") == "HTML") {
			$(this).prev().addClass("codeTig");
			$(this).children().addClass("language-markup");
			
		} else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "CSS" || $(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") == "LESS") {
			$(this).prev().addClass("codeTig");
			$(this).children().addClass("language-css");
			
		} else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") == "javascript") {
			$(this).prev().addClass("codeTig");
			$(this).children().addClass("language-javascript");
			
		} else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") == "PHP") {
			$(this).prev().addClass("codeTig");
			$(this).children().addClass("language-php");
			
		}else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") == "SQL") {
			$(this).prev().addClass("codeTig");
			$(this).children().addClass("language-sql");
			
		}else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") == "git") {
			$(this).prev().addClass("codeTig");
			$(this).children().addClass("language-git");
			
		}else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") == "java") {
            $(this).prev().addClass("codeTig");
            $(this).children().addClass("language-java");

        }

	})


	$(a).find("ul").each(function () {
		$(this).find("li").each(function () {
			$(this).html("<span>" + $(this).text() + "</span>");
		})
		if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") == "学习目标") {
			$(this).prev().addClass("ulTig");
			$(this).prev().html("<span>学习目标</span>");
			$(this).addClass("ul-learnObj");
			$(this).find("li").prepend("<img src='http://6990373.s21i-6.faiusr.com/4/ABUIABAEGAAg9e2WyAUo8PPfuAcwkwI4rAI.png'>");
		}

	})

	$(a).find("blockquote").each(function () {
                 $(this).prev().addClass("blockquoteTig");
		if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "提示" || $(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "说明") {


		} else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "错误") {


		} else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "补充") {


		} else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "注意" ||$(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "警告" || $(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "陷阱") {
			$(this).prev().prepend("<i class='fa fa-warning'></i>");
                        $(this).addClass("warning");
		} else if ($(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "讨论" || $(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "探讨" || $(this).prev().text().replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "") === "问题") {


		} else {
			$(this).prev().removeClass("blockquoteTig");
		}
	})


	//$(a).find("h2,h3").prepend("<i class='fa fa-navicon'></i>");
	//$(a).find("h4").prepend("<i class='fa fa-circle'></i>");
	//$(a).find("h5").prepend("<i class='fa fa-circle-o'></i>");


}