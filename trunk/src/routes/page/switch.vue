<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <div class="switch-container">
      <ts-switch :style="switchItemStyle" :value="defaultValue" @onChange="_change"></ts-switch>
      <ts-switch :style="switchItemStyle" :value="defaultValue" :disabled="disabled"></ts-switch>
      <ts-switch :style="switchItemStyle" :value="defaultValue" :checkedColor="checkedColor" ></ts-switch>
      <ts-switch :style="switchItemStyle" :value="defaultValue" :disabled="disabled" :disabledColor="disabledColor"></ts-switch>
    </div>
  </div>
</template>

<script>
  import { TsHeader, TsSwitch } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsSwitch },
    mixins: [mixins],
    data() {
      return {
        title: '开关',
        leftItem: {
          image: ''
        },
        defaultValue: true,
        disabled: true,
        checkedColor: '#1aad19',
        disabledColor: '#7cda7b'
      }
    },
    created() {
      this.onInit();
    },
    computed: {
      switchItemStyle() {
        return { marginBottom: '20px' }
      }
    },
    methods: {
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
      },
      _change(v) {
        common.showToast('开关更改：' + v);
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .switch-container {
    left: 0px;
    right: 0px;
    padding-top: 40px;
    padding-bottom: 40px;
    align-items: center;
    background-color: #fff;
  }
</style>
