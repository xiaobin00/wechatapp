//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
    data: {
      name:"",
      mobile:"",
      userInfo: {}
    },
    onLoad: function (options) {
     if(app.globalData.userInfo){
        this.setData({
          userInfo: app.globalData.userInfo
        })
     }else{
       // 在没有 open-type=getUserInfo 版本的兼容处理
       wx.getUserInfo({
         success: res => {
           app.globalData.userInfo = res.userInfo
           this.setData({
             userInfo: res.userInfo,
             hasUserInfo: true
           })
         }
       })
     }
    },



    nameInput:function(e){
      this.name= e.detail.value
    },
    mobileInput: function (e) {
        this.mobile= e.detail.value
    },
  setPlain:function(){
   
    wx.request({
      url: 'https://3a0dq3as.qcloud.la/weapp/insertPerson',
      data: {
        name: this.name,
        mobile: this.mobile
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
      }
    })
  }
})
