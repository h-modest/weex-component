<!--
* 切换栏组件
* @author huangxueqian
* @version 1.0.0
* @param index{Number} 设置唯一标志
* @param currentIndex{Number} 单签标志位置
-->
<template>
  <div class="ts-tabbar-item" :style="tabStyle()">
    <slot></slot>
  </div>
</template>

<script>
  const platform = weex.config.env.platform.toLowerCase();

  export default {
    props: {
      index: {
        type: Number,
        default: 0
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        appShow:'hidden',
        webShow: 'none'
      }
    },
    watch: {
      currentIndex() {
        this.appShow = this.index === this.currentIndex ? 'visible' : 'hidden';
        this.webShow = this.index === this.currentIndex ? 'flex' : 'none';
      }
    },
    created() {
      this.onInit();
    },
    methods: {
      onInit() {
        this.appShow = this.index === 0 ? 'visible' : 'hidden';
        this.webShow = this.index === 0 ? 'flex' : 'none';
      },
      tabStyle() {
        let style = {};
        if (platform === 'web') {
          style = { 'display': this.webShow }
        } else {
          style = { 'visibility': this.appShow }
        }
        return style;
      }
    }
  }
</script>

<style scoped>
  .ts-tabbar-item {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }
</style>
