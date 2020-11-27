$(function () {

    let form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 校验新密码和原密码是否一致
        newPwd: function (value, item) {
            // value 新密码的内容
            let oldPwd = $("[name=oldPwd]").val();
            // console.log(oldPwd, value);
            if (oldPwd === value) {
                return "新密码不能和原密码一样"
            }
        },

        // 验两次新密码输入密码的是否一致
        samePwd: function (value, item) {
            let newPwd = $("[name=newPwd]").val();
            if (newPwd !== value) {
                return "两次输入的不一致"
            }
        },


    });

    $("#pwdFrom").on("submit", function (e) {
        e.preventDefault();

        let data = $(this).serialize();

        $.ajax({
            url: "/my/updatepwd",
            type: "POST",
            data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg("更新密码失败！" + res.message)
                }
                layer.msg("更新密码成功")
            }
        })

    });


});