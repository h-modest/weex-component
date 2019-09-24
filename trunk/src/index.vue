<template>
  <div class="bgf8f8f8" @layoutSubviews="layoutSubviews">
    <ts-header :title="title"></ts-header>
    <slider :style="contentHeight" :infinite="false" :index="currentTabIndex" @change="onChange">
      <div :style="contentHeight">
        <assembly :height="listHeight"></assembly>
      </div>
      <div :style="contentHeight">
        <extend></extend>
      </div>
      <div :style="contentHeight">
        <api></api>
      </div>
    </slider>
    <ts-tabbar :items="tabbarList" :currentIndex="currentTabIndex" @onClick="onSelect" ref="main-tabbar"></ts-tabbar>
  </div>
</template>

<script>
  import { TsHeader, TsTabbar } from '@/components';
  import { Api, Assembly, Extend } from '@/routes';
  import common from '@/common/js/common';
  import mixins from '@/mixins/mixins';

  export default {
    components: { TsHeader, TsTabbar, Api, Assembly, Extend },
    mixins: [mixins],
    data() {
      return {
        title: '组件库',
        tabbarList: [],
        currentTabIndex: 0,
        width: 750,
        height: 750
      }
    },
    created() {
      this.init()
    },
    computed: {
      contentHeight() {
        const barHeight = common.getBarHeight();
        let { height, width } = this;
        return {
          height: (height - 211 - barHeight) + 'px',
          width: width + 'px'
        };
      },
      listHeight() {
        const barHeight = common.getBarHeight();
        let { height } = this;
        return (height - 211 - barHeight) + 'px';
      }
    },
    methods: {
      layoutSubviews(v) {
        const self = this;
        self.height = v.tsResult.height;
        self.width = v.tsResult.width;
        self.$nextTick(() => {
          self.$refs['main-tabbar'].layoutSubviews(v);
        })
      },
      init() {
        const imageUrl = common.getImageUrl();
        this.tabbarList = [{
          iconPath: imageUrl + 'home/assembly.png',
          title: '组件',
          selectedIconPath: imageUrl + 'home/assembly-selected.png',
        },
        {
          iconPath: imageUrl + 'home/extend.png',
          title: '拓展',
          selectedIconPath: imageUrl + 'home/extend-selected.png',
        },
        {
          iconPath: imageUrl + 'home/api.png',
          title: 'API',
          selectedIconPath: imageUrl + 'home/api-selected.png',
        }];

        this.height = common.getDevHeight();
      },
      onSelect(index) {
        this.currentTabIndex = index;
      },
      onChange(e) {
        this.currentTabIndex = e.index;
      }
    }
  }
</script>

<style scoped>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .main-container {
    left: 0px;
    right: 0px;
  }
</style>
