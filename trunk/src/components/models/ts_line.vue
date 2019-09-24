<!--
  * 折线图
  * @author huangxueqian
  * @version 1.0.0
  * 默认曲线图
  * @param param{String} 图表参数
  * @param styles{Object} 图表样式
  * @param zoom{Boolean} 是否可伸缩
-->
<template>
  <div ref="chart" :style="styles"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  // 单独引入所需内容，以减少内存
  import 'echarts/lib/chart/line'

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
          if (params.xyData.length > 0) {
            params.xyData.map(v => {
              xData.push(v.xValue);
              yData.push(v.yValue);
            });
          }
        }

        let options = {
          tooltip: {},
          xAxis: {
              data: xData
          },
          yAxis: {},
          series: [{
              name: "",
              type: 'line',
              data: yData,
              itemStyle: {
                color: '#1692d0'
              },
              emphasis: {
                itemStyle: {
                  color: '#1692d0'
                },
              },
              smooth: true
          }],
          markPoint: {
            symbolSize: 10
          },
        };
        if (this.zoom) {
          options = Object.assign(options, {
            dataZoom: [{
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 100
            },
            {
              type: 'slider',
              show: true,
              yAxisIndex: [0],
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              yAxisIndex: [0],
              start: 0,
              end: 100
            }]
          })
        }
        return options;
      }
    }
  }
</script>
