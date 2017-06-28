<template>
<section style="overflow: hidden">
  <div class="loginbg">
  </div>
  <div class="loginContent">
    <!--<div class="logo" :style="'background: url('+ logo +') no-repeat center center;background-size:cover;width:350px;height:35px'"></div>-->
    <!--<h1>华信万达资产管理有限公司投资管理系统</h1>-->
    <Form ref="formCustom"
          :model="formCustom"
          :rules="ruleCustom"
          style="margin-top: 20px">
      <Form-item prop="username">
        <!--<input type="text" v-model="formCustom.username" placeholder="输入用户名" autocomplete="off" class="ivu-input">-->
        <Input type="text" v-model="formCustom.username" placeholder="输入用户名" icon="person" @on-focus="handleFocus()" @on-blur="handleBlur()"></Input>
        <ul v-show="usenameBox" class="usernamebox">
          <li v-for="(value, key) in userNameSave" @click="handleLogin(value, key)">{{key}}</li>
        </ul>
        <input type="text" style="display: none">
      </Form-item>
      <Form-item prop="passwd">
        <Input type="password" v-model="formCustom.passwd" placeholder="输入用户密码" icon="locked" @on-enter="handleFocus()"></Input>
      </Form-item>
      <Form-item label="记住密码" prop="savePassword">
        <Checkbox v-model="formCustom.savePassword"></Checkbox>
        <Button type="primary" @click="login('formCustom')" style="float: right">登录</Button>
      </Form-item>
    </Form>
  </div>
  <!--<div class="loginWrap">-->
  <!--<div class="loginLogo" :style="'background: url('+ logo +') no-repeat center center;background-size:cover;width:60px;height:60px'"></div>-->
  <!--<p style="text-align:center;font-size: 18px;height: 30px;margin-left: 20px;margin-bottom: 12px;">-->
  <!--&lt;!&ndash;<span&ndash;&gt;-->
  <!--:style="'background: url('+ logo +') no-repeat center top;display:inline-block;height:30px;width:30px;background-size:cover'"></span>-->
  <!--<span style="display: inline-block;margin-left: 10px" >华信万达资产管理有限公司投资管理系统</span>-->
  <!--</p>-->
  <!--<div class="password">-->
  <!--<Form ref="formCustom"-->
  <!--:model="formCustom"-->
  <!--:rules="ruleCustom"-->
  <!--:label-width="120">-->
  <!--<Row>-->
  <!--<Col span="20">-->
  <!--<Form-item prop="username">-->
  <!--<Input v-model="formCustom.username" placeholder="输入用户名" autocomplete="on"></Input>-->
  <!--</Form-item>-->
  <!--<Form-item prop="passwd" style="margin-top:-20px">-->
  <!--<Input type="password" v-model="formCustom.passwd" placeholder="输入用户密码"></Input>-->
  <!--</Form-item>-->
  <!--<Form-item label="记住密码" prop="savePassword" style="margin-top: -10px;margin-left: 60px">-->
  <!--<Checkbox v-model="single"></Checkbox>-->
  <!--</Form-item>-->
  <!--<Button type="primary" @click="login('formCustom')" style="width: 188px;float: right;margin-top: -30px">登录</Button>-->
  <!--</Col>-->
  <!--</Row>-->
  <!--</Form>-->
  <!--</div>-->
  <!--&lt;!&ndash;<div class="loginFooter" style="padding-top: -30px">&ndash;&gt;-->
  <!--&lt;!&ndash;<Button type="primary" @click="login('formCustom')" style="width: 188px;">登录</Button>&ndash;&gt;-->
  <!--&lt;!&ndash;</div>&ndash;&gt;-->
  <!--</div>-->
