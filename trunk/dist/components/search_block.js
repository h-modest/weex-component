// { "framework": "Vue"} 

!function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var o={};t.m=e,t.c=o,t.d=function(e,o,r){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=97)}({0:function(e,t,o){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.COMMON_URL="http://10.20.8.20",t.FILE_PATH="",t.IMAGE_PATH="/web",t.isIOS=function(){return"ios"===weex.config.env.platform.toLowerCase()},t.isAndroid=function(){return"android"===weex.config.env.platform.toLowerCase()},t.isIphoneX=function(){return this.isIOS()&&2436===weex.config.env.deviceHeight},t.isIphoneXr=function(){return this.isIOS()&&1792===weex.config.env.deviceHeight},t.isIphoneXsMax=function(){return this.isIOS()&&2688===weex.config.env.deviceHeight},t.getBundleUrl=function(){return weex.config.bundleUrl},t.getPlatform=function(){return weex.config.env.platform.toLowerCase()},t.getAppVersion=function(){return weex.config.env.appVersion},t.getDeviceHeight=function(){return weex.config.env.deviceHeight},t.getDeviceWidth=function(){return weex.config.env.deviceWidth},t.getBarHeight=function(){if(this.isIOS())return this.isIphoneX()||this.isIphoneXr()||this.isIphoneXsMax()?60:40;if(this.isAndroid()){return parseInt(weex.config.env.statusBarHeight)*(750/this.getDeviceWidth())}return 0},t.getImageUrl=function(){var e=this.getBundleUrl(),t=e.indexOf("http")>=0,o=e.indexOf("dist"),r=void 0;if(t)if("web"===this.getPlatform()){var n=e.split("://"),i=n[1].indexOf("/");r=n[0]+"://"+n[1].slice(0,i)+this.IMAGE_PATH+"/static/images/",console.log("imageUrl==="+r)}else r=e.slice(0,o)+(this.isAndroid()?"images/":"images.bundle/");else if("web"===this.getPlatform()){var s=e.indexOf("/web/");r=e.slice(0,s)+this.IMAGE_PATH+"/static/images/",console.log("imageUrl==="+r)}else r=this.isAndroid()?"assets:":e.slice(0,o)+"images.bundle/";return r},t.getBaseUrl=function(){var e=this.getBundleUrl();console.log("bundleUrl==="+e);var t=e.indexOf("http")>=0,o=void 0,n=void 0;if(t){if(console.log("this.getPlatform()==="+this.getPlatform()),"web"===this.getPlatform()){var i=e.split("://"),s=i[1].indexOf("/");n=i[0]+"://"+i[1].slice(0,s)+this.FILE_PATH,console.log("h5Base==="+n)}else if(this.isAndroid()){var a=e.indexOf("/dist/");o=e.slice(0,a)+"/dist"}else if(this.isIOS()){var l=e.indexOf("/dist/");o=e.slice(0,l)+"/dist/"}}else if(this.isAndroid())o="file://assets/dist";else if(this.isIOS())o=e.substring(0,e.lastIndexOf("dist/")+5);else{var f=e.indexOf("/web/");n=e.slice(0,f)+"/web"}return"object"===("undefined"==typeof window?"undefined":r(window))?n:o},t.jump=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"true",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments[3],n=weex.requireModule("navigator"),i=this.getBaseUrl()||"";console.log("baseUrl==="+i);var s="web"===this.getPlatform()?i+e+".html?"+o:i+e+".js?"+o;console.log("urlAll==="),console.log(s);var a={url:s,animated:"true",leftsliding:t};console.log("urlObj==="+JSON.stringify(a)),n.push(a,function(e){"function"==typeof r&&r(e)})},t.showToast=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;weex.requireModule("modal").toast({message:e,duration:t})},t.splitArr=function(e,t){var o=[];if(e.length>0)for(var r=[],n=0;n<e.length;n++)r.push(e[n]),r.length===t&&0!==n&&(o.push(r),r=[]),e.length-1===n&&r.length!==t&&o.push(r);return o},t.getNonceStr=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16,t="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=0;r<e;r++)t+=o.charAt(Math.floor(Math.random()*o.length));return t},t.trim=function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},t.format=function(e,t){var o={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds()};new RegExp(/(y+)/).test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in o)new RegExp("("+r+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?o[r]:("00"+o[r]).substr((""+o[r]).length)));return t},t.copy=function(e,t){if("object"!==(void 0===e?"undefined":r(e)))return e;var o=void 0,n=Array.isArray(e)?[]:{};for(o in e)t&&"object"===r(e[o])?n[o]=this.copy(e[o],t):n[o]=e[o];return n},t.telReg=/^1[0-9]{10}$/,t.emailReg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,t.wxReg=/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,t.numReg=/^[0-9]*$/,t.percentReg=/^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/,t.isReg=function(e,t){return e.test(t)},t.request=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this,o=void 0,r=void 0,n={method:"POST",url:"",headers:{"Content-Type":"application/json"},type:"json",body:"",timeout:3e3},i=weex.requireModule("stream");for(var s in e)"success"===s?o=e.success:"fail"===s?r=e.fail:n[s]=e[s];n.url=t.COMMON_URL+n.url,i.fetch(n,function(e){200===e.status?"function"==typeof o&&o(e.data):r?"function"==typeof r&&r(e.data):(console.log("请求失败状态: "+e.status),console.log(JSON.stringify(e)))})},t.getUrlParm=function(e,t){var o="",r=e,n=r.indexOf("?");r=r.substr(n+1);for(var i=r.split("&"),s=0;s<i.length;s++)(n=i[s].indexOf("="))>0&&t==i[s].substring(0,n)&&(o=i[s].substr(n+1));return o},t.isUndefined=function(e){return void 0===e||"undefined"==e},t.reorganizeArray=function(e,t){var o=[],r=[];if(e.length>0)for(var n=0;n<e.length;n++){var i=(n+1)%t==0;r.push(e[n]),(n==e.length-1||i)&&o.push(r),i&&(r=[])}return o},t.regPhone=function(e){for(var t=e.length,o=e.substring(0,3),r=e.substring(t-3,t-1),n=t-5,i=o,s=0;s<n;s++)i+="*";return i+=r},t.debounce=function(e){var t,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return function(){var r=this,n=arguments,i=function(){t=null,e.apply(r,n)};clearTimeout(t),t=setTimeout(i,o)}}},100:function(e,t){e.exports={sh_w60:{width:"60"},sh_h60:{height:"60"},sh_br40:{borderTopLeftRadius:"40",borderBottomLeftRadius:"40",borderTopRightRadius:"40",borderBottomRightRadius:"40"},sh_wh30:{width:"30",height:"30"}}},101:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(0),n=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default={props:{placeholder:{type:String,default:"请输入搜索内容..."}},data:function(){return{imageBaseUrl:"",searchVal:"",styleStatus:{}}},created:function(){this.init()},methods:{init:function(){this.imageBaseUrl=n.default.getImageUrl();var e=n.default.getBarHeight();this.styleStatus=Object.assign({height:e+"px","background-color":"#ffffff"})},_input:function(e){var t=e.value;this.searchVal=t,this.$emit("onInput",t)},_cancel:function(){this.$emit("onCancel")},_clear:function(){"web"===n.default.getPlatform()?this.$refs.search.value="":this.$refs.search.setInputValue(""),this.$emit("onClear")}}}},102:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:["yy_bgfff"]},[o("div",{style:e.styleStatus}),o("div",{staticClass:["yy_h100","yy_w750","yy_flex_row","yy_center_row"]},[o("div",{staticClass:["yy_flex_1","yy_flex_row","sh_h60","yy_bg_f9f9f9","yy_center","yy_ml30","sh_br40"]},[o("div",{staticClass:["sh_w60","sh_br40","yy_center"]},[o("image",{staticClass:["sh_wh30"],attrs:{src:e.imageBaseUrl+"main/search.png"}})]),o("input",{ref:"search",staticClass:["yy_flex_1","sh_h60","yy_bg_f9f9f9","sh_br40"],attrs:{type:"text",placeholder:e.placeholder},on:{input:e._input}}),e.searchVal.length>0?o("div",{staticClass:["sh_w60","sh_br40","yy_center"],on:{click:e._clear}},[o("image",{staticClass:["sh_wh30"],attrs:{src:e.imageBaseUrl+"main/cha.png"}})]):e._e()]),o("div",{staticClass:["yy_w120","yy_center"],on:{click:e._cancel}},[o("text",{staticClass:["yy_c3d80fa","yy_fs34"]},[e._v("取消")])])])])},staticRenderFns:[]},e.exports.render._withStripped=!0},97:function(e,t,o){"use strict";var r=o(98),n=function(e){return e&&e.__esModule?e:{default:e}}(r);n.default.el="#root",new Vue(n.default)},98:function(e,t,o){var r,n,i=[];i.push(o(99)),i.push(o(100)),r=o(101);var s=o(102);n=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(Object.keys(r).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),n=r=r.default),"function"==typeof n&&(n=n.options),n.__file="E:\\work\\code\\new_frame\\trunk\\src\\components\\search_block.vue",n.render=s.render,n.staticRenderFns=s.staticRenderFns,n._scopeId="data-v-1c4673b4",n.style=n.style||{},i.forEach(function(e){for(var t in e)n.style[t]=e[t]}),"function"==typeof __register_static_styles__&&__register_static_styles__(n._scopeId,i),e.exports=r},99:function(e,t){e.exports={yy_fs60:{fontSize:"60"},yy_fs34:{fontSize:"34"},yy_fs32:{fontSize:"32"},yy_fs30:{fontSize:"30"},yy_fs28:{fontSize:"28"},yy_fs26:{fontSize:"26"},yy_fs24:{fontSize:"24"},yy_c333:{color:"#333333"},yy_c666:{color:"#666666"},yy_c999:{color:"#999999"},yy_c000_04:{color:"rgba(0,0,0,0.4)"},yy_cccc:{color:"#CCCCCC"},yy_c3d80fa:{color:"#3D80FA"},yy_c576B96:{color:"#576B96"},yy_cE64340:{color:"#E64340"},yy_cfff:{color:"#ffffff"},yy_bg333:{backgroundColor:"#333333"},yy_bg666:{backgroundColor:"#666666"},yy_bg999:{backgroundColor:"#999999"},yy_bg_000_04:{backgroundColor:"rgba(0,0,0,0.4)"},yy_bgccc:{backgroundColor:"#CCCCCC"},yy_bg_3D80FA:{backgroundColor:"#3D80FA"},yy_bg_576B96:{backgroundColor:"#576B96"},yy_bg_E64340:{backgroundColor:"#E64340"},yy_bg_f9f9f9:{backgroundColor:"#F9F9F9"},yy_bgfff:{backgroundColor:"#ffffff"},yy_btn1:{backgroundColor:"#3D80FA",color:"#ffffff"},yy_btn2:{backgroundColor:"#0a6fd5",opacity:.2,color:"#ffffff"},yy_btn3:{backgroundColor:"rgba(61,128,250,0.2)",color:"#ffffff"},yy_btn4:{backgroundColor:"#FFFFFF",borderWidth:"1",borderColor:"#F2F2F2",color:"#333333"},yy_btn5:{backgroundColor:"#ebebeb",borderWidth:"1",borderColor:"#F2F2F2",color:"rgba(51,51,51,0.5)"},yy_btn6:{backgroundColor:"#ebebeb",borderWidth:"1",borderColor:"#F2F2F2",color:"rgba(51,51,51,0.5)"},yy_btn7:{backgroundColor:"#E64340",color:"#ffffff"},yy_btn8:{backgroundColor:"#c2403d",color:"rgba(255,255,255,0.5)"},yy_btn9:{backgroundColor:"rgba(230,67,64,0.7)",color:"rgba(255,255,255,0.5)"},yy_btn10:{backgroundColor:"#FFFFFF",borderWidth:"1",borderColor:"#F2F2F2",color:"#E64340"},yy_btn11:{backgroundColor:"#ebebeb",borderWidth:"1",borderColor:"#F2F2F2",color:"rgba(230,67,64,0.5)"},yy_btn12:{backgroundColor:"#ebebeb",borderWidth:"1",borderColor:"#F2F2F2",color:"rgba(230,67,64,0.5)"},yy_mt30:{marginTop:"30"},yy_mt40:{marginTop:"40"},yy_mt50:{marginTop:"50"},yy_mr10:{marginRight:"10"},yy_mb10:{marginBottom:"10"},yy_mb16:{marginBottom:"16"},yy_mb30:{marginBottom:"30"},yy_mb40:{marginBottom:"40"},yy_mb50:{marginBottom:"50"},yy_ml20:{marginLeft:"20"},yy_ml30:{marginLeft:"30"},yy_ml100:{marginLeft:"100"},yy_pt60:{marginTop:"60"},yy_pr100:{paddingRight:"100"},yy_pl30:{paddingLeft:"30"},yy_pl100:{paddingLeft:"100"},yy_plr30:{paddingLeft:"30",paddingRight:"30"},yy_ptb20:{paddingTop:"20",paddingBottom:"20"},yy_plr40:{paddingLeft:"40",paddingRight:"40"},yy_p30:{paddingLeft:"30",paddingRight:"30",paddingTop:"30",paddingBottom:"30"},yy_p20:{paddingLeft:"20",paddingRight:"20",paddingTop:"20",paddingBottom:"20"},yy_lh100:{lineHeight:"100"},yy_h20:{height:"20"},yy_h80:{height:"80"},yy_h90:{height:"90"},yy_h100:{height:"100"},yy_h140:{height:"140"},yy_h160:{height:"160"},yy_h260:{height:"260"},yy_h400:{height:"400"},yy_h1334:{height:"1334"},yy_w120:{width:"120"},yy_w160:{width:"160"},yy_w560:{width:"560"},yy_w590:{width:"590"},yy_w680:{width:"680"},yy_w750:{width:"750"},yy_wh40:{width:"40",height:"40"},yy_wh64:{width:"64",height:"64"},yy_wh80:{width:"80",height:"80"},yy_wh120:{width:"120",height:"120"},yy_wh750:{width:"750",height:"750"},yy_bt1:{borderBottomColor:"#f2f2f2",borderBottomWidth:"1"},yy_center_text:{textAlign:"center"},yy_fw_bold:{fontWeight:"bold"},yy_fw_500:{fontWeight:"500"},yy_center_row:{alignItems:"center"},yy_center_column:{justifyContent:"center"},yy_flex_row:{flexDirection:"row"},yy_column_between:{justifyContent:"space-between"},yy_flex_1:{flex:1},yy_center:{justifyContent:"center",alignItems:"center"},yy_abs:{position:"absolute"}}}});