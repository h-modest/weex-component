// { "framework": "Vue"} 

!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=232)}({232:function(t,e,n){"use strict";var i=n(233),r=function(t){return t&&t.__esModule?t:{default:t}}(i);r.default.el="#root",new Vue(r.default)},233:function(t,e,n){var i,r,s=[];s.push(n(234)),i=n(235);var o=n(237);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(Object.keys(i).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),r=i=i.default),"function"==typeof r&&(r=r.options),r.__file="E:\\work\\code\\new_frame\\trunk\\src\\components\\ts_picker01.vue",r.render=o.render,r.staticRenderFns=o.staticRenderFns,r._scopeId="data-v-57e49d8f",r.style=r.style||{},s.forEach(function(t){for(var e in t)r.style[e]=t[e]}),"function"==typeof __register_static_styles__&&__register_static_styles__(r._scopeId,s),t.exports=i},234:function(t,e){t.exports={"wx-picker-wrapper":{overflow:"hidden",backgroundColor:"#ffffff"},"wx-picker":{overflow:"hidden",backgroundColor:"#ffffff",height:"432"},wrapper:{overflow:"hidden",flexDirection:"column",backgroundColor:"#ffffff",marginTop:"32"},"picker-item":{flex:1,textAlign:"center",lineHeight:"72",backgroundColor:"#ffffff",height:"72",color:"#999999",fontSize:"32"},"picker-item-selected":{color:"#000000"},"picker-center":{width:"750",height:"72",borderTopWidth:"1",borderTopStyle:"solid",borderTopColor:"#DCDCDC",borderBottomWidth:"1",borderBottomStyle:"solid",borderBottomColor:"#DCDCDC",position:"absolute",top:"176",left:0,zIndex:100,justifyContent:"center",alignItems:"center"}}},235:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(236),r=function(t){return t&&t.__esModule?t:{default:t}}(i),s=weex.requireModule("animation"),o=function(t,e){if(t&&t.length<1)return 0;var n=t.findIndex(function(t){return t===e||t.name&&t.name===e.name}),i=t.indexOf(e),r=Math.max(n,i);return r<0?0:r};e.default={mixins:[r.default],props:{visible:{type:Boolean,default:!1},data:{type:Object,default:function(){return{}},required:!0}},data:function(){return{startY:0,endY:0,currentY:0,itemHeight:72,selectedIndex:0,_defaultValue:null,_startTime:0}},created:function(){this.selectedIndex=this.getInitialIndex()},mounted:function(){this.initMove()},methods:{getInitialIndex:function(){var t=o(this.data.list,this.data.defaultValue);return!this.data.defaultValue&&this.data.list.length>3&&(t=Math.floor(this.data.list.length/2)),t},initMove:function(){this.currentY=0,this.selectedIndex>2?this.currentY=-(this.selectedIndex-2)*this.itemHeight:this.currentY=(2-this.selectedIndex)*this.itemHeight,this.move(this.currentY)},getSelectedClass:function(t){return this.selectedIndex===t?"picker-item-selected":""},ontouchstart:function(t){this.preventDefault(t),console.log(1111),this.data.list.length<=1||(this.startY=t.changedTouches[0].screenY,this._startTime=(new Date).getTime())},ontouchmove:function(t){if(console.log(2222),this.preventDefault(t),!(this.data.list.length<=1)){var e=t.changedTouches[0].screenY,n=parseInt(e-this.startY),i=this.currentY+n;this.move(i)}},ontouchend:function(t){if(console.log(3333),this.preventDefault(t),!(this.data.list.length<=1)){this.endY=t.changedTouches[0].screenY;var e=parseInt(this.endY-this.startY);(new Date).getTime()-this._startTime<200&&(e*=5);var n=e%this.itemHeight;this.currentY+=e-n;var i=2*this.itemHeight,r=(this.data.list.length-3)*this.itemHeight;this.currentY>i?this.currentY=i:this.currentY>0&&this.currentY<i?this.currentY=this.currentY:this.currentY===i?this.currentY=this.currentY:Math.abs(this.currentY)>r&&(this.currentY=-r),this.countListIndex(this.currentY),this.move(this.currentY,!0)}},countListIndex:function(t){var e=t/this.itemHeight;e=e>0?2-e:Math.abs(e)+2,this.setSelectedValue(e)},setSelectedValue:function(t){var e=this.data.list.length;if(0===e)return void this.callback(null);if(t<0||t>e-1)throw new Error("滑动取值索引数值出现错误"+t);var n=this.data.list[t];this.selectedIndex=t,this.callback(n)},callback:function(t){this.data.defaultValue=t,this.$emit("wxChange",t)},move:function(t,e){var n=this.$refs.wrapper,i={styles:{transform:"translateY("+t+"px)",transformOrigin:"center center"},needLayout:!1,delay:0};e&&(i.duration=300,i.timingFunction="ease-out"),s.transition(n,i)}},watch:{"data.list":function(){this.selectedIndex=this.getInitialIndex(),this.initMove()}}}},236:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=weex.config.env.deviceWidth,r=weex.config.env.deviceHeight,s=weex.config.env.platform.toLowerCase(),o=(weex.config.env.appName,{data:function(){return{$env:{isWeb:"web"===s,isAndroid:"android"===s,isIos:"ios"===s}}},methods:{getPageHeight:function(){return"android"===s?750/i*r:r},preventDefault:function(t){t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation()}}});e.default=o},237:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.visible?n("div",{staticClass:["wx-picker-wrapper"],on:{touchstart:t.preventDefault}},[n("div",{staticClass:["wx-picker"],on:{panstart:t.ontouchstart,panend:t.ontouchend,panmove:t.ontouchmove}},[n("div",{ref:"wrapper",staticClass:["wrapper"]},t._l(t.data.list,function(e,i){return n("text",{staticClass:["picker-item"],class:[t.getSelectedClass(i)]},[t._v(t._s(e.name||e))])})),n("text",{staticClass:["picker-center"]})])]):t._e()},staticRenderFns:[]},t.exports.render._withStripped=!0}});