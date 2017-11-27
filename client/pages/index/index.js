//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
    data: {
        name:'',
        mobile:'',
        avatarUrl: getApp().globalData.avatarUrl
    },
    onLoad: function (options) {
      var that = this;
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var userInfo = res.userInfo
                getApp().globalData.nickName = userInfo.nickName
                getApp().globalData.avatarUrl = userInfo.avatarUrl
                getApp().globalData.gender = userInfo.gender //性别 0：未知、1：男、2：女
                getApp().globalData.province = userInfo.province
                getApp().globalData.city = userInfo.city
                getApp().globalData.country = userInfo.country
                that.setData({
                  avatarUrl: getApp().globalData.avatarUrl
                })
                util.showSuccess("登录成功");
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    },
    setimageData:function(){
      this.setData({
        avatarUrl: getApp().globalData.avatarUrl
      })
    },
    nameInput:function(e){
      this.setData({
       name: e.detail.value
      })
    },
    mobileInput: function (e) {
      this.setData({
        mobile: e.detail.value
      })
    },
  setPlain:function(){
    util.showSuccess('用户名为:' + this.data.name + ",手机号码为：" + this.data.mobile)
  }
})
