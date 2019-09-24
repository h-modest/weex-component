<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <ts-list :style="{height: listHeight}" class="part-container" :showRefresh="false" :showLoading="false">
      <ts-part-item :leftText1="item1.leftText1"
                    :rightText1="item1.rightText1"
                    :rightText2="item1.rightText2"
                    @onClick="_cellClick()">
      </ts-part-item>
      <ts-part-item :leftText1="item1.leftText1"
                    :rightText1="item1.rightText1"
                    :isCellClick="false"
                    @onRightClick="_rightClick()">
      </ts-part-item>
      <ts-part-item :leftText1="item2.leftText1"
                    :rightText1="item2.rightText1"
                    :isCellClick="false"
                    @onRightClick="_rightClick()">
      </ts-part-item>
      <ts-part-item :leftText1="item3.leftText1"
                    :rightText1="item3.rightText1"
                    :leftIcon="item3.leftIcon"
                    :rightIcon="item3.rightIcon">
      </ts-part-item>
      <ts-part-item :leftText1="item4.leftText1"
                    :rightText1="item4.rightText1"
                    :rightTextStyle1="item4.rightTextStyle1">
      </ts-part-item>
      <ts-part-item :leftText1="item5.leftText1"
                    :rightText1="item5.rightText1"
                    :isScalable="item5.isScalable">
      </ts-part-item>
      <ts-part-item :leftText1="item6.leftText1"
                    :rightText1="item6.rightText1"
                    :rightTextStyle1="item6.rightTextStyle1"
                    :rightIcon="item6.rightIcon">
      </ts-part-item>
      <ts-part-item :leftText1="item7.leftText1"
                    :rightText1="item7.rightText1"
                    :rightTextStyle1="item7.rightTextStyle1"
                    :rightTextStyle="item7.rightTextStyle"
                    :rightIcon="item7.rightIcon">
      </ts-part-item>
    </ts-list>
  </div>
</template>

<script>
  import { TsHeader, TsPartItem, TsList } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsPartItem, TsList },
    mixins: [mixins],
    data() {
      return {
        title: '表单栏',
        leftItem: {
          image: ''
        },
        listHeight: '',
        item1: {
          leftText1: '只整个点击事件',
          rightText1: '取值1',
          rightText2: '取值2',
        },
        item2: {
          leftText1: '只整个右侧事件',
          rightText1: '取值1',
        },
        item3: {
          leftText1: '左右图标',
          rightText1: '取值1',
          leftIcon: {
            path: '',
            style: {}
          },
          rightIcon: {
            path: '',
            style: {
              width: '40px',
              height: '40px'
            }
          }
        },
        item4: {
          leftText1: '右侧文字居右',
          rightText1: '取值1',
          rightTextStyle1: {
            textAlign: 'right'
          }
        },
        item5: {
          leftText1: '右侧文字长度过长伸缩盒子',
          rightText1: '',
          isScalable: true
        },
        item6: {
          leftText1: '右侧文字图表',
          rightText1: '取值1',
          rightTextStyle1: {
            textAlign: 'right'
          },
          rightIcon: {
            path: ''
          }
        },
        item7: {
          leftText1: '右侧文字过长省略号',
          rightText1: '取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1',
          rightTextStyle1: {
            textAlign: 'right',
            lines: 1,
            'text-overflow': 'ellipsis'
          },
          rightTextStyle: {
            flexDirection: 'column',
            height: '34px'
          },
          rightIcon: {
            path: ''
          }
        },
      }
    },
    created() {
      this.onInit();
    },
    methods: {
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
        this.item3.leftIcon.path = imageBaseUrl + 'home/part_item.png';
        this.item3.rightIcon.path = imageBaseUrl + 'home/part_item.png';
        this.item5.rightText1 = '取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值'+
                                '1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1取值1';
        this.item6.rightIcon.path = imageBaseUrl + 'common/next.png';
        this.item7.rightIcon.path = imageBaseUrl + 'home/part_item.png';

        const devHeight = common.getDevHeight();
        const barHeight = common.getBarHeight();
        this.listHeight = (devHeight - 90 - barHeight) + 'px';
      },
      _cellClick() {
        common.showToast('整个点击事件');
      },
      _rightClick() {
        common.showToast('右侧点击事件');
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .part-container {
    left: 0px;
    right: 0px;
    padding-bottom: 40px;
  }
</style>
