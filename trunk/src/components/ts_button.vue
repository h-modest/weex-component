<template>
  <div class="ts-button" @click="handleClick" :style="buttonStyle">
    <text class="ts-button-text" :style="textStyle">
        <slot></slot>
    </text>
  </div>
</template>
<script>
    export default {
      props: {
          width: {
              type: [Number, String],
              default: ''
          },
          height: {
              type: [Number, String],
              default: 90
          },
          borderRadius: {
              type: [Number, String],
              default: 12
          },
          disabled: {
              type: Boolean,
              default: false
          },
          disableOnPromise: {
              type: Function
          },
          navStyle: {
              type: Object,
              default: () => { return {}}
          },
          defualtBgColor: {
            type: String,
            default: '#027FF3'
          },
          disabledBgColor: {
              type: String,
              default: 'rgba(0, 0, 0, 0.1)'
          },
          textStyle: {
            type: Object,
            default: () => { return {}}
          }
      },
      data () {
          return {
              promiseDisabled: false,
              bgColor: ''
          }
      },
      created () {
          const { disabled, defualtBgColor } = this;
          this.promiseDisabled =disabled;
          this.bgColor = defualtBgColor;
      },
      watch: {
          'disabled': function () {
              this.btnStyle(this.disabled);
          }
      },
      computed: {
        buttonStyle() {
          const { width, height, borderRadius, bgColor, disabledBgColor, disabled } = this;
          const btnBorderRadius = this.getSize(borderRadius);
          const btnHeight = this.getSize(height);
          const baseCss = {
              height: btnHeight,
              'border-top-left-radius': btnBorderRadius,
              'border-top-right-radius': btnBorderRadius,
              'border-bottom-left-radius': btnBorderRadius,
              'border-bottom-right-radius': btnBorderRadius,
              'background-color': bgColor
          };
          let style = Object.assign(baseCss, this.navStyle);
          if (width) {
            const widthObj = { width: this.getSize(width)};
            style = Object.assign(style, widthObj);
          }
          if(disabled){
              style['background-color'] = disabledBgColor
          }
          return style;
        }
      },
      methods: {
          getSize(val) {
            let value = val;
            if (typeof val === 'number') {
              value+= 'px';
            }
            return value;
          },
          preventDefault(e) {
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
          },
          handleClick (e) {
            this.preventDefault(e);
            if (this.disabled || this.promiseDisabled) return;
            if (this.disableOnPromise) {
                const _promise = this.disableOnPromise();
                this.disablePromise(_promise);
            } else {
                this.$emit('onClick', e);
            }
          },
          disablePromise (_promise) {
            const self = this;
            self.btnStyle(true);
            setTimeout(() => {
              self.btnStyle(false);
            }, 2000);
          },
          btnStyle (disabled) {
            const { disabledBgColor, defualtBgColor } = this;
            this.promiseDisabled = disabled;
            this.bgColor = disabled ? disabledBgColor : defualtBgColor;
          },
      }
    }
</script>

<style>
  .ts-button {
    left: 0px;
    right: 0px;
    background-color: #4676FF;
    align-items: center;
    justify-content: center;
  }
  .ts-button-text {
      color: #ffffff;
      font-size: 28px;
  }
</style>
