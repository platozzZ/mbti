const app = getApp()
// const api = require('../../utils/request.js')
import WxValidate from '../../utils/WxValidate'
var that
Page({
  data: {
    region: ['北京', '安徽', "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾"],
    regionIndex: 0,
    username: "testtest", 
    province: "", 
    grade: "一年级", 
    mobile: "18888888888"
  },
  onLoad(options) {
    that = this
    console.log(that.data.region)
    that.initValidate()
  },
  formSubmit(e) {
    console.log(e)
    let data = e.detail.value
    if (!that.WxValidate.checkForm(data)) {
      const error = that.WxValidate.errorList[0]
      console.log(error)
      that.showToast(error.msg)
      return false
    } else {
      that.onAdd(data)
    }
    
  },
  onAdd(e) {
    console.log(e)
    const db = wx.cloud.database()
    db.collection('yibei').add({
      data: e,
      success: res => {
        console.log(res)
        wx.navigateTo({
          url: '../answer/answer',
        })
        // 在返回结果中会包含新创建的记录的 _id
        // this.setData({
        //   counterId: res._id,
        //   count: 1
        // })
        // wx.showToast({
        //   title: '新增记录成功',
        // })
        // console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  bindPickerChange(e) {
    console.log(e)
    that.setData({
      regionIndex: e.detail.value
    })
  },
  showToast(e) {
    wx.showToast({
      title: e,
      icon: 'none',
      mask: true,
      duration: 2000
    })
  },
  initValidate(){
    let rules = {
      username: {
        required: true,
      },
      province: {
        required: true,
      },
      grade: {
        required: true,
      },
      mobile: {
        required: true,
        tel: true,
      },
    }
    let messages = {
      username: {
        required: '请输入姓名',
      },
      province: {
        required: '请选择省份',
      },
      grade: {
        required: '请输入年级',
      },
      mobile: {
        required: '手机号不能为空',
        tel: '请输入正确的手机号',
      },
    }
    that.WxValidate = new WxValidate(rules, messages)
  }
})