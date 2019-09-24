<!--
* 单选组件
* @author huangxueqian
* @version 1.0.0
* @param value{Boolean} 是否开启  false
* @param disabled{Boolean}  是否禁用  false
* @param checkedColor{String}  选中颜色  '#027FF3'
* @param disabledColor{String}  禁用颜色  '#6bb3f7'
* @return onChange{Function}  改变回调函数  checked状态
-->
<template>
  <div class="ts-switch"
       :style="switchStyle"
        @click="handleClick">
    <text class="switch-core" ref="switchCore" :style="coreStyle"></text>
    <text class="switch-ball" ref="switchBall" :style="ballStyle"></text>
</div>
</template>
<script>
  const animation = weex.requireModule('animation');
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      checkedColor: {
        type: String,
        default: '#027FF3',
      },
      disabledColor: {
        type: String,
        default: '#6bb3f7'
      }
    },
    data() {
      return {
        checked: false,
        ballStyle: {},
        coreStyle: {},
      }
    },
    created() {
      this.initStyle();
    },
    mounted() {
      this.checked = this.value;
      this.ballAnimation(true);
      this.animation(true);
    },
    computed: {
      switchStyle() {
        const { checked, checkedColor, disabled, disabledColor } = this;
        const backgroundColor = checked ? ( disabled ? disabledColor : checkedColor) : '#d9d9d9';
        return { backgroundColor }
      }
    },
    methods: {
      preventDefault(e) {
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
      },
      handleClick (e) {
        this.preventDefault(e);
        if (this.disabled) return;
        this.checked = !this.checked;
        this.animation();
        this.ballAnimation();
      },
      animation(isInit = false) {
        let el = this.$refs.switchCore;
        // 设置为0.1 解决奇怪的Y轴会覆盖点击问题
        let s = this.checked ? '0.1' : '1';
        animation.transition(el, {
          styles: {
            transform: 'scale(' + s + ')'
          },
          duration: isInit ? 0 : 300,
          timingFunction: 'linear',
          needLayout: false,
          delay: 0
        });
      },
      ballAnimation(isInit = false) {
        let el = this.$refs.switchBall;
        let x = this.checked ? '42px' : '0px';
        animation.transition(el, {
          styles: {
            transform: 'translateX(' + x + ')'
          },
          duration: isInit ? 0 : 300,
          timingFunction: 'linear',
          needLayout: false,
          delay: 0
        }, () => {
          !isInit && this.$emit('onChange', this.checked);
        });
      },
      // android不支持阴影
      initStyle () {
        const platform = weex.config.env.platform.toLowerCase();
        if (platform === 'android') {
          this.ballStyle = {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': '#d9d9d9',
          }
        } else {
          this.ballStyle = {
            'box-shadow': '0 1px 3px rgba(0,0,0,.4)',
            top: '5px'
          }
          if (platform === 'web') {
            this.coreStyle = {
              width: '100px',
              height: '60px',
              'border-radius': '60px',
            }
            this.ballStyle.top = '4px';
          }
        }
      }
    }
  }
</script>
<style scoped>
  .ts-switch {
    position: relative;
    width: 104px;
    height: 64px;
    border-radius: 64px;
    border-width: 1px;
    border-style: solid;
    border-color: #ddd;
    background-color: #d9d9d9;
  }
  .switch-ball {
    position: absolute;
    top: 5px;
    left: 0px;
    z-index: 100;
    height: 52px;
    width: 56px;
    background-color: #fff;
    border-radius: 52px;
  }
  .switch-core {
    position: absolute;
    top: 0;
    width: 102px;
    height: 62px;
    background-color: #fdfdfd;
    border-radius: 62px;
  }
</style>
