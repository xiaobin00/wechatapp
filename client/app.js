//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')
App({
  globalData: {
   userInfo:null,
   logged: false,
   takeSession: false,
   requestResult: ''
  },
  onLaunch: function () {
      var that = this;
      qcloud.setLoginUrl(config.service.loginUrl)
      /*wx.login({
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
      })*/

      // 调用登录接口
      qcloud.login({
        success(result) {
          if (result) {
            util.showSuccess('登录成功')
            that.globalData.userInfo= result,
              logged= true
          } else {
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            qcloud.request({
              url: config.service.requestUrl,
              login: true,
              success(result) {
                util.showSuccess('登录成功')
                that.globalData.userInfo= result.data.data,
                  that.globalData.logged= true
              },

              fail(error) {
                util.showModel('请求失败', error)
                console.log('request fail', error)
              }
            })
          }
        },

        fail(error) {
          util.showModel('登录失败', error)
          console.log('登录失败', error)
        }
      })

      
    },
})