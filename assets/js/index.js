// 入口函数
$(function () {
    // 1、调用函数 获取用户信息
    getUserInfo();
    // 2、实现退出功能
    // 给退出按钮绑定点击事件 弹出 确认退出 的提示框 
    $('#btnLogout').on('click', function () {
        // 带问号图标的询问框
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 确认退出 1、删除本地的token
            localStorage.removeItem('token')
            // 2、跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})


// 封装函数 获取用户信息，在其他位置要用。所以封装为一个全局的
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // layui.layer.msg(res.message)
            // 获取用户信息成功后 调用函数渲染头像和用户名
            // console.log(res.data);
            renderAvatar(res.data);
        },
        // ajax请求完成时执行函数
        // complete: function (res) {
        //     console.log(res.responseJSON);
        //     // 身份认证失败的时候删除token 并强制跳转到登录页面
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
            
        // }

    })
}
// 封装函数 渲染用户头像和用户名
function renderAvatar(value) {
    // 渲染用户名
    var name = value.nickname || value.username
    // console.log(name);
    $('.welcome').html('欢迎 ' + name)
    // 渲染用户头像
    if (value.user_pic !== null) {
        $('.layui-nav-img').attr('src', value.user_pic);
        $('.avator').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.avator').show().html(name[0].toUpperCase())
    }
}

