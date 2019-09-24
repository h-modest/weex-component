/**
*   此文件为项目所需的公用方法
*
*   @author kalakalaxyz
*   @version    1.0.0
*
**/

//本地文件目录名称
exports.FILE_PATH = "";
//线上文件目录名称
// exports.FILE_PATH = "/web";

//本地图片目录名称
// exports.IMAGE_PATH = "/web";

//线上图片目录名称
exports.IMAGE_PATH = "/web";

//注：线上文件目录名称 与 线上图片目录名称 应一致
/**
*   判断设备系统是否为iOS
*
*   @return {Boolean}   iOS返回 true; 否则返回 false
*
**/
exports.isIOS = function() {
    return weex.config.env.platform.toLowerCase() === "ios";
};

/**
*   判断设备系统是否为android
*
*   @return {Boolean}   android返回 true; 否则返回 false
*
**/
exports.isAndroid = function() {
    return weex.config.env.platform.toLowerCase() === "android";
};

/**
*   判断设备是不是iphoneX 或是iPhoneXs
*
*   @return {Boolean}   是iphoneX 或是iPhoneXs返回 true; 否则返回 false
*
**/
exports.isIphoneX = function() {
    return this.isIOS() && weex.config.env.deviceHeight === 2436;
};

/**
*   判断设备是不是iphoneXr
*
*   @return {Boolean}   是iphoneXr返回 true; 否则返回 false
*
**/
exports.isIphoneXr = function() {
    return this.isIOS() && weex.config.env.deviceHeight === 1792;
};

/**
*   判断设备是不是iphoneXsMax
*
*   @return {Boolean}   是iphoneXsMax返回 true; 否则返回 false
*
**/
exports.isIphoneXsMax = function() {
    return this.isIOS() && weex.config.env.deviceHeight === 2688;
};

/**
*   获取设备的绝对路径
*
*   @return {String}    bundleUrl
*
**/
exports.getBundleUrl = function() {
    return weex.config.bundleUrl;
};

/**
*   获取平台信息
*
*   @return {String}    安卓返回'android'，ios返回'ios',h5返回'web'
*
**/
exports.getPlatform = function() {
    return weex.config.env.platform.toLowerCase();
};

/**
*   获取app版本号
*
*   @return {String}    appVersion
*
**/
exports.getAppVersion = function() {
    return weex.config.env.appVersion;
};

/**
*   获取设备高度
*
*   @return {Number}    deviceHeight
*
**/
exports.getDeviceHeight = function() {
    return weex.config.env.deviceHeight;
};

/**
*   获取设备宽度
*
*   @return {Number}    deviceHeight
*
**/
exports.getDeviceWidth = function() {
    return weex.config.env.deviceWidth;
};

/**
*   获取电池栏高度
*
*   @return {Number}    barHeight
*
**/
exports.getBarHeight = function() {
    if(this.isIOS()) {
        if (this.isIphoneX() || this.isIphoneXr() || this.isIphoneXsMax()) {
            return 60;
        }
        return 40;
    } else if(this.isAndroid()) {
        let barHeight = parseInt(weex.config.env.statusBarHeight);
        return barHeight * (750 / this.getDeviceWidth());
    }
    return 0;
}

/**
*   获取屏幕相对于页面的高度
*
*   @return {Number}    barHeight
*
**/
exports.getDevHeight = function() {
  var deviceHeight = this.getDeviceHeight();
  var deviceWidth = this.getDeviceWidth();
  return deviceHeight * (750 / deviceWidth);
}

/**
*   获取图片完整路径前缀
*
*   @return {String}    imageUrl
*
**/
exports.getImageUrl = function() {
    let bundleUrl = this.getBundleUrl(),
        isHttp = bundleUrl.indexOf('http') >= 0,
        i = bundleUrl.indexOf('dist'),
        imageUrl;
        if(isHttp) {
            if(this.getPlatform() === "web") {
                let urlArr = bundleUrl.split("://");
                let startIndex = urlArr[1].indexOf("/");
                imageUrl = urlArr[0] + "://" + urlArr[1].slice(0, startIndex) + this.IMAGE_PATH + "/static/images/";
                console.log("imageUrl===" + imageUrl);
            } else {
                imageUrl = bundleUrl.slice(0, i) + (this.isAndroid()? 'images/': 'images.bundle/')
            }
        } else {
            if(this.getPlatform() === "web") {
                let startIndex = bundleUrl.indexOf("/web/");
                imageUrl = bundleUrl.slice(0, startIndex) + this.IMAGE_PATH + "/static/images/";
                console.log("imageUrl===" + imageUrl);
            } else {
                imageUrl = this.isAndroid()? 'assets:': bundleUrl.slice(0, i ) + 'images.bundle/';
            }
        }
        return imageUrl
};

/**
*   获取url地址
*
*   @return {String}    baseUrl
*
**/
exports.getBaseUrl = function() {
    let bundleUrl = this.getBundleUrl();
    console.log("bundleUrl===" + bundleUrl);
    let isHttp = bundleUrl.indexOf('http') >= 0;
    let nativeBase;
    let h5Base;
    if (isHttp) {
        console.log("this.getPlatform()===" + this.getPlatform());
        if(this.getPlatform() === "web") {
            let urlArr = bundleUrl.split("://");
            let startIndex = urlArr[1].indexOf("/");
            h5Base = urlArr[0] + "://" + urlArr[1].slice(0, startIndex) + this.FILE_PATH;
            console.log("h5Base===" + h5Base);
        } else if (this.isAndroid()) {
            let i = bundleUrl.indexOf('/dist/');
            nativeBase = bundleUrl.slice(0, i) + '/dist';
        } else if (this.isIOS()) {
            let i = bundleUrl.indexOf('/dist/');
            nativeBase = bundleUrl.slice(0, i) + '/dist/';
        }
    } else {
        if (this.isAndroid()) {
            nativeBase = 'file://assets/dist';
        } else if (this.isIOS()) {
            nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('dist/') + 5);
        } else {
            let startIndex = bundleUrl.indexOf("/web/");
            h5Base = bundleUrl.slice(0, startIndex) + "/web";
        }
    }
    return typeof window === 'object'? h5Base: nativeBase;
};

