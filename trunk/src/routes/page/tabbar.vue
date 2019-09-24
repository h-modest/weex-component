<template>
  <div class="bgf8f8f8" @layoutSubviews="layoutSubviews">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <div class="tabbar-container" :style="contentHeight">
      <ts-tabbar-item :currentIndex="currentTabIndex" :index="0">
        <text>1</text>
      </ts-tabbar-item>
      <ts-tabbar-item :currentIndex="currentTabIndex" :index="1">
        <text>2</text>
      </ts-tabbar-item>
      <ts-tabbar-item :currentIndex="currentTabIndex" :index="2">
        <text>3</text>
      </ts-tabbar-item>
    </div>
    <ts-tabbar :items="items"
                ref="tabbar"
                :currentIndex="currentTabIndex"
                :iconStyle="iconStyle"
                :newsStyle="newsStyle"
                :textStyle="textStyle"
                 @onClick="onSelect"
                ></ts-tabbar>
  </div>
</template>

<script>
  import { TsHeader, TsTabbar, TsTabbarItem } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsTabbar, TsTabbarItem },
    mixins: [mixins],
    data() {
      return {
        title: '底部标签栏',
        leftItem: {
          image: ''
        },
        hasTopBorder: true,
        items: [],
        iconStyle: {},
        currentTabIndex: 0,
        textStyle: {},
        newsStyle: {},
        height: 750
      }
    },
    created() {
      this.onInit();
    },
    computed: {
      contentHeight() {
        const barHeight = common.getBarHeight();
        let { height } = this;
        return {
          height: (height - 211 - barHeight) + 'px'
        };
      }
    },
    methods: {
      layoutSubviews(v) {
        const self = this;
        self.height = v.tsResult.height;
        self.$nextTick(() => {
          self.$refs.tabbar.layoutSubviews(v);
        })
      },
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
        this.items =  [{
          iconPath: imageBaseUrl + 'home/assembly.png',
          title: 'A',
          selectedIconPath: imageBaseUrl + 'home/assembly-selected.png',
          newsNum: 0
        },
        {
          iconPath: imageBaseUrl + 'home/extend.png',
          title: 'B',
          selectedIconPath: imageBaseUrl + 'home/extend-selected.png',
          newsNum: 10
        },
        {
          iconPath: imageBaseUrl + 'home/api.png',
          title: 'C',
          selectedIconPath: imageBaseUrl + 'home/api-selected.png',
          newsNum: 100
        }];

        this.height = common.getDevHeight();

        this.iconStyle = { width: '50px', height: '50px' };
        this.textStyle = { color: '#999', selectedColor: '#FF0000'}
        this.newsStyle = { backgroundColor: '#4C84FF' }

      },
      onSelect(i) {
        common.showToast('选择第' + i + '个');
        this.currentTabIndex = i;
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .tabbar-container {
    left: 0px;
    right: 0px;
  }
</style>
