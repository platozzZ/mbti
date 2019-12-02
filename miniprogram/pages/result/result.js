// pages/result/result.js
var that
Page({
  data: {
    art:'',
  },
  onLoad(options) {
    that = this
    console.log(options)
    // mbtiResult
    // mbtiResults
    let mbtiResult = options.mbtiResult
    // let mbtiResults = options.mbtiResults
    let mbtiResults = decodeURIComponent(options.mbtiResults);
    // let thirdid = decodeURIComponent(options.thirdids);
    let data = JSON.parse(mbtiResults);
    console.log(data)
    that.setData({
      art: data
    })
  },
  onShareAppMessage: function (options) {
    console.log(options)
    // console.log(app.globalData)
    return {
      title: app.globalData.shareTitle ? app.globalData.shareTitle : '经营民宿用宿宝，订单翻倍涨',
      path: "/pages/home/home",
      imageUrl: app.globalData.shareImg ? app.globalData.shareImg : 'https://magisubao.oss-cn-beijing.aliyuncs.com/images/public/subao01.png',
      success: function (res) {
        console.log('onShareAppMessage  success:', res)
      },
      fail: function (res) {
        console.log('onShareAppMessage  fail:', res)
      }
    }
  }
})