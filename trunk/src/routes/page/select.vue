<template>
  <div class="bgf8f8f8">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <div class="select-container">
      <ts-part-item :leftText1="name"
                    :rightText1="selectTitle"
                    :rightTextStyle1="rightTextStyle1"
                    @onClick="_showSelect()">
      </ts-part-item>
    </div>
    <ts-select :show="show"
               :items="items"
               :defaultItem="defaultItem"
               :navStyle="navStyle"
               :cancelTextStyle="cancelTextStyle"
               :completeTextStyle="completeTextStyle"
               @onComplete="_complete"
               @onCancel="_cancel"
               @onChange="_change">
    </ts-select>
  </div>
</template>

<script>
  import { TsHeader, TsPartItem, TsSelect } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsPartItem, TsSelect },
    mixins: [mixins],
    data() {
      return {
        title: '单选',
        leftItem: {
          image: ''
        },
        name: '单选标签',
        defaultItem: '2',
        items: [],
        show: false,
        rightTextStyle1: {
          textAlign: 'right'
        },
        navStyle: {
          backgroundColor: '#3D80FA'
        },
        cancelTextStyle: {
          color: '#fff'
        },
        completeTextStyle: {
          color: '#fff'
        }
      }
    },
    created() {
      this.onInit();
    },
    computed: {
      selectTitle() {
        const { items, defaultItem } = this;
        let item = items.filter(v => {
          return v.key === defaultItem
        });
        return item[0].name;
      }
    },
    methods: {
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
        this.items = [{ name: '选项一', key: '1'}, {name: '选项二', key: '2'},{name: '选项三', key: '3'}];
      },
      _showSelect() {
        console.log(121231);
        this.show = true;
      },
      _complete(v) {
        common.showToast('选中回调参数：' + JSON.stringify(v));
        this.defaultItem = v.key;
      },
      _cancel() {
        this.show = false;
      },
      _change(v) {
        common.showToast('切换回调：' + JSON.stringify(v));
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .select-container {
    left: 0px;
    right: 0px;
    padding-bottom: 40px;
  }
</style>
