$(function () {

    let layer = layui.layer;


    $.ajax({
        url: "/my/userinfo",
        type: "GET",
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (res) {
            console.log(res);

            if (res.status !== 0) {
                return layer.msg("获取用户信息失败！");
            }

            // layer.msg("获取用户信息成功！")
            let name = res.data.nickname || res.data.username;
            // console.log(name);
            $("#welcome").text("欢迎 " + name);

            // if (!res.data.user_pic) {
            //     $('.layui-nav-img').hide();
            //     $('.text-avatar').show();
            // } else {
            //     $(".text-avatar").hide();
            //     $(".layui-nav-img").show().attr("src", res.data.user_pic)
            // }


            if (res.data.user_pic) {
                $(".text-avatar").hide();
                $(".layui-nav-img").show().attr("src", res.data.user_pic)
            } else {
                $('.layui-nav-img').hide();
                $('.text-avatar').show();
            }
        },

    })


    $("#logoutBtn").click(function () {
        layer.confirm(
            "确定退出登录？",
            { icon: 3, title: "提 示" },
            function (index) {
                //点击确认的时候执行的函数

                // console.log("点击确认了");

                layer.close(index);

                localStorage.removeItem("token");

                location.href = "login.html";


            }
        );
    });


});