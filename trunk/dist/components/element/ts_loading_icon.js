// { "framework": "Vue"} 

!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=320)}({109:function(e,t,n){var r,o,i=[];i.push(n(196)),r=n(197);var s=n(198);o=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(Object.keys(r).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o=r=r.default),"function"==typeof o&&(o=o.options),o.__file="E:\\work\\code\\new_frame\\trunk\\src\\components\\element\\ts_loading_icon.vue",o.render=s.render,o.staticRenderFns=s.staticRenderFns,o._scopeId="data-v-49b29cbc",o.style=o.style||{},i.forEach(function(e){for(var t in e)o.style[t]=e[t]}),"function"==typeof __register_static_styles__&&__register_static_styles__(o._scopeId,i),e.exports=r},196:function(e,t){e.exports={"ts-loading":{marginTop:"10",height:"48",width:"48"}}},197:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=weex.requireModule("animation"),o=weex.config.env.platform.toLowerCase(),i=weex.config.bundleUrl;t.default={props:{loadImg:{type:String,default:""},loadStyle:{type:Object,default:function(){return{}}}},data:function(){return{imageBaseUrl:""}},created:function(){this.imageBaseUrl=this.getImageUrl()},mounted:function(){var e=this,t=e.$refs.load;this.$nextTick(function(){e.move(t)})},computed:{loadingImage:function(){var e=this.loadImg,t=this.imageBaseUrl,n=t+"common/loading.png";return""!==e&&(n=e),n}},methods:{getImageUrl:function(){var e=i,t=e.indexOf("http")>=0,n=e.indexOf("dist"),r=void 0,s="android"===o;if(t)if("web"===o){var a=e.split("://"),u=a[1].indexOf("/");r=a[0]+"://"+a[1].slice(0,u)+"/web/static/images/"}else r=e.slice(0,n)+(s?"images/":"images.bundle/");else if("web"===o){var l=e.indexOf("/web/");r=e.slice(0,l)+"/web/static/images/"}else r=s?"assets:":e.slice(0,n)+"images.bundle/";return r},move:function(e){r.transition(e,{styles:{transform:"rotate(360000deg)"},duration:136e4,timingFunction:"linear",delay:0})}}}},198:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("image",{ref:"load",staticClass:["ts-loading"],style:e.loadStyle,attrs:{src:e.loadingImage}})},staticRenderFns:[]},e.exports.render._withStripped=!0},320:function(e,t,n){"use strict";var r=n(109),o=function(e){return e&&e.__esModule?e:{default:e}}(r);o.default.el="#root",new Vue(o.default)}});