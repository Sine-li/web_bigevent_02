// 入口函数
$(function () {
    // 1、显示隐藏切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 2、自定义校验规则
    // 导出form表单
    var form = layui.form
    // 用form.verify()方法自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须是6-16位，不能输入空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val();
            if (value !== pwd) {
                return "两次输入密码不一致"
            }
        }
    })

    // 3、注册功能
    // layui 的 弹层组件 layer
    var layer = layui.layer
    // 给form表单绑定提交表单的事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发送ajax  POST 请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: function (res) {
                // 判断请求成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 注册成功后自动跳转到登录页面
                $('#link_login').click();
                // 注册成功后清空表单的内容
                // console.log($('#form_reg'));
                $('#form_reg')[0].reset();
            }
        })
    })

    // 登录功能
    $('#form_login').on('submit',function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发送 ajax  POST 请求
        $.ajax({
            method : 'POST',
            url : '/api/login',
            data : $(this).serialize(),
            success : function (res) {
                // 判断请求成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示信息
                layer.msg(res.message)
                // 设置本地存储token
                localStorage.setItem("token", res.token)
                console.log(res)
                // 登录成功跳转到index.html页面
                location.href = '/index.html'
            }
        })
    })
})