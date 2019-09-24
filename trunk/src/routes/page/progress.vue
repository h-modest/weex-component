<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
               @onLeftClick="goback"
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
        title: '进度条',
        leftItem: {
          image: '',
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
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
</style>
