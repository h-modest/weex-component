<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <div class="loading-container">
      <text class="loading-btn" @click="_showLoading">显示加载</text>
      <ts-loading :show="show" :navStyle="navStyle"></ts-loading>
    </div>
  </div>
</template>

<script>
  import { TsHeader, TsLoading } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsLoading },
    mixins: [mixins],
    data() {
      return {
        title: '加载',
        leftItem: {
          image: ''
        },
        show: false,
        navStyle: {
          top: '0px'
        }
      }
    },
    created() {
      this.onInit();
    },
    methods: {
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';

        const barHeight = common.getBarHeight();
        this.navStyle.top = (barHeight + 90) + 'px';
      },
      _showLoading() {
        this.show = true;
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .loading-container {
    left: 0px;
    right: 0px;
    padding-top: 40px;
    padding-bottom: 40px;
    align-items: center;
    justify-content: center;
  }
  .loading-btn {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 26px;
    color: #fff;
    background-color: #3D80FA;
  }
</style>
