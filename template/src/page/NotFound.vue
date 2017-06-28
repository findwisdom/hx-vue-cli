<template>
  <div class="box box-warning">
    <Card class="box-error">
      <p slot="title">对不起, 你访问的页面不存在!</p>
      <p class="no-top">可能是如下原因引起了这个错误:</p>
      <ul>
        <li>URL输入错误</li>
        <li>链接已失效</li>
        <li>其他原因...</li>
      </ul>
    </Card>
    <div id="error">
      <div id="pacman" class="pacman_eats"></div>
    </div>
  </div>
</template>
<script>
  setInterval(function () {
    $('#pacman').toggleClass('pacman_eats')
  }, 300)
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .box-warning{
    width:680px;
    margin:0px auto;
    margin-top:80px;
  }
  .box-error{
    .no-top{
      font-size:16px;
      margin-bottom:12px;
    }
    ul{
      li{
        list-style: disc;
        margin-left:20px;
        font-size:14px;
        padding:2px 0px;
      }
    }
    .ivu-card-head{
      background: #12609d;
      p{
        color:#fff!important;
      }
    }
  }
  #error {
    background:transparent url('../assets/image/404e.png') right 35px no-repeat;
    width:680px;
    height:280px;
    position:relative;
    margin:0 auto;
  }
  #error #pacman {
    width:207px;
    height:207px;
    position:absolute;
    left:0px;
    top:16px;
    background:transparent url('../assets/image/pacman_eats.png') 0 0 no-repeat;
    animation:eats 2s linear 0s infinite alternate;
    -moz-animation:eats 2s linear 0s infinite alternate;
    -webkit-animation:eats 2s linear 0s infinite alternate;
    -ms-animation:eats 2s linear 0s infinite alternate;
  }
  .pacman_eats {
    background:transparent url('../assets/image/pacman_eats.png') 0 -207px no-repeat!important;
  }

  @-webkit-keyframes eats {
    from {
      left:0px; top:16px;
    }
    to {
      left:280px; top:16px;
    }
  }
  @-moz-keyframes eats {
    from {
      left:0px; top:16px;
    }
    to {
      left:200px; top:16px;
    }
  }
  @-ms-keyframes eats {
    from {
      left:0px; top:16px;
    }
    to {
      left:200px; top:16px;
    }
  }
  @keyframes eats {
    from {
      left:0px; top:16px;
    }
    to {
      left:200px; top:16px;
    }
  }
</style>
