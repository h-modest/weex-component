<!--
* 底部标签栏
* @author huangxueqian
* @version 1.0.0
* @param hasTopBorder{Boolean} 是否有头部线
* @param tabStyles{Object} 标签栏样式
* @param tabbarStyle{Object}  标签子栏样式
* @param items{Array} 标签数组
  * format:  [{ path: 'header', title: '头部栏' }]
* @param iconStyle{Object} 标签栏图标样式
* @param currentIndex{Number} 当前节点
* @param textStyle{Object} 文字样式
* @param newsStyle{Object} 右侧顶部数量样式
-->
<template>
  <div :class="['ts-tabbar', hasTopBorder && 'ts-tabbar-top']" :style="tabStyles">
    <div class="tabbar-item" v-for="(item, index) in items" @click="onclick(index)" :style="tabbarStyle">
      <image v-if="item.iconPath !== undefined" class="tabbar-item-icon" :src="_toggleIcon(index, item)" :style="iconStyle"></image>
      <text v-if="item.title !== undefined" :style="_toggleFont(index)">{{item.title}}</text>
      <div v-if="_isNews(item)" class="tabbar-num" :style="setNumStyle(item)">
        <text class="tabbar-num-text">{{item.newsNum > 99 ? '···' : item.newsNum}}</text>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      hasTopBorder: {
        type: Boolean,
        default: true
      },
      tabStyles: {
        type: Object,
        default: () => {return {}}
      },
      tabbarStyle: {
        type: Object,
        default: () => {return {}}
      },
      items: {
        type: Array,
        default: () => {return []}
      },
      iconStyle: {
        type: Object,
        default: () => {return {}}
      },
      currentIndex: {
        type: Number,
        default: 0,
      },
      textStyle: {
        type: Object,
        default: () => {
          return {
            color: '#999',
            selectedColor: '#4C84FF'
          }
        }
      },
      newsStyle: {
        type: Object,
        default: () => {return {}}
      }
    },
    data() {
      return {
        numStyle: {},
        width: 750
      }
    },
    methods: {
      layoutSubviews(v) {
        this.width = v.tsResult.width;
      },
      _toggleIcon(index, item) {
        return this.currentIndex == index ? item.selectedIconPath : item.iconPath;
      },
      _toggleFont(index) {
        const { textStyle: { color, selectedColor}} = this;
        const textColor = this.currentIndex == index ? selectedColor : color;
        return {
          'color': textColor,
          'font-size': '22px',
        }
      },
      setNumStyle(v) {
        let { items, newsStyle, width } = this;
        const isOne = v.iconPath || v.title;
        let partWidth = width/items.length;
        let left =((partWidth - 50)/2 + 30) + 'px';
        let top = { top: '5px', left };
        if (isOne) {
          top = { top: '14px', left }
        }
        return Object.assign(newsStyle, top);
      },
      _isNews(item) {
        return item.newsNum && item.newsNum !== 0;
      },
      onclick(index) {
        this.$emit('onClick', index);
      }
    }
  }
</script>

<style scoped>
  .ts-tabbar {
    flex-direction: row;
    left: 0px;
    right: 0px;
    height: 120px;
  }
  .ts-tabbar-top {
    border-top-color: #bbbbbb;
    border-top-width: 1px;
    background-color: #ffffff;
  }
  .tabbar-item {
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .tabbar-item-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  .tabbar-num {
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 5px;
    width: 40px;
    height: 40px;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
    background-color: #ff0000;
  }
  .tabbar-num-text {
    font-size: 18px;
    color: #ffffff;
  }
</style>
