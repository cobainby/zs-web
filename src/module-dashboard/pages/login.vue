<template>
  <div class="login-container">
    <div class="header">
      <div class="con">
        <h1 class="logo">缀术监测</h1>
        <div class="top-login">
          <img id="erweima1" src="./../assets/images/erweima1.png" />
          <img id="erweima2" src="./../assets/images/erweima2.png" />
          <div id="explain1">公众号</div>
          <div id="explain2">app</div>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="banner-show" id="js_ban_content">
        <div class="cell bns-03">
          <div class="con"></div>
        </div>
        <div class="cell bns-02" style="display:none;">
          <div class="con">
          </div>
        </div>
        <div class="cell bns-01" style="display:none;">
          <div class="con">
          </div>
        </div>
      </div>
      <div class="container">
        <div class="register-box">
          <br>
          <div class="reg-slogan">登录入口</div>
          <div class="reg-form" id="js-form-mobile">
            <br>
            <br>
            <div class="cell">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
            </div>
            <div class="cell">
              <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
            </div>
            <div class="cell vcode">
              <el-input name="yanzhengma" id="yanzhengma" type="text" autoComplete="on" placeholder="请输入验证码" />
              <img/>
            </div>
            <div class="bottom">
              <el-button type="primary" id="loginButton" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="con">
        <div class="copy-right">
          <div class="cell">
            <p> </p>
            <a href="http://www.geekerby.com" style="color:#333">
              <strong>版权所有</strong>
            </a>
            </strong>
            缀术科技监测有限公司 copyright@2018-2025
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
}
body {
  margin: 0;
  font: 12px/1.8 Tahoma, Geneva, "\5B8B\4F53";
  color: #333;
  background: white;
}
input,
textarea,
select {
  margin: 0;
  padding: 0;
  font-size: 12px;
  outline: none;
  resize: none;
}
html:root body,
html:root input,
html:root button,
html:root textarea,
html:root select {
  font-family: Tahoma, Geneva, "\5fae\8f6f\96c5\9ed1", "\5B8B\4F53";
}
form,
ul,
ol,
li,
dl,
dt,
dd,
h1,
h2,
h3,
h4,
h5,
p {
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  text-decoration: none;
  color: #224892;
  outline: none;
}
a:hover {
  text-decoration: underline;
}
a img {
  border: none;
}
i,
em {
  font-style: normal;
}
b {
  color: #f63;
}
button {
  cursor: pointer;
}
button i {
  display: none;
}
.text,
textarea {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border: 1px solid;
  border-color: #cececf;
  border-radius: 0;
  background: white;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
  -webkit-appearance: none;
}
.text:focus,
textarea:focus {
  outline: none;
  border-color: #92afed;
  box-shadow: 0 0 5px #92afec, inset 1px 1px 2px rgba(0, 0, 0, 0.1);
}
.text {
  width: 170px;
  height: 24px;
  padding: 7px 9px;
  line-height: 24px;
}
input.err,
input.err:focus {
  color: #900;
  border-color: #e06341;
  background: #ffefec;
  box-shadow: 0 0 5px #e06341;
}
textarea {
  width: 270px;
  height: 100px;
  padding: 5px 9px;
  line-height: 1.7;
  font-size: 14px;
  overflow: auto;
  resize: none;
}
.button {
  display: inline-block;
  height: 40px;
  padding: 0 15px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-family: "Heiti SC", "\5fae\8f6f\96c5\9ed1", "\9ed1\4f53";
  color: white;
  border: 0 none;
  background-color: #167efb;
  background-repeat: repeat-x;
  background-position: 0 0;
  cursor: pointer;
}
.button:hover {
  text-decoration: none;
  background-color: #1672e3;
}
.button:active {
  background-color: #3482e1;
}
.button .icon {
  position: relative;
  top: 11px;
  vertical-align: top;
  font-weight: normal;
}
.button span {
  position: relative;
  top: 11px;
  display: inline-block;
  height: 16px;
  line-height: 16px;
  vertical-align: top;
  padding-left: 8px;
}
.button em {
  display: none;
}
.btn-gray {
  color: #666;
  background-color: #eee;
}
.btn-gray:hover {
  background-color: #ddd;
}
.btn-gray:active {
  background-color: #e7e7e7;
}
.btn-green {
  height: 50px;
  line-height: 50px;
  background-color: #9ed04d;
}
.btn-green:hover {
  background-color: #76bf48;
}
.btn-green:active {
  background-color: #51b73d;
}
.btn-disabled,
.btn-disabled:hover,
.btn-disabled:active {
  background-color: #e7e7e7;
  color: #a1a1a1;
  cursor: not-allowed;
}
button.button {
  height: 40px;
  padding: 0 10px;
  line-height: normal;
}

