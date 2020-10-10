// 入口函数
$(function () {
    // 1、先写表单校验
    // 自定义表单校验
    // 昵称长度必须在 1 ~ 6 个字符之间
    var form = layui.form
    // 通过form.verify
    form.verify({
        nickname : function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })

    // 2、初始化用户信息
    initUserInfo();
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method : 'GET',
            url : '/my/userinfo',
            success : function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 渲染用户信息
                // 用form.val()为表单快速赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 3、实现表单重置
    $('#btnReset').on('click',function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        // 重新初始化信息即可
        initUserInfo();
    })

    // 4、 发起请求更新用户的信息
    $('.layui-form').on('submit',function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起请求
        $.ajax({
            method :'POST',
            url :'/my/userinfo',
            // 
            data : $(this).serialize(),
            success :function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    })
})