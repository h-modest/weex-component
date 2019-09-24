import Vue from 'vue';
import weex from 'weex-vue-render';

weex.init(Vue);

const App = require('..\\..\\..\\src\\components\\element\\ts_loading_icon.vue');
new Vue(Vue.util.extend({el: '#root'}, App));
