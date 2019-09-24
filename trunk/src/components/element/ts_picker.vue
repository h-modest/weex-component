<!--
  * 筛选组件
  * @author huangxueqian
  * @version 1.0.0
  * @param items{Array} 筛选数据
    * format  [{ name: '选项一', key: '1'}]
  * @param defaultItem{Object} 初始数据
  * @param itemKey{String} 选中的key值
  * @param navStyle{object} 筛选组件样式
  * @param itemRef{String} dom区别位标志
-->
<template>
  <div class="ts-picker" :style="navStyle" @touchstart="preventDefault">
    <div class="ts-picker-content" :style="navStyle" @panstart="ontouchstart" @panend="ontouchend" @panmove="ontouchmove">
      <div class="ts-wrapper" :ref="'ts-' + itemRef">
          <text
              class="ts-picker-item"
              :class="[getSelectedClass(index)]"
              v-if="item.name !== ''"
              v-for="(item, index) in items">{{item.name}}</text>
      </div>
      <text class="ts-picker-center"></text>
    </div>
  </div>
</template>

<script>

  const animation = weex.requireModule('animation');
  export default {
    props: {
      items: {
        type: Array,
        default: () => {return [];}
      },
      defaultItem: {
        type: [String, Number],
        default: ""
      },
      itemKey: {
        type: String,
        default: 'key'
      },
      navStyle: {
        type: Object,
        default: () => {
          return {
            'height': '420px'
          }
        }
      },
      itemRef: {
        type: String,
        default: 'wrapper'
      }
    },
    data() {
      return {
        startY: 0,
        endY: 0,
        currentY: 0,
        itemHeight: 80,
        selectedIndex: 0,
        _startTime: 0,
        isInit: false
      }
    },
    mounted() {
      let self = this;
      self.selectedIndex = self.getInitIndex();
      if (self.items.length === 0) {
        self.items = [{name: '请选择', key: -1}];
      }
      self.$nextTick(() => {
        self.initMove();
        self.isInit = true;
      });
    },
    methods: {
      preventDefault(e) {
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
      },
      initMove() {
          this.currentY = 0;
          if (this.selectedIndex > 2) {
            this.currentY = - (this.selectedIndex - 2) * this.itemHeight;
          } else {
            this.currentY = (2 - this.selectedIndex) * this.itemHeight;
          }
          this._move(this.currentY);
      },
      getInitIndex() {
        let self = this, index = 0, { items, defaultItem, itemKey } = self;
        if (items && items.length === 0) {
            index = 0;
        } else {
          index = items.findIndex(v => {
            return v[itemKey] && v[itemKey] === defaultItem;
          });
        }
        index = index === -1 ? 0 : index;
        return index;
      },
      getSelectedClass(i) {
        let cls = '';
        if (i === this.selectedIndex) {
          cls = 'ts-picker-item-active';
        }
        return cls;
      },
      ontouchstart(e) {
        this.preventDefault(e);
        if (this.items.length <= 1) {
            return;
        }
        this.startY = e.changedTouches[0].screenY;
        this._startTime = new Date().getTime();
      },
      ontouchmove(e) {
        this.preventDefault(e);
        if (this.items.length < 2) {
          return;
        }
        const pageY = e.changedTouches[0].screenY;
        let value = parseInt(pageY - this.startY);
        const y = this.currentY + value;
        this._move(y);
      },
      ontouchend(e) {
        this.preventDefault(e);
        const { items, itemHeight } = this;
        if (items.length <= 1) {
          return;
        }
        this.endY = e.changedTouches[0].screenY;
        // 实际滚动距离
        let v = parseInt(this.endY - this.startY);
        // 如果快速滑动，实际滑动距离放大5倍
        const endTime = new Date().getTime();
        if (endTime - this._startTime < 200) {
            v = v * 5;
        }
        let value = v % itemHeight;
        // 计算出每次拖动的36px整倍数
        this.currentY += (v - value);
        // 正数y最大值
        const max1 = 2 * itemHeight;
        // 负数y最小值
        const max2 = (items.length - 3) * itemHeight;
        if (this.currentY > max1) {
          this.currentY = max1;
        }
        else if (this.currentY > 0 && this.currentY < max1) {
          this.currentY = this.currentY;
        }
        else if (this.currentY === max1) {
          this.currentY = this.currentY;
        }
        else if (Math.abs(this.currentY) > max2) {
          this.currentY = - max2;
        }
        this._countListIndex(this.currentY);
        this._move(this.currentY, true);
      },
      // 计算list数组索引
      _countListIndex (pageY) {
          let n = pageY / this.itemHeight;
          n = n > 0 ? 2 - n : Math.abs(n) + 2;
          this._setSelectedValue(n);
      },
      // set选中值
      _setSelectedValue (index) {
          const length = this.items.length;
          if (length === 0) {
            this.callback(null);
            return;
          }
          if (index < 0 || index > length -1) {
            throw new Error('滑动取值索引数值出现错误'+ index);
          }
          const value = this.items[index];
          this.selectedIndex = index;
          this.callback(value)
      },
      // 回调wxChange
      callback (value) {
        this.defaultValue = value;
        this.$emit('onChange', value);
      },
      _move(y, bool) {
        const { itemRef } = this;
        const el = this.$refs['ts-' + itemRef];
        let obj = {
            styles: {
                transform: `translateY(${y}px)`,
                transformOrigin: 'center center'
            },
            needLayout: false,
            delay: 0 //ms
        };
        if (bool) {
            obj.duration = 300;
            obj.timingFunction = 'ease-out';
        }
        animation.transition(el, obj);
      }
    }
  }
</script>

<style scoped>
  .ts-picker {
    background-color: #fff;
    justify-content: center;
    overflow: hidden;
  }
  .ts-picker-content {
    overflow: hidden;
    background-color: #fff;
  }
  .ts-picker-item {
    text-align: center;
    line-height: 80px;
    background-color: #fff;
    height: 80px;
    color: #999;
    font-size: 28px;
  }
  .ts-picker-item-active {
    font-size: 34px;
    color: #000;
  }
  .ts-picker-center {
    height: 80px;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #DCDCDC;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #DCDCDC;
    position: absolute;
    top: 160px;
    left: 0;
    right: 0;
  }
</style>
