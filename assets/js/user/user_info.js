$(function () {

    let form = layui.form;
    let layer = layui.layer;
    getInfo();
    function getInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg("获取用户基本信息失败！")
                }

                //获取信息成功,把相应回来的数据填充到表单中
                //给表单赋值
                form.val("userForm", res.data);
            }

        })
    };

    $("#resetBtn").on("click", function (e) {
        e.preventDefault();
        getInfo();
    });

    $("#userForm").submit(function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        console.log(data);

        $.ajax({
            url: "/my/userinfo",
            type: "POST",
            data,
            success: function (res) {
                // console.log(res);

                if (res.status !== 0) {

                    return layer.msg("更改信息失败！");
                };

                layer.msg("更新信息成功！");

                window.parent.getAvatarAndName();
                // console.log(window.parent.getAvatarAndName);
            }
        })
    })

    form.verify({
        //昵称长度限制
        nickname: function (value, item) {
            // console.log(value);

            if (value.length > 6) {

                return "昵称长度必须在1~6之间"
            }


        }
    })
});