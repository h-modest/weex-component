<!--
  * 图表组件
  * @author huangxueqian
  * @version 1.0.0
  * @param param{String} 图表参数
  * @param styles{Object} 图表样式
  * @param type{String} 图表类型
    * line: 折线图
    * bar: 柱状图
    * pie: 饼状图
    * pie-line: 饼线图
  *  @param zoom{Boolean} 是否可伸缩 仅针对曲线图
-->
<template>
  <component :is="com" :param="param" :style="styles" :styles="styles" :zoom="zoom" :invalidate="true"></component>
</template>

<script>
  import { TsBar, TsLine, TsPie, TsPieLine } from './models';
  const platform = weex.config.env.platform.toLowerCase();

  export default {
    components: {
      TsLine, TsBar, TsPie, TsPieLine
    },
    props: {
      param: {
        type: String,
        default: '',
      },
      styles: {
        type: Object,
        default: () => {
          return {}
        }
      },
      type: {
        type: String,
        default: 'line'
      },
      zoom: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        com: 'ts-line',
        comArr: {
          line: 'tsLineChart',
          pie: 'tsPicChart',
          bar: 'tsBarChart',
          'pie-line': 'tsPiclineChart'
        },
        isUpdate: false
      }
    },
    created() {
      let self = this, com = '';
      let { type, comArr } = self;
      self.com = platform === 'web' ? ( 'ts-' + type ) : comArr[type];
    }
  }
</script>
