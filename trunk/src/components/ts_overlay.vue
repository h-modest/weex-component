<!--
  * 弹层
  * @author huangxueqian
  * @version 1.0.0
  * @param show{Boolean} 开启打开popup
  * @param left{Number} 向左移动距离
  * @param top{Number} 向上移动距离
  * @param opacity{Number} 蒙层opacity度数0-1
  * @param has-animation{Boolean} 是否开启蒙层出现动画
  * @param can-auto-close{Boolean} 是否可以点击自动关闭
  * @param duration{Number} 蒙层动画时间
  * @param timing-function{Array} ['ease-in','ease-out']
-->
<template>
    <div>
        <div class="ts-overlay"
             ref="ts-overlay"
             v-if="show"
             :hack="shouldShow"
             @click="overlayClicked"
             :style="overlayStyle">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .ts-overlay {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
</style>

<script>
    const animation = weex.requireModule('animation');
    export default {
        props: {
            show: {
                type: Boolean,
                default: true
            },
            hasAnimation: {
                type: Boolean,
                default: true
            },
            duration: {
                type: [Number, String],
                default: 300
            },
            timingFunction: {
                type: Array,
                default: () => (['ease-in', 'ease-out'])
            },
            opacity: {
                type: [Number, String],
                default: 0.6
            },
            canAutoClose: {
                type: Boolean,
                default: true
            },
            navStyle: {
              type: Object,
              default: () => { return {}}
            }
        },
        computed: {
            overlayStyle () {
                return Object.assign({
                    opacity: this.hasAnimation ? 0 : 1,
                    backgroundColor: 'rgba(0, 0, 0, '+ this.opacity + ')'
                }, this.navStyle)
            },
            shouldShow () {
                const { show, hasAnimation } = this;
                hasAnimation && setTimeout(() => {
                    this.appearOverlay(show);
                }, 50);
                return show;
            }
        },
        methods: {
            overlayClicked (e) {
                this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
            },
            appearOverlay (bool, duration = this.duration) {
                const { hasAnimation, timingFunction, canAutoClose } = this;
                const needEmit = !bool && canAutoClose;
                needEmit && (this.$emit('wxcOverlayBodyClicking', {}));
                const overlayEl = this.$refs['ts-overlay'];
                if (hasAnimation && overlayEl) {
                    animation.transition(overlayEl, {
                        styles: {
                            opacity: bool ? 1 : 0
                        },
                        duration,
                        timingFunction: timingFunction[bool ? 0 : 1],
                        delay: 0
                    }, () => {
                        needEmit && (this.$emit('wxcOverlayBodyClicked', {}));
                    });
                } else {
                    needEmit && (this.$emit('wxcOverlayBodyClicked', {}));
                }
            }
        }
    };
</script>
