const platform = weex.config.env.platform.toLowerCase();

export default {
  created() {
    if (platform === 'web' && typeof this.layoutSubviews === 'function') {
      this.initResize();
    }
  },
  methods: {
    /**
      * @function 回退上一个页面
    */
    goback() {
      const navigator = weex.requireModule('navigator');
      navigator.pop();
    },
    initResize() {
      const self = this;
      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
          const { scale, userAgent } = weex.config.env;
          let width = 0,
              height = 0,
              screenWidth = window.screen.width/scale,
              screenHeight=window.screen.height/scale;
        if (window.orientation === 180 || window.orientation === 0) {
          console.log("竖屏");
          width = screenWidth;
          height = screenHeight;
          self.layoutSubviews({ tsResult: {width, height}});
        }
        if (window.orientation === 90 || window.orientation === -90 ){
          console.log("横屏");
          width = screenWidth;
          height = screenHeight;
          if (userAgent.indexOf('Android') === -1) {
            width = screenHeight;
            height = screenWidth;
          }
          self.layoutSubviews({ tsResult: {width, height}});
        }
      }, false);
    },
  }
}
