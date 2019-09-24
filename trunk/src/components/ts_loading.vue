<!--
  * 加载组件
  * @author huangxueqian
  * @version 1.0.0
  * @param loadUrl{String} 加载图标图片
  * @param loadingText{String}  加载文字
  * @param show{Boolean}  是否显示
  * @param navStyle{Object}  加载样式
-->
<template>
    <ts-overlay :show="show" :canAutoClose="false" :navStyle="loadingStyle">
      <div class="ts-loading">
        <ts-loading-icon :loadStyle="loadStyle"></ts-loading-icon>
        <text v-if="loadingText" class="ts-loading-text">{{loadingText}}</text>
      </div>
    </ts-overlay>
</template>
<script>
  import TsOverlay from './ts_overlay';
  import TsLoadingIcon from './element/ts_loading_icon';
  const animation = weex.requireModule('animation')
  const modal = weex.requireModule('modal')
  export default {
    components: { TsOverlay, TsLoadingIcon },
    props: {
      loadUrl: {
        type: String,
        default: ''
      },
      loadingText: {
        type: String,
        default: ''
      },
      show:{
        type: Boolean,
        default: false
      },
      navStyle: {
        type: Object,
        default: () => { return {}}
      }
    },
    data() {
      return {
        loadStyle: {
          width: '64px',
          height: '64px',
        }
      }
    },
    computed: {
      loadingStyle() {
        const { navStyle } = this;
        let style = {
          top: '0px',
          backgroundColor: 'rgba(255,255,255, .5)'
        }
        return Object.assign(style, navStyle);
      }
    }
  };
</script>
<style scoped>
.ts-loading {
  align-items: center;
  justify-content: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
  width: 128px;
  height: 128px;
  background-color: #2D2E32;
}
.ts-loading-img {
  height: 68px;
  width: 68px;
}
.ts-loading-text {
  color: #666666;
  font-size: 26px;
  line-height:40px;
  height: 40px;
  margin-top: 12px;
  text-overflow: ellipsis;
  width: 150px;
  text-align: center;
}
</style>
