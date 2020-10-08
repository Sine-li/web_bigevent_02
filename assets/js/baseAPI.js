var baseUrl = 'http://ajax.frontend.itheima.net'

// 拦截所有的ajax请求
// 处理参数
$.ajaxPrefilter(function (options) {
    
    // 拼接对应服务器的地址
    options.url = baseUrl + options.url
})