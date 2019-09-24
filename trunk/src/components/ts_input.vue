<!--
  * 输入框组件
  * @author huangxueqian
  * @version 1.0.0
  * @param label{String} 左侧标签
  * @param labelWidth{Number} 左侧标签长度 默认280
  * @param title{String} 默认值
  * @param desc{String} 右侧说明文字
  * @param hasTopBorder{Boolean} 是否开启头部边框
  * @param hasBottomBorder{Boolean} 是否开启底部边框
  * @param hasVerticalIndent{Boolean} 是否有上下间隔
  * @param cellStyle{Object} 输入框样式
  * @param cellTitleStyle{Object} 输入栏样式
  * @param labelTextStyle{Object} 标签栏样式
  * @param descTextStyle{Object} 详情栏样式
  * @param disabled{Boolean} 是否禁用
  * @param disabled{Boolean} 是否支持输入
  * @param required{Boolean} 是否必填
  * @param inputStyle{object} 内置输入框样式
  * @param placeholder{String} 备注
  * @param placeholderColor{String} 备注颜色
  * @param name{String} 唯一别名
  * @param inputType{String} 控件的输入类型，默认值是text,值可以是 text，date，datetime，email， password，tel，time，url，number
  * @param maxLength{Number} 控件最大长度
  * @param hasHeight{Boolean} 输入框是否有高度 默认true
  * @param ismoney{Boolean} 是否是金额格式 只适用IOS/Android， web不适用
  * @param autofocus{Boolean} 是否自动聚焦  ios中web不适用
  * @param inputIcon{String} 左侧图标地址
  * @param inputIconStyle{Object} 左侧图标栏样式
  * @param iconStyle{Object} 图标尺寸样式
-->
<template>
  <div :class="['ts-cell',
                hasHeight &&'ts-cell-height',
                hasTopBorder && 'cell-top-border',
                hasBottomBorder && 'cell-bottom-border',
                hasVerticalIndent && 'cell-indent',
                desc && 'has-desc']"
       :style="cellStyle"
       @click="cellClicked">
      <slot name="label">
          <div v-if="label" class="label" :style="{width: labelWidth}">
              <div class="required-content">
                <text v-if="required" class="required">*</text>
              </div>
              <text class="cell-label-text" :style="getLabelTextStyle">{{ label }}</text>
          </div>
          <div v-if="inputIcon" class="ts-input-icon" :style="inputIconStyle">
             <image :style="iconStyle" :src="inputIcon"></image>
         </div>
      </slot>
      <div class="cell-title" :style="cellTitleStyle">
          <slot name="input">
              <input class="ts-input"
                     :type="currentInputType"
                     :maxlength="maxLength"
                     :max-length="maxLength"
                     :placeholder="setPlaceholder"
                     :value="currentTitle"
                     :ismoney="ismoney"
                     :disabled="disabled"
                     :autofocus="autofocus"
                     :placeholder-color="placeholderColor"
                     :style="inputStyle"
                     ref="_input"
                     @input="onInput"
                     @change="onChange"
                     @focus="onFocus"
                     @blur="onBlur"
                     @click="onInputClick"
                     />
              <div class="cell-desc" :style="descTextStyle">
                <text class="cell-desc-text" v-if="desc" :style="descTextStyle">{{desc}}</text>
              </div>
          </slot>
      </div>
      <slot></slot>
  </div>
</template>

