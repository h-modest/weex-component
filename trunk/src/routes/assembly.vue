<template>
  <ts-list :style="{height: height}" :showRefresh="false" :showLoading="false">
    <ts-part-item v-for="(v, i) in assemblyList" :key="i" :leftText1="v.title"
                  :leftIcon="{path: imageUrl + 'home/' + v.path + '.png', style: {}}"
                  :rightIcon="rightIcon"
                  @onClick="_jump(v.path)">
    </ts-part-item>
  </ts-list>
</template>

<script>
  import { TsList, TsPartItem } from '@/components';
  import common from '@/common/js/common';
  const assemblyList = [{
    path: 'header',
    title: '头部栏'
  },{
    path: 'list',
    title: '列表'
  },{
    path: 'tabbar',
    title: '底部标签栏'
  },{
    path: 'overlay',
    title: '遮罩'
  },{
    path: 'popup',
    title: '弹出层'
  },{
    path: 'select',
    title: '单选'
  },{
    path: 'chart',
    title: '图表'
  },{
    path: 'part_item',
    title: '表单栏'
  },{
    path: 'city',
    title: '城市'
  },{
    path: 'switch',
    title: '开关'
  },{
    path: 'loading',
    title: '加载'
  },{
    path: 'empty_list',
    title: '空列表'
  },{
    path: 'input',
    title: '输入框'
  },{
    path: 'button',
    title: '按钮'
  },{
    path: 'navbar',
    title: '导航栏'
  },{
    path: 'progress',
    title: '进度条'
  }];

  export default {
    components: { TsList, TsPartItem },
    props: {
      height: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        assemblyList: [],
        imageUrl: '',
        rightIcon: {
          path: '',
          style: {}
        }
      }
    },
    created() {
      this.onInit()
    },
    methods: {
      onInit() {
        this.assemblyList = assemblyList;
        const imageUrl = common.getImageUrl();
        this.imageUrl = imageUrl;
        this.rightIcon.path = imageUrl + 'common/next.png'
      },
      _jump(path) {
        common.jump('/routes/page/' + path);
      }
    }
  }
</script>

<style scoped>
</style>
