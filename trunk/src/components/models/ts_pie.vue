<!--
  * 饼线图
  * @author huangxueqian
  * @version 1.0.0
  * 默认曲线图
  * @param param{String} 图表参数
  * @param styles{Object} 图表样式
-->
<template>
  <div ref="chart" :style="styles"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'

// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

  export default {
    props: {
      styles: {
        stypes: Object,
        default: () => {
          return {}
        }
      },
      param: {
        type: String,
        default: ""
      },
      zoom: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      let self = this;
      if (self.zoom) {
        require('echarts/lib/component/dataZoom');
      }
      self.$nextTick(() => {
        self.init();
      });
    },
    methods: {
      // 初始化图标
      init: function() {
        let myChart = echarts.init(this.$refs.chart);
        let options = this._assign();
        // 绘制图表
        myChart.setOption(options);
      },
      // 重组图表参数
      _assign: function() {
        let xData = [], yData = [];
        if (this.param != '') {
          let params = JSON.parse(this.param);
          if (params.xyData && params.xyData.length > 0) {
            params.xyData.map(v => {
              xData.push(v.xValue);
              yData.push({
                value: v.yValue,
                name: v.xValue
              });
            });
          }
        }

        let options = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [{
            name: '默认值',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              normal: {
                 show: true,
                 position: 'inside',
                 formatter: '{d}%'
              },
              emphasis: {
                 show: true,
                 textStyle: {
                     fontSize: '30',
                     fontWeight: 'bold'
                 }
              }
            },
            labelLine: {
              normal: {
                 show: false
              }
            },
            data: yData
          }]
        };
        return options;
      }
    }
  }
</script>
