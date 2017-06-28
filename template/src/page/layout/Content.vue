<template>
  <div class="content-wrapper">
    <div class="layout-content" ref="layout">
      <div>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        screenHeight: document.documentElement.clientHeight,
        screenWidth: document.documentElement.clientWidth
      }
    },
    watch: {
      screenHeight (val) {
        if (!this.timer) {
          this.screenHeight = val
          this.timer = true
          let _self = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            _self.timer = false
          }, 200)
        }
      },
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let _self = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            _self.timer = false
          }, 200)
        }
      }
    },
    mounted: function () {
      let _self = this
      window.onresize = () => {
        return (() => {
          _self.screenHeight = document.documentElement.clientHeight
          _self.$refs.layout.style.cssText += 'min-height:' + Number(_self.screenHeight - 130) + 'px !important'
//                _self.$refs.layout.style.cssText += 'width:' + Number(_self.screenWidth - 260) + 'px !important'
        })()
      }
//        _self.$refs.layout.style.cssText += 'width:' + Number(_self.screenWidth - 260) + 'px !important'
      _self.$refs.layout.style.cssText += 'min-height:' + Number(_self.screenHeight - 130) + 'px !important'
    },
    computed: {
    },
    methods: {
    }
  }
</script>
<style>
  .layout-content{
    overflow: visible!important;
  }
</style>
