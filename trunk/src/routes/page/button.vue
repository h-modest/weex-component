<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
               @onLeftClick="goback"
    ></ts-header>
    <div class="btn-container">
      <ts-button @onClick="_click">按钮1</ts-button>
      <ts-button :disabled="disabled" :disabledBgColor="disabledBgColor">不可点击</ts-button>
      <div style="left: 0px; right: 0px; background-color: #FF0000; height: 200px;">
        <text>12312</text>
      </div>
    </div>
  </div>
</template>

<script>
  import { TsHeader, TsButton } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsButton },
    mixins: [mixins],
    data() {
      return {
        title: '按钮',
        leftItem: {
          image: '',
        },
        disabled: true,
        disabledBgColor: '#c6daff'
      }
    },
    created() {
      this.onInit();
    },
    methods: {
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
      },
      _click() {
        common.showToast('普通点击事件');
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .btn-container {
    left: 0px;
    right: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    align-items: center;
  }
</style>
