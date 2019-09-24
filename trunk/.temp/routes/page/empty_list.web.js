import Vue from 'vue';
import weex from 'weex-vue-render';

weex.init(Vue);

const App = require('..\\..\\..\\src\\routes\\page\\empty_list.vue');
new Vue(Vue.util.extend({el: '#root'}, App));
