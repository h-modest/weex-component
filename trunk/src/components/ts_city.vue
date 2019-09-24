<!--
  * 城市三级联动组件
  * @author huangxueqian
  * @version 1.0.0
  * @param show{Boolean} 是否展示
  * @param navStyle{Object} 弹出层头部样式
  * @param cancelTextStyle{Object} 取消文字样式
  * @param provinces{Array} 省份数据
  * @param citys{Array} 城市数据
  * @param areas{Array} 地区数据
  * @param defaultItem{String} 默认城市Id
    * default '110101'
-->
<template>
  <ts-popup :show="show" @tsPopupCancel="_cancel" pos="bottom" height="500" ref="popup">
    <div class="ts-city-header" :style="navStyle">
      <text class="ts-city-title" :style="cancelTextStyle" @click="_cancel">取消</text>
      <text class="ts-city-title" :style="completeTextStyle" @click="_complete">完成</text>
    </div>
    <div class="ts-city-content">
      <div class="ts-city-item">
        <ts-picker :items="provinceList"
                   :defaultItem="province.code"
                   :itemKey="itemKey"
                   :navStyle="navStyle1"
                   itemRef="province"
                   @onChange="_provinceChange"
        >
        </ts-picker>
      </div>
      <div class="ts-city-item">
        <ts-picker v-if="showCity" :items="_assignCity(cityList, 'provinceCode', province.code)"
                   :defaultItem="city.code"
                   :itemKey="itemKey"
                   itemRef="city"
                   :navStyle="navStyle1"
                   @onChange="_cityChange"
        >
        </ts-picker>
      </div>
      <div class="ts-city-item">
        <ts-picker v-if="showArea" :items="_assignCity(areaList, 'cityCode', city.code)"
                   :defaultItem="area.code"
                   :itemKey="itemKey"
                   itemRef="area"
                   :navStyle="navStyle1"
                   @onChange="_areaChange"
        >
        </ts-picker>
      </div>
    </div>
  </ts-popup>
</template>

<script>
  import TsPopup from './ts_popup';
  import TsPicker from './element/ts_picker';

  export default {
    components: { TsPopup, TsPicker },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      navStyle: {
        type: Object,
        default: () => { return {}}
      },
      cancelTextStyle: {
        type: Object,
        default: () => { return {}}
      },
      completeTextStyle: {
        type: Object,
        default: () => { return {}}
      },
      provinces: {
        type: Array,
        default: () => { return []}
      },
      citys: {
        type: Array,
        default: () => { return []}
      },
      areas: {
        type: Array,
        default: () => { return []}
      },
      defaultItem: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isInit: false,
        provinceList: [],
        cityList: [],
        areaList: [],
        province: {
          name: '',
          code: ''
        },
        city: {
          name: '',
          code: ''
        },
        area: {
          name: '',
          code: ''
        },
        itemKey: 'code',
        navStyle1: {
          height: '420px'
        },
        showCity: false,
        showArea: false
      }
    },
    created() {
      this.onInit();
    },
    methods: {
      onInit() {
        const self = this;
        const { provinces, citys, areas } = this;
        let provinceList = provinces, cityList = citys, areaList = areas;
        let defaultItem = '';
        if (provinces.length === 0) {
          provinceList = require('../common/json/provinces.json');
        }
        if (citys.length === 0) {
          cityList = require('../common/json/cities.json');
        }
        if (areas.length === 0) {
          areaList = require('../common/json/areas.json');
        }
        this.provinceList = provinceList;
        this.cityList = cityList;
        this.areaList = areaList;

        defaultItem = self.defaultItem === '' ? '110101' : self.defaultItem;

        this.province.code = defaultItem.substring(0,2);
        this.province.name = this.provinceList.filter(v => {
          return v.code === self.province.code;
        })[0].name;
        this.city.code = defaultItem.substring(0,4);
        const cityArr = this._assignCity(cityList, 'provinceCode', this.province.code);
        this.city.name = cityArr.filter(v => {
          return v.code === self.city.code;
        })[0].name;
        this.area.code = defaultItem;
        this.area.name = areaList.filter(v => {
          return v.code === self.area.code;
        })[0].name;
        setTimeout(() => {
          self.showCity = true;
          self.showArea = true;
        }, 100);
      },
      _assignCity(arr, key, defaultVal) {
          let newArr = new Array();
          if (arr.length > 0) {
            arr.map(v => {
              if (v[key] === defaultVal) {
                newArr.push(v);
              }
            })
          }
          return newArr;
      },
      _cancel(callback) {
        let self = this;
        self.$nextTick(() => {
          self.$refs.popup.hide();
          setTimeout(() => {
            self.$emit('onCancel');
            typeof callback === 'function' && callback();
          }, 300);
        })
      },
      _complete() {
        const self = this;
        const { province, city, area } = self;
        const cityObj = {
          province,
          city,
          area
        }
        self._cancel(function(){
          self.$emit('onComplete', cityObj);
        });
      },
      _provinceChange(v) {
        const self = this;
        this.province = v;
        const cityArr = self._assignCity(self.cityList, 'provinceCode', v.code);
        let cityItem = cityArr.filter(vo => { return vo.provinceCode === v.code })[0];
        this.city = cityItem;
        const areaArr = self._assignCity(self.areaList, 'cityCode', cityItem.code);
        let areaItem = areaArr.filter(vo => { return vo.cityCode === cityItem.code })[0];
        this.area = areaItem;
        self.showArea = false;
        this.showCity = false;
        setTimeout(() => {
          self.showCity = true;
          self.showArea = true;
        }, 100);
      },
      _cityChange(v) {
        const self = this;
        this.city = v;
        const areaArr = self._assignCity(self.areaList, 'cityCode', v.code);
        let areaItem = areaArr.filter(vo => { return vo.cityCode === v.code })[0];
        this.area = areaItem;
        this.showArea = false;
        setTimeout(() => {
          self.showArea = true;
        }, 100);
      },
      _areaChange(v) {
        this.area = v;
      },
    }
  }
</script>

<style scoped>
.ts-city-header {
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color:  #E0E0E2;
  background-color: #ECEEF2;
}
.ts-city-title {
  height: 80px;
  width: 100px;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  color: #007aff;
}
.ts-city-content {
  background-color: #fff;
  height: 420px;
  left: 0;
  right: 0;
  flex-direction: row;
  overflow: hidden;
}
.ts-city-item {
  flex: 1;
}
</style>
