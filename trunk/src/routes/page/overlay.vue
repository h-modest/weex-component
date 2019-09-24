<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <div class="overlay-container">
      <text class="overlay-btn" @click="showOverlay">显示遮罩</text>
      <ts-overlay :show="show"
                   v-if="show"
                   ref="overlay"
                   :navStyle="navStyle"
                   v-bind="overlayCfg"
                   @wxcOverlayBodyClicking="_cancelOverlay"></ts-overlay>
    </div>
  </div>
</template>

<script>
  import { TsHeader, TsOverlay } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsOverlay },
    mixins: [mixins],
    data() {
      return {
        title: '遮罩',
        leftItem: {
          image: ''
        },
        show: false,
        overlayCfg: {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
        },
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
        this.navStyle.top = (90 + barHeight) + 'px';
      },
      showOverlay() {
        common.showToast('显示遮罩');
        this.show = true;
      },
      _cancelOverlay() {
        common.showToast('隐藏遮罩');
        this.show = false;
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .overlay-container {
    left: 0px;
    right: 0px;
    padding-top: 40px;
    padding-bottom: 40px;
    align-items: center;
    justify-content: center;
  }
  .overlay-btn {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 26px;
    color: #fff;
    background-color: #3D80FA;
  }
</style>
