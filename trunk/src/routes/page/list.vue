<template>
  <div class="bgf8f8f8" @layoutSubviews="layoutSubviews">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <ts-list :style="{height: listHeight}"
             :tipText="tipText"
             :showLoading="showLoading"
             :showRefresh="showRefresh"
             ref="list"
             :noMore="noMore"
             @onRefresh="_refresh"
             @onLoadmore="_loadmore">
       <div class="list-box">
         <div  v-for="(v, i) in list" :key="i" class="list-cell" :style="cellStyle">
           <text class="list-text">{{ v }}</text>
         </div>
       </div>
    </ts-list>
  </div>
</template>

<script>
  import { TsHeader, TsList } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsList },
    mixins: [mixins],
    data() {
      return {
        title: '列表',
        leftItem: {
          image: ''
        },
        list: [],
        listHeight: '',
        showRefresh: true,
        showLoading: true,
        showLoadingText: true,
        tipText: {},
        noMore: false,
        width: 750
      }
    },
    created() {
      this.onInit();
    },
    computed: {
      cellStyle() {
        const { width } = this;
        return { width: (width * 0.9) + 'px' };
      }
    },
    methods: {
      layoutSubviews(v) {
        const self = this;
        self.width = v.tsResult.width;
      },
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
        this.list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        this.tipText = { refresh:'测试刷新中...', loadmore:'测试加载中...', nomore: '测试没有更多啦~' }

        const devHeight = common.getDevHeight();
        const barHeight = common.getBarHeight();
        this.listHeight = (devHeight - 90 - barHeight) + 'px';
      },
      _refresh() {
        const self = this;
        common.showToast('下拉刷新');
        self.$nextTick(() => {
          self.$refs.list.onRefreshComplete();
          common.showToast('关闭刷新')
        })
      },
      _loadmore() {
        const self = this;
        common.showToast('上拉加载');
        self.$nextTick(() => {
          self.$refs.list.onLoadmoreComplete();
          common.showToast('关闭加载')
        })
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .list-box {
    align-items: center;
  }
  .list-cell {
    height: 300px;
    align-items: center;
    justify-content: center;
    background-color: rgba(162, 217, 192, 0.2);
    margin-top: 20px;
  }
  .list-text {
    font-size: 88px;
    text-align: center;
    color: #41B883;
  }
</style>
