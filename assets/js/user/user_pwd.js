// 入口函数
$(function () {
    // 1、为密码框定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与旧密码相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }

    })

    // 2、发起请求实现重置密码的功能
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data : $(this).serialize(),
            success : function (res) {
                if (res.status !== 0) {

                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message);
                // 密码更新成功后重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})