<!--
  * 加载中图标
  * @author huangxueqian
  * @version 1.0.0
  * @param loadImg{String} 加载图片
  * @param loadStyle{Object} 加载样式
-->
<template>
  <image :src="loadingImage" :style="loadStyle" class="ts-loading" ref="load"></image>
</template>

<script>
  const animation = weex.requireModule('animation');
  const platform = weex.config.env.platform.toLowerCase();
  const IMAGE_PATH = "/web";
  let bundleBaseUrl = weex.config.bundleUrl;
  export default {
    props: {
      loadImg: {
        type: String,
        default: ''
      },
      loadStyle: {
        type: Object,
        default: () => { return {}}
      }
    },
    data() {
      return {
        imageBaseUrl: ''
      }
    },
    created(){
      this.imageBaseUrl = this.getImageUrl();
    },
    mounted(){
        let self = this;
        let loadEl = self.$refs.load;
        this.$nextTick(function () {
            self.move(loadEl)
        })
    },
    computed: {
      loadingImage() {
        const { loadImg, imageBaseUrl } = this;
        let loadImage = imageBaseUrl + 'common/loading.png';
        if (loadImg !== '') {
          loadImage = loadImg;
        }
        return loadImage;
      }
    },
    methods: {
        getImageUrl() {
          let bundleUrl = bundleBaseUrl,
              isHttp = bundleUrl.indexOf('http') >= 0,
              i = bundleUrl.indexOf('dist'),
              imageUrl;
          const isAndroid = platform === 'android';
              if(isHttp) {
                  if(platform === "web") {
                      let urlArr = bundleUrl.split("://");
                      let startIndex = urlArr[1].indexOf("/");
                      imageUrl = urlArr[0] + "://" + urlArr[1].slice(0, startIndex) + IMAGE_PATH + "/static/images/";
                  } else {
                      imageUrl = bundleUrl.slice(0, i) + (isAndroid ? 'images/': 'images.bundle/')
                  }
              } else {
                  if(platform === "web") {
                      let startIndex = bundleUrl.indexOf("/web/");
                      imageUrl = bundleUrl.slice(0, startIndex) + IMAGE_PATH + "/static/images/";
                  } else {
                      imageUrl = isAndroid ? 'assets:': bundleUrl.slice(0, i ) + 'images.bundle/';
                  }
              }
              return imageUrl;
        },
        move (el) {
          animation.transition(el, {
            styles: {
                transform: 'rotate(360000deg)'
            },
            duration: 1360000, //ms
            timingFunction: 'linear',
            delay: 0 //ms
          })
        }
    }
  }
</script>

<style scoped>
  .ts-loading {
    margin-top: 10px;
    height: 48px;
    width: 48px;
  }
</style>
