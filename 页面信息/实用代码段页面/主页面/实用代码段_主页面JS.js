//功能点1：加载左侧导航
$(".sideBar").load("/sidebar.html",function(){
    h2SlideDiv(".sideBarContent");
});

//功能点2.：加载右侧导航
$.ajax({
    url:"http://118.89.242.134/myBlogResource/data/load_superCodeClassificationToMenu.php",
    type:"GET",
    data:null,
    dataType:"jsonp",
    success:function (dataList) {
        console.log(dataList);
        let menuBodyHtml = "";

        $.each(dataList,function(i,v){
            let supercodeSC_id_arr = v["GROUP_CONCAT(`supercodeSC_id` ORDER BY `supercodeSC_id` ASC)"].split(",");
            let supercodeSC_name_arr = v["GROUP_CONCAT(`supercodeSC_name` ORDER BY `supercodeSC_id` ASC)"].split(",");

            menuBodyHtml += `<h2><a data-superCodeFC-id="${v.superCodeFC_id}">${v.superCodeFC_name}</a></h2><div>`;

            $.each(supercodeSC_id_arr,function (j,k) {
                menuBodyHtml += `<h3>
                                    <a data-supercodeSC-id="${k}">${supercodeSC_name_arr[j]}</a>
                                </h3>`
            });

            menuBodyHtml += `</div>`;
        })

        console.log(menuBodyHtml);

        $("#menuBody").html(menuBodyHtml);
        h2SlideDiv("#menuBody");

    },
    error:function (errorInfo) {
        console.log(errorInfo);
    }
});