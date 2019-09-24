<template>
  <div class="index">
    <text class="ts-btn" @click="_show('showPicker', true)">{{ outputInfo.chart.name }}</text>
    <slider v-if="show" class="slider" @change="handleChange">
     <div class="frame" v-for="(img, i) in imageList">
       <ts-chart v-if="currIdx == i" :type="chart.type" :styles="chart.style" :param="chart.param"></ts-chart>
       <div v-else :style="chart.style"></div>
     </div>
   </slider>
   <ts-list :style="{ height: contentHeight }" :showRefresh="true" :showLoading="true" ref="list" @onRefresh="_refresh" @onLoadmore="_load">
     <div style="height: 400px; width: 750px; background-color: #FF0000;" v-for="(item, idx) in inputInfo.items" :key="idx">
       <text style="color: #ffffff;">{{item.name}}</text>
     </div>
   </ts-list>
   <ts-select :items="inputInfo.items" :defaultItem="inputInfo.defaultItem" :show="showPicker" @cancel="_show('showPicker', false)" @onChange="_change" @onComplete="_complete"></ts-select>
  </div>
</template>

<script>
  import { TsSelect, TsChart, TsList } from '@/components';

  export default {
    components: {
      TsChart, TsSelect, TsList
    },
    data() {
      return {
        chart: {
          type: 'line',
          style: {
            'width': '700px',
            'height': '500px',
          },
          param: '',
        },
        isShowCity: false,
        showPicker: false,
        inputInfo: {
          areaId: '110101',
          items: [{ name: '折现图', key: 'line' }, { name: '柱状图', key: 'bar' },{ name: '饼状图', key: 'pie' },{ name: '饼线图', key: 'pie-line' }],
          defaultItem: 'line'
        },
        outputInfo: {
          chart: {
            name: '折现图',
            key: 'line'
          }
        },
        imageList: [1,2,3,4],
        show: true,
        currIdx: 0,
        contentHeight: '300px'
      }
    },
    created() {
      this.init();
    },
    methods: {
        // 初始化
        init() {
          let self = this;
          /* 曲线图数据配置 */
          var param = {
             xyData: [
                 {xValue: '1', yValue: 40},
                 {xValue: '2', yValue: 10},
                 {xValue: '3', yValue: 20},
                 {xValue: '4', yValue: 30},
             ],
             title: '所占比重\n\n100%',
             invalidate: false,
           };
           self.chart.param = JSON.stringify(param);
        },
        _cancelCity() {
          this.isShowCity = false;
        },
        _selectCity(v) {
          console.log('选择城市' + v);
        },
        _showCity() {
          this.isShowCity = true;
        },
        _show(v, bool) {
          this[v] = bool;
        },
        _change(v) {
          console.log('变化' + JSON.stringify(v));
        },
        _complete(v) {
          let self = this;
          this.currIdx = 0;
          self.outputInfo.chart = v;
          self.inputInfo.defaultItem = v.key;
          self.chart.type = v.key;
          self.show = false;
          setTimeout(() => {
            self.show = true;
          },100);
          // console.log('结果' + JSON.stringify(v));
        },
        handleChange(e) {
          let { index } = e, { inputInfo: {items}} = this;
          this.currIdx = index;
          this.chart.type = items[index].key;
        },
        _refresh() {
          console.log('刷新');
          const self = this;
          self.$nextTick(() => {
            self.$refs.list.onRefreshComplete();
          })
        },
        _load() {
          console.log('加载更多');
          const self = this;
          self.$nextTick(() => {
            self.$refs.list.onLoadmoreComplete();
          })
        }
     }
  }
</script>

<style lang="css" scoped>
  .index {
    padding-top: 50px;
  }
  .image {
    width: 700px;
    height: 700px;
  }
  .slider {
    margin-top: 25px;
    margin-left: 25px;
    width: 700px;
    height: 700px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
  .frame {
    width: 700px;
    height: 700px;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  .ts-btn {
    border-color: #bbb;
    border-width: 1px;
    width: 160px;
    height: 50px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 30px;
    font-weight: bold;
    margin-left: 20px;
    text-align: center;
    line-height: 50px;
  }
</style>