</section>
</template>
<script>
//    import logo from '../../assets/image/logo1.png'
    let identitySiteRoot = localStorage.getItem('identitySiteRootSite')
    import { clientId, clientSecret, USERNAMEKEY, STORAGEIDENTITY } from '../../../static/js/config/login-consfig'
    export default {
        name: 'content',
        components: {},
        data () {
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能少于6位'))
                }
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    callback()
                }
            }
            return {
//                logo: logo,
                list: [{name: 1}, {name: 2}],
                ruleCustom: {
                    passwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    username: [
//            {validator: , trigger: 'blur'}
                    ]
                },
                formCustom: {
                    passwd: '',
                    username: '',
                    savePassword: true
                },
                url: identitySiteRoot + '/identity/connect/token',
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: '',
                access_token: '',
                userNameSave: {},
                show: true,
                usenameBox: false
            }
        },
        computed: {},
        mounted: function () {
            $('.ivu-modal-mask').css({
                'z-index': -1
            })
            if (JSON.parse(localStorage.getItem(USERNAMEKEY))) {
                this.userNameSave = JSON.parse(localStorage.getItem(USERNAMEKEY))
            } else {
                this.userNameSave = {}
            }
        },
        watch: {
            'formCustom.savePassword': function (val) {
                let _self = this
                if (val === false) {
                    this.formCustom.passwd = ''
                    delete _self.userNameSave[_self.formCustom.username]
                }
            }
        },
        methods: {
            handleLogin (val, key) {
                let _self = this
                this.formCustom.passwd = val
                this.formCustom.username = key
                _self.usenameBox = false
            },
            handleFocus () {
                this.usenameBox = true
            },
            handleBlur () {
                let _self = this
                setTimeout(function () {
                    _self.usenameBox = false
                }, 200)
            },
            login () {
                var _self = this
                var auth = 'Basic ' + btoa(this.client_id + ':' + this.client_secret)
                var data = {
                    username: this.formCustom.username,
                    password: this.formCustom.passwd,
                    grant_type: 'password',
                    scope: 'openid profile roles rs_userInfo offline_access'
                }
                var datarefresh = {
                    grant_type: 'refresh_token',
                    refresh_token: this.formCustom.passwd
                }
                var body = ''
                if (_self.formCustom.savePassword === true && this.userNameSave[this.formCustom.username] === this.formCustom.passwd) {
                    for (let key in datarefresh) {
                        if (body.length) {
                            body += '&'
                        }
                        body += key + '='
                        body += encodeURIComponent(datarefresh[key])
                    }
                } else {
                    for (let key in data) {
                        if (body.length) {
                            body += '&'
                        }
                        body += key + '='
                        body += encodeURIComponent(data[key])
                    }
                }
                var xhr = new XMLHttpRequest()
                xhr.onload = function (e) {
                    let responseData = JSON.parse(xhr.response)
                    if (xhr.status === 200 && responseData.access_token) {
                        let expiresIn = responseData.expires_in
                        _self.access_token = responseData.access_token
                        // 获取refresh_token并储存用户名
                        _self.refresh_token = responseData.refresh_token
                        if (_self.formCustom.savePassword === true) {
                            _self.userNameSave[_self.formCustom.username] = _self.refresh_token
                        }
                        if (_self.formCustom.savePassword === false && _self.userNameSave[_self.formCustom.username]) {
                            delete _self.userNameSave[_self.formCustom.username]
                        }
                        localStorage.setItem(USERNAMEKEY, JSON.stringify(_self.userNameSave))
                        _self.getUser(_self.access_token, expiresIn)
                    } else {
                        _self.$Modal.error({
                            title: '错误信息',
                            content: '登录名或密码错误，请重试'
                        })
                    }
                }
                xhr.open('POST', this.url)
                xhr.setRequestHeader('Authorization', auth)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.send(body)
            },
            getUser (accessToken, expiresIn) {
                var url = identitySiteRoot + '/identity/connect/userinfo'
                var xhr = new XMLHttpRequest()
                xhr.onload = function (e) {
                    var responseData = JSON.parse(xhr.response)
                    let userProfile = {}
                    userProfile.profile = responseData
                    var timestamp = (new Date()).getTime() / 1000 + expiresIn
                    let user = Object.assign({}, userProfile, {access_token: accessToken}, {expires_at: timestamp})
                    if (xhr.status === 200) {
                        console.log(user)
                        localStorage.setItem(STORAGEIDENTITY, JSON.stringify(user))
                        location.href = './index.html'
                    }
                }
                xhr.open('GET', url)
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
                xhr.send()
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
  .usernamebox{
    z-index: 10000;
    left: 1px;
    position: absolute;
    top: 32px;
    background: #ffffff;
    border: 1px solid #68696d;
  }
  .usernamebox li {
    padding: 2px 3px;
    width: 337px;
  }
  .usernamebox li:hover{
    background: #adb0b9;
  }
  .logo{
    margin-top: 10px;
    z-index: 2000000;
    background: red;
    margin-left: -7px;
  }
  .loginbg{
    opacity: 0.5;
    position: absolute;
    top: 65%;
    left: 50%;
    margin-top: -125px;
    margin-left: -200px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 400px;
    height: 247px;
    padding: 20px 25px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginContent{
    z-index: 1000;
    position: absolute;
    top: 65%;
    left: 50%;
    margin-top: -125px;
    margin-left: -175px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    height: 216px;
    padding: 20px 5px 15px;
    h1{
      padding: 0;
      margin: 0;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
    }
  }
  .loginLogo {
    position: absolute;
    left: 50%;
    z-index: 10000;
    margin-left: -10px;
    margin-top: -80px;
  }
  .loginWrap{
    position: absolute;
    margin-top: -92px;
    top:50%;
    left:50%;
    width:368px;
    margin-left:-194px;
    color:#ffffff;
    font-weight: bold;
    .ivu-form-item {
      .ivu-form-item-label{
        color:#ffffff;
      }
    }
    .loginFooter{
      text-align: center;
      margin-top: -12px;
      margin-left: 60px;
    }
  }
  .loginBox ~ .ivu-modal-mask {
    display: none !important;
  }
  .loginBox .ivu-modal{
    top:200px;

  }
</style>
