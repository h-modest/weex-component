<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <div class="popup-container">
      <div class="popup-mb20">
        <text class="popup-btn" @click="_showPopup('right')">显示左侧弹出层</text>
      </div>
      <div class="popup-mb20">
        <text class="popup-btn" @click="_showPopup('left')">显示右侧弹出层</text>
      </div>
      <div class="popup-mb20">
        <text class="popup-btn" @click="_showPopup('bottom')">显示下侧弹出层</text>
      </div>
      <div class="popup-mb20">
        <text class="popup-btn" @click="_showPopup('top')">显示上侧弹出层</text>
      </div>
    </div>
    <ts-popup :popupColor="popupColor"
              :show="show"
              :standOut="standOut"
              @tsPopupCancel="_cancelPopup"
              :pos="pos"
              :height="height"
              :width="width"
              :animation="animation"
              :overlayCfg="overlayCfg">
      <div>
        <text>123121</text>
      </div>
    </ts-popup>
  </div>
</template>

<script>
  import { TsHeader, TsPopup } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsPopup },
    mixins: [mixins],
    data() {
      return {
        title: '弹出层',
        leftItem: {
          image: ''
        },
        show: false,
        popupColor: '#f8f8f8',
        height: 300,
        width: 300,
        pos: 'right',
        standOut: 1,
        animation: {
          timingFunction: 'ease-in-out'
        },
        overlayCfg: {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
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
      },
      _showPopup(v) {
        this.show = true;
        this.pos = v;
      },
      _cancelPopup() {
        this.show = false;
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .popup-container {
    left: 0px;
    right: 0px;
    padding-top: 40px;
    padding-bottom: 40px;
    align-items: center;
    justify-content: center;
  }
  .popup-btn {
    width: 240px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 26px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: #fff;
    background-color: #3D80FA;
  }
  .bgfff {
    background-color: #fff;
  }
  .popup-mb20 {
    margin-bottom: 20px;
  }
</style>
