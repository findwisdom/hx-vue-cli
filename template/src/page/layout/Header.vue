<template>
  <div class="layout-header">
    <i-button type="text" @click="MenuClick" class="navicon-icon-button">
      <Icon type="navicon" size="24" class="navicon-icon" style="font-weight: bold"></Icon>
    </i-button>
    <span class="project-head">华信微信业务管理系统</span>
    <!--<span class="logo"></span>-->
    <!--<span class="project-head">微信业务系统（WMS)</span>-->
    <person></person>
  </div>
</template>
<script>
  import person from '../../components/person/person.vue'
  export default {
    data () {
      return {
        message: 1
      }
    },
    computed: {},
    methods: {
      MenuClick () {
        this.$emit('toggleClick')
      }
    },
    components: {
      'person': person
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .layout-header {
    position: relative;
    min-width:700px;
  }

  .navicon-icon-button {
    color: #fff;
    margin-top: -7px;
  }

  .project-head {
    letter-spacing: 2px;
    color: #fff;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    margin-left: 30px;
  }

  .logo {
    margin-left: 40px;
    position: absolute;
    top: 5px;
    display: inline-block;
    height: 50px;
    width: 158px;
    background: url("../../assets/image/logo.png") no-repeat center center;
    background-size: cover;
  }
</style>
