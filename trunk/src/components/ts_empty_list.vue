<!--
  * 空页面组件
  * @author huangxueqian
  * @version 1.0.0
  * @param type{Number} 空列表类型
    * format 0: 空列表
             1: 网络未连接
             2: 网络异常
             3: 其他
  * @param title{String} 标题
  * @param text{String} 副标题
  * @param iconUrl{String} 图标链接
  * @param navStyle{Object} 空列表样式
  * @param titleStyle{Object} 标题样式
  * @param textStyle{Object} 副标题样式
  * @param iconStyle{Object} 图标样式
  * @param isRefresh{Boolean} 是否开启刷新按钮
    * default: false
  * @param refreshStyle{Object} 刷新按钮样式
  * @param refreshText{String} 刷新文字
  * @return onRefresh{Function} 点击刷新回调方法
-->
<template>
  <div class="ts-empty-list" :style="navStyle">
      <image class="empty-icon" :src="iconPath" :style="iconStyle"/>
      <text v-if="setTitle" class="empty-title" :style="titleStyle">{{ setTitle }}</text>
      <text v-if="text" class="empty-text" :style="textStyle">{{ text }}</text>
      <text v-if="isRefresh" class="empty-refresh" :style="refreshStyle" @click="onRefresh">{{ refreshText }}</text>
  </div>
</template>

<script>
  const platform = weex.config.env.platform.toLowerCase();
  const IMAGE_PATH = "/web";
  let bundleBaseUrl = weex.config.bundleUrl;

  export default {
    props: {
      type: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      iconUrl: {
        type: String,
        default: ''
      },
      navStyle: {
        type: Object,
        default: () => { return {}}
      },
      titleStyle: {
        type: Object,
        default: () => { return {}}
      },
      textStyle: {
        type: Object,
        default: () => { return {}}
      },
      iconStyle: {
        type: Object,
        default: () => { return {}}
      },
      isRefresh: {
        type: Boolean,
        default: false
      },
      refreshStyle: {
        type: Object,
        default: () => { return {}}
      },
      refreshText: {
        type: String,
        default: '刷新'
      }
    },
    computed: {
      setTitle() {
        const { type, title } = this;
        let tit = title;
        if (type === 1 && tit === '') {
          tit = '网络未连接';
        }
        if (type === 2 && tit === '') {
          tit = '网络异常'
        }
        return tit;
      },
      iconPath() {
        const { type, iconUrl } = this;
        const imageBaseUrl = this.getImageUrl();
        let path = iconUrl;
        switch (type) {
          case 0:
            path = imageBaseUrl + 'common/empty_list.png';
            break;
          case 1:
            path = imageBaseUrl + 'common/empty_network.png';
            break;
          case 2:
            path = imageBaseUrl + 'common/request_fail.png';
            break;
          default:
        }
        return path;
      }
    },
    methods: {
      getImageUrl() {
        let bundleUrl = bundleBaseUrl,
            isHttp = bundleUrl.indexOf('http') >= 0,
            i = bundleUrl.indexOf('dist'),
            imageUrl;
        const isAndroid = platform === 'android';
            if(isHttp) {
                if(platform === "web") {
                    let urlArr = bundleUrl.split("://");
                    let startIndex = urlArr[1].indexOf("/");
                    imageUrl = urlArr[0] + "://" + urlArr[1].slice(0, startIndex) + IMAGE_PATH + "/static/images/";
                } else {
                    imageUrl = bundleUrl.slice(0, i) + (isAndroid ? 'images/': 'images.bundle/')
                }
            } else {
                if(platform === "web") {
                    let startIndex = bundleUrl.indexOf("/web/");
                    imageUrl = bundleUrl.slice(0, startIndex) + IMAGE_PATH + "/static/images/";
                } else {
                    imageUrl = isAndroid ? 'assets:': bundleUrl.slice(0, i ) + 'images.bundle/';
                }
            }
            return imageUrl;
      },
      onRefresh() {
        this.$emit('onRefresh');
      }
    }
  }
</script>

<style scoped>
  .ts-empty-list {
      flex: 1;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
  }
  .empty-icon {
    width: 256px;
    height: 256px;
  }
  .empty-title {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-top: 32px;
    margin-bottom: 24px;
  }
  .empty-text {
    font-size:26px;
    font-weight: 500;
    color: #666;
  }
  .empty-refresh {
    margin-top: 60px;
    width: 240px;
    height: 64px;
    background-color: #4C84FF;
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 64px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

</style>