/*=================当屏幕大小宽度超过640小于1400时====================*/
@media (min-width: 640px)and (max-width:1399px) {
  .header {
    position: relative;
    z-index: 3;
    min-width: 980px;
    height: 70px;
  }
  .header .con {
    position: relative;
    width: 980px;
    height: 60px;
    margin: auto;
  }
  h1.logo {
    position: absolute;
    top: 10px;
    left: 100px;
    width: 400px;
    height: 64px;
    line-height: 20;
    overflow: hidden;
    font-size: 12px;
    background: url(./../assets/images/logo2.png) no-repeat;
    background-size: 280px 50px;
  }
  .top-login {
    position: absolute;
    top: 5px;
    right: 50px;
    zoom: 1;
    text-align: center;
    font-size: 9px;
  }
  .top-login #erweima1 {
    width: 60px;
    height: 60px;
    margin-bottom: 12px;
    margin-right: 20px;
  }
  .top-login #erweima2 {
    width: 55px;
    height: 55px;
    margin-bottom: 14px;
  }
  .top-login #explain1 {
    width: 60px;
    margin-top:-21px;
  }
  .top-login #explain2 {
    width: 55px;
    float: right;
    margin-top:-15px;
  }
  .wrap {
    position: relative;
    z-index: 0;
    height: 420px;
  }
  .banner-show {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    min-width: 980px;
    height: 100%;
    overflow: hidden;
  }
  .banner-show .cell {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-repeat: repeat-x;
    background-position: center top;
  }
  .banner-show .cell .con {
    position: relative;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center top;
  }
  .bns-01 {
    background-image: url(./../assets/images/banner_01_repeat.png);
  }
  .bns-01 .con {
    background-image: url(./../assets/images/banner_01.gif);
  }
  .bns-02 {
    background-image: url(./../assets/images/banner_02_repeat.gif);
  }
  .bns-02 .con {
    background-image: url(./../assets/images/banner_02.gif);
  }
  .bns-03 .con {
    background-size: 900px 420px;
    background-image: url(./../assets/images/background.png);
  }
  .container {
    position: relative;
    top: 420px;
    z-index: 2;
    width: 980px;
    height: 0;
    margin: auto;
  }
  .register-box {
    position: absolute;
    top: -383px;
    right: 66px;
    width: 220px;
    height: 270px;
    background: white;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.95);
  }
  .reg-slogan {
    margin-top: 10px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    font-size: 14px;
  }
  .reg-form {
    width: 175px;
    height: 150px;
    margin: auto;
  }
  .reg-form .cell {
    position: relative;
    height: 26px;
    margin-bottom: 14px;
    zoom: 1;
  }
  .reg-form .cell label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 0 12px;
    line-height: 25px;
    font-size: 16px;
    color: #999;
    font-weight: bold;
    cursor: text;
  }
  .reg-form .cell input {
    position: absolute;
    width: 165px;
    height: 26px;
    font-size: 16px;
    background: none;
  }
  .reg-form .vcode .el-input {
    width: 90px;
  }
  .reg-form .vcode img {
    background: url(./../assets/images/yanzhengma.jpg);
    position: absolute;
    top: 0;
    left: 100px;
    width: 70px;
    height: 34px;
  }
  .reg-form .vcode span {
    position: absolute;
    top: 0;
    left: 264px;
    line-height: 40px;
    font-size: 14px;
  }
  .reg-form .user-agreement {
    height: 16px;
    margin-top: -22px;
    padding: 18px 0;
    line-height: 16px;
  }
  .reg-form .user-agreement input {
    float: left;
    width: 14px;
    height: 14px;
    margin: 1px 5px 0 0;
  }
  .reg-form .bottom {
    height: 26px;
  }
  .reg-form .bottom #loginButton {
    display: block;
    border-radius: 3px;
    height: 26px !important;
    padding: 0 !important;
  }
  .footer {
    padding: 25px 0;
  }
  .copy-right {
    width: 980px;
    margin: auto;
    text-align: center;
    color: #999;
  }
  .copy-right .cell {
    position: relative;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    margin: 20px auto 100px auto;
    clear: both;
  }
}
@media (min-width: 1400px) {
  .header {
    position: relative;
    z-index: 3;
    min-width: 980px;
    height: 100px;
  }
  .header .con {
    position: relative;
    width: 980px;
    height: 80px;
    margin: auto;
  }
  h1.logo {
    position: absolute;
    top: 15px;
    left: -100px;
    width: 400px;
    height: 64px;
    line-height: 20;
    overflow: hidden;
    font-size: 12px;
    background: url(./../assets/images/logo2.png) no-repeat 0 0;
  }
  .top-login {
    position: absolute;
    top: 5px;
    right: -100px;
    zoom: 1;
    text-align: center;
  }
  .top-login #erweima1 {
    width: 84px;
    height: 84px;
    margin-bottom: 12px;
    margin-right: 20px;
  }
  .top-login #erweima2 {
    width: 75px;
    height: 75px;
    margin-bottom: 14px;
  }
  .top-login #explain1 {
    width: 80px;
    margin-top: -25px;
  }
  .top-login #explain2 {
    width: 80px;
    float: right;
    margin-top: -20px;
  }
  .wrap {
    position: relative;
    z-index: 0;
    height: 600px;
  }
  .banner-show {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    min-width: 980px;
    height: 100%;
    overflow: hidden;
  }
  .banner-show .cell {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-repeat: repeat-x;
    background-position: center top;
  }
  .banner-show .cell .con {
    position: relative;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center top;
  }
  .bns-01 {
    background-image: url(./../assets/images/banner_01_repeat.png);
  }
  .bns-01 .con {
    background-image: url(./../assets/images/banner_01.gif);
  }
  .bns-02 {
    background-image: url(./../assets/images/banner_02_repeat.gif);
  }
  .bns-02 .con {
    background-image: url(./../assets/images/banner_02.gif);
  }
  .bns-03 .con {
    background-image: url(./../assets/images/background.png);
  }
  .container {
    position: relative;
    top: 600px;
    z-index: 2;
    width: 980px;
    height: 0;
    margin: auto;
  }
  .register-box {
    position: absolute;
    top: -530px;
    right: -85px;
    width: 316px;
    height: 380px;
    background: white;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.95);
  }
  .reg-slogan {
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
  }
  .reg-form {
    width: 262px;
    height: 224px;
    margin: auto;
  }
  .reg-form .cell {
    position: relative;
    height: 40px;
    margin-bottom: 22px;
    zoom: 1;
  }
  .reg-form .cell label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 0 12px;
    line-height: 40px;
    font-size: 16px;
    color: #999;
    font-weight: bold;
    cursor: text;
  }
  .reg-form .cell input {
    position: absolute;
    top: 0;
    left: 0;
    width: 304px;
    padding: 7px 11px;
    font-size: 16px;
    background: none;
  }
  .reg-form .vcode .el-input {
    width: 140px;
  }
  .reg-form .vcode img {
    background: url(./../assets/images/yanzhengma.jpg);
    position: absolute;
    top: 0;
    left: 150px;
    width: 110px;
    height: 36px;
  }
  .reg-form .vcode span {
    position: absolute;
    top: 0;
    left: 264px;
    line-height: 40px;
    font-size: 14px;
  }
  .reg-form .user-agreement {
    height: 16px;
    margin-top: -22px;
    padding: 18px 0;
    line-height: 16px;
  }
  .reg-form .user-agreement input {
    float: left;
    width: 14px;
    height: 14px;
    margin: 1px 5px 0 0;
  }
  .reg-form .bottom {
    height: 40px;
  }
  .reg-form .bottom .button {
    display: block;
    border-radius: 3px;
  }
  .footer {
    padding: 25px 0;
  }
  .copy-right {
    width: 980px;
    margin: auto;
    text-align: center;
    color: #999;
  }
  .copy-right .cell {
    position: relative;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    margin: 20px auto 100px auto;
    clear: both;
  }
}
.copy-right a {
  color: #999;
}
.copy-right a:hover {
  color: #333;
}
</style>
<script>
import loginSocialSignin from "./../components/loginSocialSignin";
import shajs from "sha.js";