<script>
  const platform = weex.config.env.platform.toLowerCase();

  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: Number,
        default: 280
      },
      title: {
        type: [String, Number],
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      hasTopBorder: {
        type: Boolean,
        default: false
      },
      hasBottomBorder: {
        type: Boolean,
        default: true
      },
      hasVerticalIndent: {
        type: Boolean,
        default: true
      },
      cellStyle: {
        type: Object,
        default: () => {return {}}
      },
      cellTitleStyle: {
        type: Object,
        default: () => {return {}}
      },
      labelTextStyle: {
        type: Object,
        default: () => {return {}}
      },
      descTextStyle: {
        type: Object,
        default: () => {return {}}
      },
      disabled: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      inputStyle: {
        type: Object,
        default: () => {return {}}
      },
      placeholder: {
        type: String,
        default: ''
      },
      placeholderColor: {
        type: String,
        default: '#ada9a0'
      },
      name: {
        type: String,
        default: ''
      },
      inputType: {
        type: String,
        default: 'text'
      },
      maxLength: {
        type: Number,
        default: 50
      },
      hasHeight: {
        type: Boolean,
        default: true
      },
      ismoney: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      inputIcon: {
        type: String,
        default: ''
      },
      inputIconStyle: {
        type: Object,
        default: () => {return {}}
      },
      iconStyle: {
        type: Object,
        default: () => {return {}}
      }
    },
    data() {
      return {
        currentTitle: this.title,
        currentInputType: this.inputType
      }
    },
    mounted() {
      if (platform === 'web') {
        const self = this;
        const { placeholderColor, autofocus } = self;
        self.$nextTick(() => {
          const $el = self.$refs['_input'];
          $el.$el.style.setProperty("--c", placeholderColor);
        });
      }
    },
    computed: {
      getLabelTextStyle() {
          const { labelWidth, labelTextStyle } = this;
          let style = {widths: (labelWidth - 15) + 'px'};
          return Object.assign(style, labelTextStyle);
      },
      setPlaceholder() {
        const { placeholder } = this;
        return placeholder ? placeholder : '请输入';
      }
    },
    methods: {
      cellClicked() {
        this.$emit('onCellClick');
      },
      preventDefault(e) {
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
      },
      setFocus() {
        const self = this;
        self.$nextTick(() => {
          self.$refs['_input'].focus();
        })
      },
      setBlur() {
        const self = this;
        self.$nextTick(() => {
          self.$refs['_input'].blur();
        })
      },
      onInput(e) {
        this.preventDefault(e);
        const { name, maxLength, inputType, ismoney } = this;
        let inputVal = e.value;
        if (platform === 'web') {
          if (inputType === 'number' && inputVal && inputVal.length > maxLength) {
            inputVal = inputVal.slice(0, maxLength);
          }
          if (inputType === 'number' && ismoney && inputVal) {
             inputVal = (inputVal.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
          }
          e.target.value = inputVal;
        }
        let result = { value: inputVal };
        if (name) {
          result =  Object.assign(result, {name});
        }
        this.$emit('onInput', result);
      },
      onChange(e) {
        this.preventDefault(e);
        const { name } = this;
        this.currentTitle = e.value;
        let result = { value: e.value };
        if (name) {
          result =  Object.assign(result, {name});
        }
        this.$emit('onChange', result);
      },
      onFocus(e) {
        this.preventDefault(e);
        const { name, currentTitle } = this;
        let result = { value: currentTitle };
        if (name) {
          result =  Object.assign(result, {name});
        }
        this.$emit('onFocus', result);
      },
      onBlur(e) {
        this.preventDefault(e);
        const { name, currentTitle } = this;
        let result = { value: currentTitle };
        if (name) {
          result =  Object.assign(result, {name});
        }
        this.$emit('onBlur', result);
      },
      onInputClick(e) {
        this.preventDefault(e);
      },
      setValue(value) {
        const self = this;
        self.currentTitle = "";
        this.$nextTick(() => {
           self.currentTitle = value;
        });
      },
      setClear() {
        let self = this;
        self.currentTitle = " ";
        this.$nextTick(() => {
           self.currentTitle = "";
        });
      },
      setInputType(v) {
        this.currentInputType = v;
        if (platform === 'web') {
          const self = this;
          const { currentTitle } = self;
          self.currentTitle = "";
          this.$nextTick(() => {
             self.currentTitle = currentTitle;
          });
        }
      }
    }
  }
</script>

<style scoped>
  .ts-cell {
    flex-direction: row;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #ffffff;
  }
  .ts-cell-height {
    height: 100px;
  }
  .cell-top-border {
    border-top-color: #e2e2e2;
    border-top-width: 1px;
  }
  .cell-bottom-border {
    border-bottom-color: #e2e2e2;
    border-bottom-width: 1px;
  }
  .cell-indent {
    padding-bottom: 30px;
    padding-top: 30px;
  }
  .has-desc {
    padding-bottom: 18px;
    padding-top: 18px;
  }
  .label {
    flex-direction: row;
  }
  .required {
    color: #FF8301;
    font-size: 30px;
  }
  .required-content {
    margin-right: 10px;
  }
  .cell-label-text {
    font-size: 30px;
    color: #605c51;
    margin-right: 10px;
  }
  .ts-input-icon {
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
  .cell-title {
    flex: 1;
    flex-direction: row;
    align-items: center;
  }
  .ts-input {
    flex: 1;
    height: 60px;
    font-size: 28px;
    color: #333333;
    background-color: #fff;
    padding-left: 16px;
  }

  .cell-desc {
    height: 60px;
    margin-top: 4px;
    margin-left: 10px;
    align-items: center;
    justify-content: center;
  }
  .cell-desc-text {
    color: #999999;
    font-size: 24px;
    line-height: 30px;
  }
  .ts-input::placeholder {
    color: var(--c, #ada9a0);
  }
  .ts-input::-webkit-input-placeholder{
    color: var(--c, #ada9a0);
  }
  .ts-input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: var(--c, #ada9a0);
  }
  .ts-input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: var(--c, #ada9a0);
  }
  .ts-input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: var(--c, #ada9a0);
  }
</style>
