<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <div class="city-container">
      <ts-part-item :leftText1="name"
                    :rightText1="cityName"
                    :rightTextStyle1="rightTextStyle1"
                    @onClick="_showCity">
      </ts-part-item>
    </div>
    <ts-city :show="show"
             :defaultItem="cityCode"
             @onCancel="_cancel"
             @onComplete="_complete">
    </ts-city>
  </div>
</template>

<script>
  import { TsHeader, TsCity, TsPartItem } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsCity, TsPartItem },
    mixins: [mixins],
    data() {
      return {
        title: '城市筛选器',
        leftItem: {
          image: ''
        },
        name: '城市选择器',
        cityName: '城市',
        cityCode: '',
        show: false,
        rightTextStyle1: {
          textAlign: 'right'
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
      _showCity() {
        this.show = true;
      },
      _cancel() {
        this.show = false
      },
      _complete(v) {
        this.cityName = v.province.name + '-' + v.city.name + '-' + v.area.name;
        this.cityCode = v.province.code + v.city.code + v.area.code;
        this.show = false
      },
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .city-container {
    left: 0px;
    right: 0px;
    padding-bottom: 40px;
  }
</style>
