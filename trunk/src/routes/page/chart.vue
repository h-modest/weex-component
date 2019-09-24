<template>
  <div class="bgf8f8f8" @layoutSubviews="layoutSubviews">
    <ts-header :title="title"
               :leftItem="leftItem"
                @onLeftClick="goback"
    ></ts-header>
    <div class="chart-container">
      <text class="chart-btn" @click="_showSelect">{{ chartName }}</text>
      <ts-chart v-if="showChart" :type="defaultItem"
                :styles="chartStyle"
                :param="param"
      ></ts-chart>
    </div>
    <ts-select :items="items"
               :defaultItem="defaultItem"
               :show="show"
               @onCancel="_hideSelect"
               @onComplete="_complete"
     ></ts-select>
  </div>
</template>

<script>
  import { TsHeader, TsChart, TsSelect } from '@/components';
  import mixins from '@/mixins/mixins';
  import common from '@/common/js/common';
  export default {
    components: { TsHeader, TsChart, TsSelect },
    mixins: [mixins],
    data() {
      return {
        title: '图表',
        leftItem: {
          image: '',
        },
        items: [],
        defaultItem: 'line',
        show: false,
        showChart: true,
        contentHeight: '',
        width: 700,
        param: ''
      }
    },
    created() {
      this.onInit();
    },
    computed: {
      chartName() {
        const { items, defaultItem } = this;
        let item = items.filter(v => {
          return v.key === defaultItem;
        });
        return item[0].name;
      },
      chartStyle() {
        const { width } = this;
        return {
          width: (width - 60) + 'px',
          height: '500px'
        }
      }
    },
    methods: {
      layoutSubviews(v) {
        const self = this;
        self.showChart = false;
        self.width = v.tsResult.width;
        setTimeout(() => {
          self.showChart = true;
        }, 50);
      },
      onInit() {
        const imageBaseUrl = common.getImageUrl();
        this.leftItem.image = imageBaseUrl + 'common/left.png';
        this.items = [{ name: '折现图', key: 'line' }, { name: '柱状图', key: 'bar' },{ name: '饼状图', key: 'pie' },{ name: '饼线图', key: 'pie-line' }];

        const param = {
           xyData: [
               {xValue: '1', yValue: 40},
               {xValue: '2', yValue: 10},
               {xValue: '3', yValue: 20},
           ],
           title: '所占比重\n\n100%',
           invalidate: false,
         };
         this.param = JSON.stringify(param);
      },
      _showSelect() {
        this.show = true;
      },
      _hideSelect() {
        this.show = false
      },
      _complete(v) {
        const self = this;
        self.defaultItem = v.key;
        self.showChart = false;
        setTimeout(() => {
          self.showChart = true;
        }, 100);
      }
    }
  }
</script>

<style>
  .bgf8f8f8 {
    background-color: #f8f8f8;
  }
  .chart-container {
    left: 0px;
    right: 0px;
    padding-top: 40px;
    padding-bottom: 40px;
    align-items: center;
    justify-content: center;
  }
  .chart-btn {
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
    margin-bottom: 20px;
    text-align: center;
    line-height: 50px;
  }
</style>
