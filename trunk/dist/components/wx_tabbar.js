// { "framework": "Vue"} 

!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=178)}({178:function(t,e,r){"use strict";var n=r(179),o=function(t){return t&&t.__esModule?t:{default:t}}(n);o.default.el="#root",new Vue(o.default)},179:function(t,e,r){var n,o,i=[];i.push(r(180)),n=r(181);var a=r(182);o=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(Object.keys(n).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),o=n=n.default),"function"==typeof o&&(o=o.options),o.__file="E:\\work\\code\\new_frame\\trunk\\src\\components\\wx_tabbar.vue",o.render=a.render,o.staticRenderFns=a.staticRenderFns,o._scopeId="data-v-40bd4888",o.style=o.style||{},i.forEach(function(t){for(var e in t)o.style[e]=t[e]}),"function"==typeof __register_static_styles__&&__register_static_styles__(o._scopeId,i),t.exports=n},180:function(t,e){t.exports={wx_tabbar:{flexDirection:"row",width:"750",borderTopColor:"#bbbbbb",borderTopWidth:"1",backgroundColor:"#ffffff"},tr_item:{alignItems:"center",justifyContent:"center"},tr_icon:{marginBottom:"10"},tr_remark:{position:"absolute",alignItems:"center",justifyContent:"center"},tr_min_cir:{top:"20",height:"16",width:"16",borderTopLeftRadius:"8",borderTopRightRadius:"8",borderBottomLeftRadius:"8",borderBottomRightRadius:"8"},tr_cir:{top:"14",width:"30",height:"30",borderTopLeftRadius:"15",borderTopRightRadius:"15",borderBottomLeftRadius:"15",borderBottomRightRadius:"15"},tr_remark_tit:{fontSize:"18",color:"#ffffff"}}},181:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{data:{type:Array,default:function(){return[]}},tabStyles:{type:Object,default:function(){return{height:"120px"}}},tabbarStyle:{type:Object,default:function(){return{"padding-top":"10px","padding-bottom":"10px"}}},iconStyle:{type:Object,default:function(){return{width:"50px",height:"50px"}}},currentIndex:{type:Number,default:0},remarkStyle:{type:Object,default:function(){return{"background-color":"#ff0000"}}}},created:function(){this.init()},methods:{init:function(){var t=this,e=750/t.data.length;t.tabbarStyle=Object.assign(t.tabbarStyle,{width:e+"px"});var r=parseInt(t.iconStyle.width),n=(e-r)/2;t.remarkStyle=Object.assign(t.remarkStyle,{right:n+"px"})},_toggleIcon:function(t,e){return this.currentIndex==t?e.imgUrlSelected:e.imgUrl},_toggleFont:function(t){return{color:this.currentIndex==t?"#4C84FF":"#999999","font-size":"22px"}},_click:function(t){this.$emit("onClick",t)}}}},182:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:["wx_tabbar"],style:t.tabStyles},t._l(t.data,function(e,n){return r("div",{staticClass:["tr_item"],style:t.tabbarStyle,on:{click:function(e){t._click(n)}}},[r("div",{staticClass:["tr_icon"],style:t.iconStyle},[r("image",{style:t.iconStyle,attrs:{src:t._toggleIcon(n,e)}})]),r("div",[r("text",{style:t._toggleFont(n)},[t._v(t._s(e.title))])]),e.isNew?r("div",{class:["tr_remark",e.newNum?"tr_cir":"tr_min_cir"],style:t.remarkStyle},[void 0!=e.newNum?r("text",{staticClass:["tr_remark_tit"]},[t._v(t._s(e.newNum>99?"···":e.newNum))]):t._e()]):t._e()])}))},staticRenderFns:[]},t.exports.render._withStripped=!0}});