export default {
  components: {},
  name: "login",
  data() {
    return {
      backPicHeight: window.innerHeight - 280,
      loginForm: {
        username: "",
        password: "",
        ip: ""
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
      },
      passwordType: "password",
      loading: false,
      showDialog: false
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    getIp(callback) {
      debugger;
      var ip_dups = {};

      //compatibility for firefox and chrome
      var RTCPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;

      //bypass naive webrtc blocking
      if (!RTCPeerConnection) {
        var iframe = document.createElement("iframe");
        //invalidate content script
        iframe.sandbox = "allow-same-origin";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        var win = iframe.contentWindow;
        window.RTCPeerConnection = win.RTCPeerConnection;
        window.mozRTCPeerConnection = win.mozRTCPeerConnection;
        window.webkitRTCPeerConnection = win.webkitRTCPeerConnection;
        RTCPeerConnection =
          window.RTCPeerConnection ||
          window.mozRTCPeerConnection ||
          window.webkitRTCPeerConnection;
      }

      //minimal requirements for data connection
      var mediaConstraints = {
        optional: [{ RtpDataChannels: true }]
      };

      //firefox already has a default stun server in about:config
      //    media.peerconnection.default_iceservers =
      //    [{"url": "stun:stun.services.mozilla.com"}]
      var servers = undefined;

      //add same stun server for chrome
      if (window.webkitRTCPeerConnection)
        servers = { iceServers: [{ urls: "stun:stun.services.mozilla.com" }] };

      //construct a new RTCPeerConnection
      var pc = new RTCPeerConnection(servers, mediaConstraints);

      //listen for candidate events
      pc.onicecandidate = function(ice) {
        //skip non-candidate events
        if (ice.candidate) {
          //match just the IP address
          var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
          var ip_addr = ip_regex.exec(ice.candidate.candidate)[1];

          //remove duplicates
          if (ip_dups[ip_addr] === undefined) callback(ip_addr);

          ip_dups[ip_addr] = true;
        }
      };

      //create a bogus data channel
      pc.createDataChannel("");

      //create an offer sdp
      pc.createOffer(
        function(result) {
          //trigger the stun server request
          pc.setLocalDescription(result, function() {}, function() {});
        },
        function() {}
      );
    },
    handleLogin() {
      // console.log(shajs('sha256').update(this.loginForm.password).digest('hex'))
      debugger;
      this.loading = true;
      this.$store
        .dispatch("LoginByUsername", {
          username: this.loginForm.username,
          password: this.loginForm.password,
          ip: this.loginForm.ip
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ path: "/" }); //登录成功后重定向到首页
        })
        .catch(() => {
          this.loading = false;
        });
    },
    afterQRScan() {}
  },
  created() {
    //获取IP地址
    var _this = this;
    this.getIp(function(ip) {
      debugger;
      _this.loginForm.ip = ip;
    });
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
};
</script>

