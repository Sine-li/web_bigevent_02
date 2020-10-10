var baseUrl = 'http://ajax.frontend.itheima.net'

// 拦截所有的ajax请求
// 处理参数
$.ajaxPrefilter(function (options) {

    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 拼接对应服务器的地址
    options.url = baseUrl + options.url

    // 不是每一个权限的请求都要去判断complete 所以把complete 放在ajaxPrefilter中
    options.complete = function (res) {
        // 身份认证失败的时候删除token 并强制跳转到登录页面
        if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }

    }

})