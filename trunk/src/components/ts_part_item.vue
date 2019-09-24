<!--
  * 表单项组件
  * @author huangxueqian
  * @version 1.0.0
  * @param itemStyle{Object} 表单样式
  * @param leftItemStyle{Object} 左侧部分样式
  * @param rightItemStyle{Object} 右侧部分样式
  * @param leftTextStyle1{Object} 左侧文本1样式
  * @param leftTextStyle2{Object} 左侧文本2样式
  * @param rightTextStyle1{Object} 右侧文本1样式
  * @param rightTextStyle2{Object} 右侧文本2样式
  * @param leftText1{String} 左侧文本1标题
  * @param leftText2{String} 左侧文本2标题
  * @param rightText1{String} 右侧文本1标题
  * @param rightText2{String} 右侧文本2标题
  * @param isScalable{Boolean} 右侧文本是否可伸缩
  * @param leftIcon{Object/Array} 左侧图标
  * @param rightIcon{Object/Array} 右侧图标
  * @param isCellClick{Boolean} 是否全局点击
    * default: false
-->
<template>
  <div class="ts-part-item" :style="itemStyle" @click="onCellClick">
    <div :style="leftItemStyle" class="part-left">
      <image v-for="(v, i) in leftIconList" :key="i" v-if="v.path" :style="v.style" class="part-left-icon" :src="v.path" />
      <text class="part-left-text" :style="leftTextStyle1" v-if="leftText1">{{leftText1}}</text>
      <text class="part-left-text" :style="leftTextStyle2" v-if="leftText2">{{leftText2}}</text>
    </div>
    <div class="part-right" :style="rightItemStyle" @click="onRightClick">
      <div :class="['part-right-content', isScalable ? 'part-right-content-column' : 'part-right-content-row']" :style="rightStyle">
        <text class="part-right-text" :style="rightTextStyle1" v-if="rightText1">{{rightText1}}</text>
        <text class="part-right-text" :style="rightTextStyle2" v-if="rightText2">{{rightText2}}</text>
      </div>
      <div  v-for="(v, i) in rightIconList" :key="i">
        <div class="part-img-gap"></div>
        <image v-if="v.path" :style="v.style" class="part-right-icon" :src="v.path" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      itemStyle: {
        type: Object,
        default: () => {return {}}
      },
      leftItemStyle: {
        type: Object,
        default: () => {return {}}
      },
      rightItemStyle: {
        type: Object,
        default: () => {return {}}
      },
      leftTextStyle1: {
        type: Object,
        default: () => {return {}}
      },
      leftTextStyle2: {
        type: Object,
        default: () => {return {}}
      },
      rightTextStyle: {
        type: Object,
        default: () => {return {}}
      },
      rightTextStyle1: {
        type: Object,
        default: () => {return {}}
      },
      rightTextStyle2: {
        type: Object,
        default: () => {return {}}
      },
      leftText1: {
        type: String,
        default: ''
      },
      leftText2: {
        type: String,
        default: ''
      },
      rightText1: {
        type: String,
        default: ''
      },
      rightText2: {
        type: String,
        default: ''
      },
      isScalable: {
        type: Boolean,
        default: false
      },
      leftIcon: {
        type: [Array, Object],
        default: () => {return {
          path: '',
          style: {}
        }}
      },
      rightIcon: {
        type: [Array, Object],
        default: () => {return {
          path: '',
          style: {}
        }}
      },
      isCellClick: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        leftIconList: [],
        rightIconList: [],
        contentWidth: '290px'
      }
    },
    computed: {
      rightStyle() {
        const { rightTextStyle, contentWidth } = this;
        let style = { width: contentWidth, flex: 1 };
        return Object.assign(rightTextStyle, style);
      }
    },
    created() {
      this.onInit();
    },
    methods: {
      isObject(obj) {
        return typeof obj === 'object' &&  obj.length == undefined;
      },
      isEmptyIcon(obj) {
        return JSON.stringify(obj) == JSON.stringify({ path: '', style: {}});
      },
      onInit() {
        const self = this;
        let list = ['leftIcon', 'rightIcon'];
        list.map(v => {
          let iconNew = [];
          let obj = self[v];
          obj = JSON.parse(JSON.stringify(obj));
          let isObject = self.isObject(obj);
          if (!self.isEmptyIcon(obj)) {
            if (isObject) {
              iconNew.push(obj);
            } else {
              iconNew = obj;
            }
          }
          self[v + 'List'] = iconNew;
        });

        const len = self.rightIconList.length;
        self.contentWidth = (345 - 40*len) + 'px';
      },
      onCellClick(e) {
        this.$emit('onClick');
      },
      onRightClick() {
        const callback = this.isCellClick ? 'onClick' : 'onRightClick';
        this.$emit(callback)
      }
    }
  }
</script>

<style scoped>
  .ts-part-item {
    flex-direction: row;
    align-items: stretch;
    min-height: 100px;
    background-color: #ffffff;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom-width: 1px;
    border-bottom-color: #e2e2e2;
  }
  .part-left {
    flex: 1;
    flex-direction: row;
    align-items: center;
  }
  .part-left-text {
    flex: 1;
    font-size: 26px;
    color: #333;
    lines: 1;
    text-overflow: ellipsis;
  }
  .part-right-text {
    flex: 1;
    font-size: 26px;
    color: #333;
  }
  .part-right-content {
    width: 290px;
  }
  .part-right-content-row {
    height: 64px;
    flex-direction: row;
    align-items: center;
    lines: 2;
  }
  .part-right-content-column {
    flex-direction: column;
  }
  .part-right {
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .part-left-icon {
    width: 50px;
    height: 50px;
    margin-right: 16px;
  }
  .part-right-icon {
    width: 24px;
    height: 24px;
  }
  .part-img-gap {
    width: 16px;
  }
</style>
