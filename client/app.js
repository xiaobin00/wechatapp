//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')
App({
  globalData: {
   userInfo:null
  },
  onLaunch: function () {
      var that = this;
      qcloud.setLoginUrl(config.service.loginUrl)
      wx.login({
        success:res =>{
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      wx.getSetting({
        success:res =>{
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:res =>{
                this.globalData.userInfo = res.userInfo
                if (this.userInfoReadyCallback){
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })

      
    },
})