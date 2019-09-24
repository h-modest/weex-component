<!--
  * 弹层
  * @author huangxueqian
  * @version 1.0.0
  * @param show{Boolean} 开启打开popup
  * @param pos{String} 出来位置top/bottom/left/right
  * @param height{String} 弹出层的高度(向上向下时候设置)
  * @param width{String} 弹出层的宽度(向左向右时候设置)
  * @param popup-color{String} 弹出层的颜色
  * @param stand-out{Number} 突出边框高度
  * @param animation{Object} 自定义面板动画
  * {timingFunction: 'ease-in'}
  * @param overlay-cfg{Object} ts-overlay配置参数
  * @function tsPopupCancel 回调弹出层取消方法
-->
<template>
  <div @touchstart="preventDefault">
    <div @touchend="handleTouchEnd">
      <ts-overlay :show="haveOverlay && isOverShow"
                   v-if="show"
                   ref="overlay"
                   v-bind="overlayCfg"
                   @wxcOverlayBodyClicking="wxcOverlayBodyClicking"></ts-overlay>
    </div>
    <div ref="ts-popup"
         v-if="show"
         :height="_height"
         :hack="isNeedShow"
         @click="()=>{}"
         :class="['ts-popup', pos]"
         :style="padStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .wx-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }
  .ts-popup {
    position: fixed;
    /* width: 750px; */
    z-index: 10001;
  }
  .top {
    left: 0;
    right: 0;
  }
  .bottom {
    left: 0;
    right: 0;
  }
  .left {
    bottom: 0;
    top: 0;
  }
  .right {
    bottom: 0;
    top: 0;
  }
</style>

<script>
  const animation = weex.requireModule('animation');
  const { platform } = weex.config.env;
  const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';
  import TsOverlay from './ts_overlay';
  export default {
    components: { TsOverlay },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      pos: {
        type: String,
        default: 'bottom'
      },
      popupColor: {
        type: String,
        default: '#FFFFFF'
      },
      overlayCfg: {
        type: Object,
        default: () => ({
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
        })
      },
      height: {
        type: [Number, String],
        default: 840
      },
      standOut: {
        type: [Number, String],
        default: 0
      },
      width: {
        type: [Number, String],
        default: 750
      },
      animation: {
        type: Object,
        default: () => ({
          timingFunction: 'ease-in'
        })
      }
    },
    data: () => ({
      haveOverlay: true,
      isOverShow: true
    }),
    computed: {
      isNeedShow() {
        setTimeout(() => {
          this.appearPopup(this.show);
        }, 50);
        return this.show;
      },
      _height() {
        this.appearPopup(this.show, 150);
        return this.height;
      },
      padStyle() {
        const { pos, width, height, popupColor, standOut } = this;
        const stand = parseInt(standOut, 10);
        let style = {
          backgroundColor: popupColor
        };
        let styleNew = new Object;
        pos === 'top' && (styleNew = {
          top: (-height + stand) + 'px',
          height: height + 'px',
          left: '0px',
          right: '0px'
        });
        pos === 'bottom' && (styleNew = {
          bottom: (-height + stand) + 'px',
          height: height + 'px',
          left: '0px',
          right: '0px'
        });
        pos === 'left' && (styleNew = {
          left: (-height + stand) + 'px',
          width: width + 'px',
        });
        pos === 'right' && (styleNew = {
          right:  (-height + stand) + 'px',
          width: width + 'px',
        });
        return Object.assign(style, styleNew);
      }
    },
    methods: {
      preventDefault(e) {
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
      },
      handleTouchEnd(e) {
        // 在支付宝上面有点击穿透问题
        const { platform } = weex.config.env;
        platform === 'Web' && e.preventDefault && e.preventDefault();
      },
      hide() {
        this.appearPopup(false);
        this.$refs.overlay.appearOverlay(false);
      },
      wxcOverlayBodyClicking() {
        this.isShow && this.appearPopup(false);
      },
      appearPopup(bool, duration = 300) {
        this.isShow = bool;
        const popupEl = this.$refs['ts-popup'];
        if (!popupEl) {
          return;
        }
        animation.transition(popupEl, {
          styles: {
            transform: this.getTransform(this.pos, this.width, this.height, !bool)
          },
          duration,
          delay: 0,
          animation: this.animation
        }, () => {
          if (!bool) {
            this.$emit('tsPopupCancel', { pos: this.pos });
          }
        });
      },
      getTransform(pos, width, height, bool) {
        let _size = pos === 'top' || pos === 'bottom' ? height : width;
        bool && (_size = 0);
        let _transform;
        switch (pos) {
          case 'top':
            _transform = 'translateY('+_size+'px)';
            break;
          case 'bottom':
            _transform = 'translateY(-'+_size+'px)';
            break;
          case 'left':
            _transform = 'translateX('+_size+'px)';
            break;
          case 'right':
            _transform = 'translateX(-'+_size+'px)';
            break;
        }
        return _transform;
      }
    }
  }
</script>
