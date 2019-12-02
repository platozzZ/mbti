const app = getApp()
const mbti = require('../../utils/mbti.js')
let that
Page({
  data: {
    swiperHeight: 0,
    swiperList: [
      { url: '/images/banner01.jpeg' },
      { url: '/images/banner02.jpeg' },
    ]
  },
  onLoad: function (options) {
    that = this
    that.onGetOpenid()
    mbti.main().then((res) => {
      console.log(res)
    })
  },
  onShow: function () {

  },
  toUserInfo(){
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },
  imgLoad(e){
    console.log(e)
    let imgwidth = e.detail.width
    let screenWidth = app.globalData.screenWidth
    let imgHeight = e.detail.height
    let thisHeight = screenWidth / imgwidth * imgHeight
    console.log(thisHeight)
    that.setData({
      swiperHeight: thisHeight
    })
  },
  
  getPhoneNumber(e) {
    console.log(e)
    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        content: '不能获取手机号码',
        showCancel: false
      })
      return;
    }
    wx.showLoading({
      title: '获取手机号中...',
    })
    wx.cloud.callFunction({
      name: 'getToken',  // 对应云函数名
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionCode: app.globalData.sessionCode    // 这个通过wx.login获取，去了解一下就知道。这不多描述
      },
      success: res => {
        console.log(res)
        wx.hideLoading()
        wx.navigateTo({
          url: '../userInfo/userInfo',
        })
        // 成功拿到手机号，跳转首页
        // wx.switchTab({
        //   url: '../index/index' // 这里是要跳转的路径
        // })
      },
      fail: err => {
        console.error(err);
        wx.showToast({
          title: '获取手机号失败',
          icon: 'none'
        })
      }
    })
  },
  // getPhoneNumber: function (e) {
  //   var that = this;
  //   if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
  //     wx.showModal({
  //       content: '不能获取手机号码',
  //       showCancel: false
  //     })
  //     return;
  //   }
  //   wx.showLoading({
  //     title: '获取手机号中...',
  //   })
  //   wx.cloud.callFunction({
  //     name: 'getToken',  // 对应云函数名
  //     data: {
  //       encryptedData: e.detail.encryptedData,
  //       iv: e.detail.iv,
  //       sessionCode: app.globalData.sessionCode    // 这个通过wx.login获取，去了解一下就知道。这不多描述
  //     },
  //     success: res => {
  //       wx.hideLoading()
  //       // 成功拿到手机号，跳转首页
  //       wx.switchTab({
  //         url: '../index/index' // 这里是要跳转的路径
  //       })
  //     },
  //     fail: err => {
  //       console.error(err);
  //       wx.showToast({
  //         title: '获取手机号失败',
  //         icon: 'none'
  //       })
  //     }
  //   })
  // },
  onGetOpenid: function () {
    wx.showLoading({
      title: '',
    })
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res)
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.hideLoading()
        
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })
  },
})