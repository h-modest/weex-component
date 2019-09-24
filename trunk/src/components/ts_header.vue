<!--
  * 头部组件
  * @author huangxueqian
  * @version 1.0.0
  * @param hasBottomBorder{Boolean} 是否有底线
  * @param styleEx{Object} 头部样式
  * @param title{String} 标题
  * @param leftItem{Object} 左部图标/标题
    * default: { image: '', text: '' }
  * @param rightItem{Object} 右部图标/标题
    *  default: { image: '', text: '' }
  * @slot [name=left] 左侧slot部分
  * @slot [name=right] 右侧slot部分
-->
<template>
  <div :class="['ts-header', hasBottomBorder && 'ts-header-bottom']" :style="styleNew">
    <div :style="styleStatus"></div>
    <div class="header-box">
      <div class="header-main" :style="mainStyle">
        <text class="header-title" :lines="1" @click="onCenterClick">{{title}}</text>
      </div>
      <div class="header-left">
          <div class="header-left-icon" @click="onLeftClick">
              <image v-if="leftItem.image" class="header-icon" :src="leftItem.image"></image>
          </div>
          <text v-if="leftItem.text" @click="onLeftClick" class="header-text">{{leftItem.text}}</text>
          <slot name="left"></slot>
      </div>
      <div class="header-right">
          <div v-for="(v, i) in rightItemNew" :key="i" @click="onRightClick(i)">
            <image :class="['header-right-icon', i === 1 && 'marginL20']" v-if="v.image" :src="v.image"></image>
            <text @click="onRightClick(i)" v-if="v.text" class="header-text">{{v.text}}</text>
          </div>
          <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  const platform = weex.config.env.platform.toLowerCase();
  const { deviceHeight, statusBarHeight, deviceWidth } = weex.config.env;

  export default {
    props: {
      hasBottomBorder: {
        type: Boolean,
        default: false
      },
      styleEx: {
        type: Object,
        default: () => {return {}}
      },
      title: {
        type: [Number, String],
        default: '标题'
      },
      leftItem: {
        type: Object,
        default: () => {
          return {
            image: '',
            text: ''
          }
        }
      },
      rightItem: {
        type: [Object, Array],
        default: () => {
          return {
            image: '',
            text: ''
          }
        }
      }
    },
    data() {
      return {
        styleNew: {},
        styleStatus: {},
        rightItemNew: [],
        width: 750
      }
    },
    created() {
      this._initBar();
      this._initRightItem();
    },
    computed: {
      mainStyle() {
        let { width } = this;
        return {
          width: (width - 300) + 'px'
        }
      }
    },
    methods: {
      layoutSubviews(v) {
        this.width = v.tsResult.width;
      },
      _initBar() {
        let statusHeight = this._getBarHeight();
        this.styleStatus = Object.assign({
            height: statusHeight + 'px',
            backgroundColor: '#3D80FA'
        }, this.styleEx);
        const height = statusHeight + 88 + 'px' || '120px';
        this.styleNew = Object.assign({height}, this.styleEx);
      },
      _getBarHeight() {
        if(platform === 'ios') {
            const isIphoneX = deviceHeight === 2436;
            const isIphoneXr = deviceHeight === 1792;
            const isIphoneXsMax = deviceHeight === 2688;
            if (isIphoneX || isIphoneXr || isIphoneXsMax) {
                return 60;
            }
            return 40;
        } else if(platform === 'android') {
            let barHeight = parseInt(statusBarHeight);
            return barHeight * (750 / deviceWidth);
        }
        return 0;
      },
      _initRightItem() {
        let { rightItem } = this;
        let rightItemNew = new Array();
        const isObject = typeof rightItem === 'Object' &&  rightItem.length === undefined;
        if (isObject) {
          rightItemNew.push(rightItem);
        } else {
          rightItemNew = rightItem;
        }
        this.rightItemNew = rightItemNew;
      },
      onCenterClick() {
        this.$emit('onCenterClick');
      },
      onLeftClick() {
        this.$emit('onLeftClick');
      },
      onRightClick(i) {
        this.$emit('onRightClick', i);
      }
    }
  }
</script>

<style scoped>
  .ts-header {
    background-color: #fff;
  }
  .ts-header-bottom {
    border-bottom-width: 1px;
    border-bottom-color: #d9d9d9;
    border-bottom-style: solid;
  }
  .header-box {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 90px;
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #3D80FA;
  }
  .header-left {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    left: 0px;
    top: 0px;
  }
  .header-left-icon {
    width:90px;
    height:90px;
    justify-content: center;
    align-items: center;
  }
  .header-icon {
    height: 40px;
    width: 40px;
  }
  .header-text {
    font-size: 26px;
    color: #fff;
    text-align: center;
  }
  .header-main {
    background-color: #3D80FA;
    margin-left: 150px;
    margin-right: 150px;
  }
  .header-title {
    font-size: 34px;
    color: #ffffff;
    text-align: center;
    text-overflow: ellipsis;
    lines: 1;
  }
  .header-right {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 30px;
    top: 0px;
    bottom: 0px;
  }
  .header-right-icon {
    width: 45px;
    height: 45px;
  }
  .marginL20 {
    margin-left: 20px;
  }
</style>
