<template>
  <div>
    <Row :gutter="60">
      <Col span="8">
      <div class="card-body" style="background:#00a65a;" @click="routerChange('test')">
        <div class="left">
          <Icon type="pull-request" size="50" color="#fff"></Icon>
        </div>
        <div class="right">
          <div class="card-name">流程图</div>
          <div class="card-desc">测试页面</div>
        </div>
      </div>
      </Col>
      <Col span="8">
      <div class="card-body" style="background:#f39c12;" @click="routerChange('test1')">
        <div class="left">
          <Icon type="home" size="50" color="#fff"></Icon>
        </div>
        <div class="right">
          <div class="card-name">产品筛选</div>
          <div class="card-desc">我的产品、关注、筛选</div>
        </div>
      </div>
      </Col>
      <Col span="8">
      <div class="card-body" style="background:#39cccc;">
        <div class="left">
          <Icon type="home" size="50" color="#fff"></Icon>
        </div>
        <div class="right">
          <div class="card-name">产品筛选</div>
          <div class="card-desc">我的产品、关注、筛选</div>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    components: {},
    methods: {
      routerChange (router) {
        this.$router.push({name: router})
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .ivu-col-span-6 {
    min-width: 200px;
  }

  .card-body {
    cursor: pointer;
    margin: 8px 0px;
    background: rgb(45, 140, 240);
    overflow: hidden;
    border-radius: 3px;
    padding: 16px 8px;
    min-width: 200px;
    .left {
      width: 30%;
      height: 100%;
      float: left;
      text-align: center;
      vertical-align: middle;
    }
    .right {
      float: left;
      color: #fff;
      .card-name {
        font-size: 25px;
      }
    }
  }

  /* Icon Pulse Grow */
  @-webkit-keyframes card-body {
    to {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
  }
  @keyframes card-body {
    to {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
  }
  .card-body {
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
    position: relative;
  }
  .card-body .ivu-icon {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  .card-body:hover .ivu-icon, .card-body:focus .ivu-icon, .card-body:active .ivu-icon{
    -webkit-animation-name: card-body;
    animation-name: card-body;
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }
  .card-body:hover{
    .ivu-icon{
      color:#000!important;
    }
    .card-name{
      color:#000!important;
    }
    .card-desc{
      color:#000!important;
    }
  }
</style>