/**
*   页面跳转
*
*   @param url{String}  具体路径,如：'/main';
*   @param sliding{String}  iOS侧滑开关 "true"为开启;"false"关闭
*   @param param{String}    url带参数，如：'name1=value1&name2=value2'
*   @param callback{Function}   回调函数
*
**/
exports.jump = function(url, sliding = "true", param = "", callback) {
    const navigator = weex.requireModule('navigator');
    let baseUrl = this.getBaseUrl() || "";
    console.log("baseUrl===" + baseUrl)
    let urlAll = this.getPlatform() === "web"? (baseUrl + url + '.html?' + param): (baseUrl + url + '.js?' + param);
    console.log("urlAll===");
    console.log(urlAll);
    let urlObj = {'url': urlAll, 'animated': 'true', 'leftsliding': sliding};
    console.log("urlObj===" + JSON.stringify(urlObj));
    navigator.push(urlObj, function (e) {
        typeof callback === 'function' && callback(e);
    });
};

/**
*   弹窗提示
*
*   @param message{String}  提示的信息
*   @param duration{Number} 展示的时间(秒)
*
**/
exports.showToast = function(message, duration = 1) {
    const modal = weex.requireModule('modal');
    modal.toast({
        'message': message,
        'duration': duration
    });
};

/**
*   数组拆分
*
*   @param arr{Array}   要拆分的数组
*   @param num{Number}  每组的个数
*   @return {Array} splitArr
*   @example splitArr([1,2,3,4,5,6,7,8], 3) 返回 [[1, 2, 3], [4, 5, 6], [7, 8]]
*
**/
exports.splitArr = function (arr, num) {
    let resArr = [];
    if (arr.length > 0) {
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
            tempArr.push(arr[i]);
            if (tempArr.length === num && i !== 0) {
                resArr.push(tempArr);
                tempArr = [];
            }
            if ((arr.length - 1) === i && tempArr.length !== num) {
                resArr.push(tempArr);
            }
        }
    }
    return resArr;
};

/**
*   获取指定长度的随机码
*
*   @param len{Number}  长度
*   @return {String}    str
*
**/
exports.getNonceStr = function(len = 16) {
    let str = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < len; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return str
}

/**
*   去除字符串的空格
*
*   @param str{String}  要去空格的字符串
*   @return {String}    str
*
**/
exports.trim = function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
};


/**
*   对象深，浅拷贝
*
*   @param obj{Object}  要格式化的时间
*   @param deep{Boolean}
*   @return {Object}
*
**/
exports.copy = function(obj, deep) {
    if(typeof obj !== "object") {
        return obj;
    }
    let key, target = Array.isArray(obj)? []: {};
    for(key in obj) {
        if(deep && typeof obj[key] === "object") {
            target[key] = this.copy(obj[key], deep);
        } else {
            target[key] = obj[key];
        }
    }
    return target;
}

/**
*   获取url参数
*
*  @param url{String} url参数
*  @param name{String} 参数名
*
**/
exports.getUrlParm = function (url, name) {
  let value = '';
  let str = url; //取得整个地址栏
  let num = str.indexOf("?")
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
  let arr = str.split("&"); //各个参数放到数组里
  for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf("=");
      if (num > 0) {
          //name=arr[i].substring(0,num);
          if (name == arr[i].substring(0, num)) {
              value = arr[i].substr(num + 1);
          }
      }
  }
  return value;
};

/**
*  判断是否未定义
*
*  @param param{String} param参数
*  @return {Boolean}
*
**/
exports.isUndefined = function (param) {
  if (typeof param == 'undefined' || param == 'undefined') {
    return true;
  }
  return false;
}

/**
* 重组数组结构 - 需所得数组为[[],[]]
* @param arr{Array} 数组数据
* @param len{Number}  切割长度
* @return newArr{Array} 重组好的数组结构
*/
exports.reorganizeArray = function(arr, len) {
  let newArr = [];
  let temArr = [];
  if (arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      let isCut = (i + 1)%len == 0;
      temArr.push(arr[i]);
      if ((i == arr.length - 1) || isCut) {
        newArr.push(temArr);
      }
      if (isCut) {
        temArr = [];
      }
    }
  }
  return newArr;
}

/**
* 重组数组结构 - 需所得数组为[[],[]]
* @param phone{String}  手机号码
* @return regPhone{String} 脱敏手机格式
*/
exports.regPhone = function(phone) {
  let len = phone.length;
  let f1 = phone.substring(0,3);
  let f2 = phone.substring(len-3, len-1);
  let num = len - 5;
  let regPhone = f1;
  for (var i = 0; i < num; i++) {
    regPhone += '*';
  }
  regPhone+= f2;
  return regPhone;
}

/**
* 延时执行
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“去弹跳”了的函数
*/
exports.debounce = function(func, wait = 500) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
