<template>
  <div class="bgf8f8f8" @layoutSubviews="layoutSubviews">
    <ts-header :title="title"
               :hasBottomBorder="hasBottomBorder"
               :leftItem="leftItem"
               :rightItem="rightItem"
               ref="tsHeader"
               @onCenterClick="_centerClick"
               @onLeftClick="goback"
               @onRightClick="_rightClick"
    ></ts-header>
  </div>
</template>

<script>
  import { TsHeader } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader },
    mixins: [mixins],
    data() {
      return {
        title: '检测头部长度过长应该显示省略号省略',
        hasBottomBorder: true,
        leftItem: {
          image: '',
          text: '返回'
        },
        rightItem: []
      }
    },
    created() {
      this.onInit();
    },
    methods: {
      layoutSubviews(v) {
        const self = this;
        self.$nextTick(() => {
          self.$refs['tsHeader'].layoutSubviews(v);
        });
      },
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
        this.rightItem = [{
          image: imageBaseUrl + 'home/api.png'
        },{
          image: imageBaseUrl + 'home/extend.png'
        }];
      },
      _centerClick() {
        common.showToast('点击中间位置')
      },
      _rightClick() {
        common.showToast('点击右侧')
      },
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
</style>
