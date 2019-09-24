<!--
  * 饼状图
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
import 'echarts/lib/component/graphic'

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
        let xData = [], yData = [], title = '';
        if (this.param != '') {
          let params = JSON.parse(this.param);
          title = params.title || '所占比重';
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
          graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: title,
              textAlign: 'center'
            }
          },
          series: [{
            name: '默认值',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              normal: {
                formatter: '{a}\n{d}%',
              },
            },
            data: yData
          }]
        };
        return options;
      }
    }
  }
</script>
