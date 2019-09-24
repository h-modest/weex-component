<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <ts-empty-list :type="type"
                   :title="listTitle"
                   :iconUrl="iconUrl"
                   :text="text"
                   :titleStyle="titleStyle"
                   :isRefresh="isRefresh"
                   @onRefresh="_refresh">
    </ts-empty-list>
  </div>
</template>

<script>
  import { TsHeader, TsEmptyList } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsEmptyList },
    mixins: [mixins],
    data() {
      return {
        title: '空列表',
        leftItem: {
          image: ''
        },
        iconUrl: '',
        type: 0,
        listTitle: '空列表',
        text: '空列表备注',
        isRefresh: true,
        titleStyle: {
          color: '#4C84FF'
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
        this.iconUrl = imageBaseUrl + 'home/empty_list.png';
      },
      _refresh() {
        common.showToast('点击刷新')
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
    justify-content: center;
  }
</style>
