<!--
  * 列表组件
  * @author huangxueqian
  * @version 1.0.0
  * @param showRefresh{Boolean} 是否开启刷新
  * @param showLoading{Boolean} 是否开启加载
  * @param noMore{Boolean} 加载是否加速
  * @param showLoadingText{Boolean} 是否显示加载文字
  * @param tipText{Object} 提示文字
    *  refresh:'刷新中...',
    *  loadmore:'加载中...',
    *  nomore: '没有更多啦~'
  * @param styleNew{Object} 列表样式
-->
<template>
  <list :style="styleNew">
    <refresh class="ts-refresh" v-if="Boolean(showRefresh)" :display="refreshDisplayState" @refresh="onrefresh">
      <text class="refresh-text">{{tipText.refresh}}</text>
      <loading-indicator v-if="isAndroid" class="indicator"></loading-indicator>
      <ts-loading-icon v-else ></ts-loading-icon>
    </refresh>
    <cell>
      <slot></slot>
      <text v-if="Boolean(noMore)" class="more-text">{{tipText.nomore}}</text>
    </cell>
    <loading class="ts-loading" v-if="Boolean(showLoading)" :display="loadmoreDisplayState" @loading="onloadmore">
      <text class="loading-text" v-if="Boolean(showLoadingText)">{{tipText.loadmore}}</text>
      <loading-indicator v-if="isAndroid" class="indicator"></loading-indicator>
      <ts-loading-icon v-else></ts-loading-icon>
    </loading>
  </list>
</template>

<script>
  const platform = weex.config.env.platform.toLowerCase();
  import TsLoadingIcon from './element/ts_loading_icon';

  export default {
    components: { TsLoadingIcon },
    props: {
      showRefresh: {
        type: [Boolean, String],
        default: true
      },
      showLoading: {
        type: [Boolean, String],
        default: true
      },
      noMore: {
        type: [Boolean, String],
        default: false
      },
      showLoadingText: {
        type: [Boolean, String],
        default: true
      },
      noMore: {
        type: [Boolean, String],
        default: false
      },
      tipText:{
        type: Object,
        default: () => {
          return {
            refresh:'刷新中...',
            loadmore:'加载中...',
            nomore: '没有更多啦~'
          }
        }
      },
      styleNew:{
        type:Object,
        default:() => {
          return {}
        }
      },
    },
    data() {
      return {
        refreshDisplayState: 'hide',
        loadmoreDisplayState: 'hide',
        deviceHeight: '',
        isAndroid: false
      }
    },
    created() {
      this.isAndroid = platform === 'android';
    },
    methods: {
      onrefresh() {
        this.refreshDisplayState = 'show';
        this.$emit('onRefresh'); //传递给父组件刷新方法
      },
      onloadmore() {
        this.loadmoreDisplayState = 'show';
        this.$emit('onLoadmore'); //传递给父组件加载方法
      },
      onRefreshComplete() {//完成刷新
        this.refreshDisplayState = 'hide';
      },
      onLoadmoreComplete() {//完成上拉加载更多
        this.loadmoreDisplayState = 'hide';
      }
    }
  }
</script>

<style scoped>
  .ts-refresh {
    left: 0px;
    right: 0px;
    height: 120px;
    align-items: center;
    justify-content: center;
  }
  .indicator {
    height: 60px;
    width: 60px;
    color: #45b5f0;
  }
  .refresh-text {
    color: #999999;
    font-size: 28px;
    text-align: center;
  }
  .more-text {
    height: 50px;
    line-height: 50px;
    font-size: 26px;
    color: #8A8C98;
    text-align: center;
  }
  .ts-loading {
    left: 0px;
    right: 0px;
    height: 120px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  }
  .loading-text {
    left: 0px;
    right: 0px;
    text-align: center;
    font-size: 28px;
    color: #BBBBBB;
  }
</style>
