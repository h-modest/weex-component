<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
               @onLeftClick="goback"
    ></ts-header>
    <ts-list class="input-container" :style="{height: listHeight}" :showRefresh="false" :showLoading="false">
      <div class="input-content">
        <ts-input :hasHeight="hasHeight"
                  :hasTopBorder="hasTopBorder"
                  :hasBottomBorder="hasBottomBorder"
                  :hasVerticalIndent="hasVerticalIndent"
                  :desc="desc"
                  :label="label"
                  :labelWidth="labelWidth"
                  :required="required"
                  >
        </ts-input>
      </div>
      <div class="input-content">
        <ts-input :hasHeight="hasHeight"
                  :hasTopBorder="hasTopBorder"
                  :hasBottomBorder="hasBottomBorder"
                  :hasVerticalIndent="hasVerticalIndent"
                  :autofocus="autofocus"
                  :maxLength="maxLength"
                  ref="tsInput1"
                  :placeholder="placeholder"
                  :placeholderColor="placeholderColor"
                  :inputType="inputType"
                  :title="inputValue"
                  :desc="desc"
                  :label="label"
                  :labelWidth="labelWidth"
                  :required="required"
                  >
        </ts-input>
      </div>
      <div class="btn-content">
        <div class="btn-group">
          <text class="input-btn" @click="_changeType">更改类型</text>
        </div>
      </div>
      <div class="input-content">
        <ts-input :hasHeight="hasHeight"
                  :hasTopBorder="hasTopBorder"
                  :hasBottomBorder="hasBottomBorder"
                  :hasVerticalIndent="hasVerticalIndent"
                  :placeholder="placeholder"
                  :placeholderColor="placeholderColor"
                  :inputType="inputType"
                  :title="inputValue1"
                  :disabled="disabled"
                  :desc="desc"
                  :label="label"
                  :labelWidth="labelWidth"
                  :required="required"
                  >
        </ts-input>
      </div>
      <div class="input-content">
        <ts-input :hasHeight="hasHeight"
                  :hasTopBorder="hasTopBorder"
                  :hasBottomBorder="hasBottomBorder"
                  :hasVerticalIndent="hasVerticalIndent"
                  :placeholder="placeholder"
                  :placeholderColor="placeholderColor"
                  :maxLength="maxLength1"
                  :ismoney="ismoney"
                  :inputType="inputType1"
                  :title="inputValue2"
                  :desc="desc"
                  :label="label3"
                  :labelWidth="labelWidth"
                  :required="required"
                  >
        </ts-input>
      </div>
      <div class="input-content">
        <ts-input :hasHeight="hasHeight"
                  :inputIcon="inputIcon"
                  :iconStyle="iconStyle"
                  :inputIconStyle="inputIconStyle"
                  :hasVerticalIndent="hasVerticalIndent1"
                  :cellStyle="cellStyle"
                  :hasBottomBorder="hasBottomBorder1"
                  >
        </ts-input>
      </div>
      <div class="input-content">
        <ts-input :hasHeight="hasHeight"
                  :hasTopBorder="hasTopBorder"
                  :hasBottomBorder="hasBottomBorder"
                  :hasVerticalIndent="hasVerticalIndent"
                  :desc="desc"
                  :name="name"
                  ref="tsInput"
                  :label="label2"
                  :labelWidth="labelWidth"
                  :required="required"
                  @onInput="_input"
                  @onChange="_change"
                  @onFocus="_focus"
                  @onBlur="_blur"
                  @onCellClick="_cellClick"
                  >
        </ts-input>
        <div class="btn-content">
          <div class="btn-group">
            <text class="input-btn" ref="inputBtn1" @click="_setFocus">点击聚焦</text>
          </div>
          <div class="btn-group">
            <text class="input-btn" @click="_setBlur">点击失去焦点</text>
          </div>
          <div class="btn-group">
            <text class="input-btn" @click="_setChange">点击设置值</text>
          </div>
          <div class="btn-group">
            <text class="input-btn" @click="_setClear">点击清空值</text>
          </div>
        </div>
      </div>
    </ts-list>
  </div>
</template>

<script>
  import { TsHeader, TsInput, TsList } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  const globalEvent = weex.requireModule('globalEvent');
  export default {
    components: { TsHeader, TsInput, TsList },
    mixins: [mixins],
    data() {
      return {
        title: '输入框',
        leftItem: {
          image: '',
        },
        hasHeight: true,
        hasTopBorder: true,
        hasBottomBorder: true,
        hasVerticalIndent: true,
        hasBottomBorder1: false,
        hasVerticalIndent1: false,
        desc: '取消',
        label: '标签',
        label2: '测试各个事件',
        label3: '金钱格式',
        autofocus: true,
        maxLength: 20,
        maxLength1: 10,
        disabled: true,
        placeholderColor: '#3D80FA',
        placeholder: '随意初始值',
        inputValue: '初始值',
        inputValue1: '禁用输入',
        inputValue2: 12,
        labelWidth: 200,
        required: true,
        inputIcon: '',
        inputType: 'text',
        inputType1: 'number',
        ismoney: true,
        name: 'age',
        iconStyle: {
          width: '40px',
          height: '40px'
        },
        inputIconStyle: {
          height: '60px',
          width: '60px',
          backgroundColor: '#cbcbcb'
        },
        cellStyle: {
          paddingLeft: '60px',
          paddingRight: '60px',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        },
        listHeight: ''
      }
    },
    created() {
      this.onInit();
    },
    methods: {
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
        this.inputIcon = imageBaseUrl + 'home/chart.png';
        // common.showToast('初始宽' + weex.config.width);
        // common.showToast('初始高' + weex.config.height);

        globalEvent.addEventListener('screenSize', function(e) {
          // const size = { width }
          common.showToast(JSON.stringify(e));
        });

        const devHeight = common.getDevHeight();
        const barHeight = common.getBarHeight();
        this.listHeight = (devHeight - 90 - barHeight) + 'px';
      },
      _input(v) {
        const value = JSON.stringify(v);
        common.showToast('输入值改变：' + value);
      },
      _change(v) {
        const value = JSON.stringify(v);
        common.showToast('完成输入时：' + value);
      },
      _focus(v) {
        const value = JSON.stringify(v);
        common.showToast('进入焦点：' + value);
      },
      _blur(v) {
        const value = JSON.stringify(v);
        common.showToast('失去焦点：' + value);
      },
      _cellClick() {
        common.showToast('点击输入组件框');
      },
      _setFocus(e) {
        const self = this;
        self.$nextTick(() => {
          const $el = this.$refs['inputBtn1'];
          $el.onmousedown = function(e) {e.preventDefault();}
          self.$refs['tsInput'].setFocus();
        })
      },
      _setBlur() {
        const self = this;
        self.$nextTick(() => {
          self.$refs['tsInput'].setBlur();
        })
      },
      _setChange() {
        const self = this;
        self.$nextTick(() => {
          self.$refs['tsInput'].setValue('设置的值');
        })
      },
      _setClear() {
        const self = this;
        self.$nextTick(() => {
          self.$refs['tsInput'].setClear();
        })
      },
      _changeType() {
        const self = this;
        const { inputType } = self;
        self.$nextTick(() => {
          const type = inputType === "text" ? "password" : "text";
          self.inputType = type;
          self.$refs['tsInput1'].setInputType(type);
        });
      }
    }
  }
</script>

<style scoped>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .input-container {
    left: 0;
    right: 0;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .input-content {
    margin-bottom: 20px;
  }
  .btn-content {
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .btn-group {
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .input-btn {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 26px;
    color: #fff;
    background-color: #3D80FA;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
</style>
