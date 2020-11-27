$(function () {
    // 跳转功能
    $("#gotoRegi").on("click", function () {

        $(".regiBox").show();
        // $(this).parent().hide()
        $(".loginBox").hide();
    })

    $("#gotoLogin").click(function () {
        // $(".loginBox").show();
        $('.loginBox').show();
        // $(this).parent().hide();
        $(".regiBox").hide();

    })

    // $("#denglu").on('submit', function () {
    //     // alert('登录')

    // })


    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        //密码校验
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //确认密码的校验
        repass: function (value, item) {
            let pwd = $(".regiBox [name=password]").val();
            if (value !== pwd) {

                return "两次输入的不一样！"
            }
        }
    });

    $("#regiForm").on("submit", function (e) {
        e.preventDefault();

        //收集表单数据
        let data = $(this).serialize();
        $.ajax({
            url: "/api/reguser",
            type: "POST",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败,' + res.message);
                }

                layer.msg("注册成功");
                $("#gotoLogin").click()
            }
        })
    })

    $("#loginForm").submit(function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            url: "/api/login",
            type: "POST",
            data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }

                layer.msg("登录成功，即将去后台主页", function () {
                    location.href = "index.html";

                })
                localStorage.setItem("token", res.token);

            },
        })
    })
})

