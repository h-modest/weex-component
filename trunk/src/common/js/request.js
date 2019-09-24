
//  后台请求ip地址
// exports.COMMON_URL = "http://127.0.0.1:8081";
exports.COMMON_URL = "http://10.20.8.20";

/**
*   网络请求
*
*   @param  options {Object}
*       method  请求方法，默认 POST
*       url 请求地址
*       headers 请求头，默认 {'Content-Type': 'application/json'}
*       type 数据返回格式，默认值'json'
*       body 请求体
*       timeout 请求超时时间，默认值3000
*       success 成功执行函数
*       fail 失败执行函数
*   @example
*       request({url: "/login", success: function(res) {}})
*
**/
exports.request = function(options = {}) {
    let self = this,
        cbSuccess,
        cbFail,
        defaults = {
            method: 'POST',
            url: '',
            headers: {
              'Content-Type': 'application/json'
            },
            type: 'json',
            body: '',
            timeout: 3000
        };
    const stream = weex.requireModule('stream');
    for(let key in options) {
        if(key === 'success') {
            cbSuccess = options['success'];
        }else if( key === 'fail' ){
            cbFail = options['fail'];
        }else{
            defaults[key] = options[key];
            // const storage = weex.requireModule('storage');
            // storage.getItem("token", function(e) {
            //     if (e.result === 'success') {
            //         defaults.headers.Authorization = e.data;
            //     }
            // });
        }
    }
    defaults.url =  self.COMMON_URL + defaults.url;
    stream.fetch(defaults, function(res) {
        if(res.status === 200) {
            typeof cbSuccess === 'function' && cbSuccess(res.data);
        } else {
            if(cbFail) {
                typeof cbFail == 'function' && cbFail(res.data);
            }else{
                console.log("请求失败状态: " + res.status);
                console.log(JSON.stringify(res));
            }
        }
    });
}
