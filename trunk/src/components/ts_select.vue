<!--
* 单选下拉框
* @author huangxueqian
* @version 1.0.0
* @param show{Boolean} 是否显示
* @param items{Array}  单选数据
* items = [{ name: '选项一', key: '1'}, {name: '选项二', key: '2'},{name: '选项三', key: '3'}];
* @param defaultItem{String/Number}  默认值
* defaultItem = '1';
* @param navStyle{Object} 头部样式
  * warning 目前只支持 backgroundColor属性
* @param cancelTextStyle{Object} 取消文字样式
* @param completeTextStyle{Object} 完成文字样式
* @return onCancel{function} 遮罩层取消时回调
* @return onChange{function} 切换回调
* @callback {Object} { name: '选项一', key: '1'}
* @return onComplete{function} 点击完成回调
* @callback {Object} { name: '选项一', key: '1'}
-->
<template>
  <ts-popup :show="show" @tsPopupCancel="_cancel" pos="bottom" height="500" ref="popup">
    <div class="ts-picker-header" :style="navStyle">
      <text class="ts-picker-title" :style="cancelTextStyle" @click="_cancel">取消</text>
      <text class="ts-picker-title" :style="completeTextStyle" @click="_complete">完成</text>
    </div>
    <ts-picker :items="items"
               :defaultItem="defaultItem"
               @onChange="_change">
    </ts-picker>
  </ts-popup>
</template>

<script>
  import TsPopup from './ts_popup';
  import TsPicker from './element/ts_picker';

  export default {
    components: { TsPopup, TsPicker },
    props: {
      show: {
        type: [Boolean, String],
        default: false
      },
      items: {
        type: Array,
        default: () => {return [];}
      },
      defaultItem: {
        type: [String, Number],
        default: ""
      },
      navStyle: {
        type: Object,
        default: () => {return {}}
      },
      cancelTextStyle: {
        type: Object,
        default: () => {return {}}
      },
      completeTextStyle: {
        type: Object,
        default: () => {return {}}
      },
    },
    data() {
      return {
        selectedItem: {},
      }
    },
    methods: {
      _cancel(callback) {
        let self = this;
        self.$nextTick(() => {
          self.$refs.popup.hide();
          setTimeout(() => {
            self.$emit('onCancel');
            typeof callback === 'function' && callback();
          }, 300);
        })
      },
      _complete() {
        const self = this;
        const { selectedItem } = this;
        self._cancel(function(){
          self.$emit('onComplete', selectedItem);
        });
      },
      _change(v) {
        this.selectedItem = v;
      }
    }
  }
</script>

<style scoped>
  .ts-picker-header {
    flex-direction: row;
    justify-content: space-between;
    height: 80px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color:  #E0E0E2;
    background-color: #ECEEF2;
  }
  .ts-picker-title {
    height: 80px;
    width: 100px;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    color: #007aff;
  }
</style>
