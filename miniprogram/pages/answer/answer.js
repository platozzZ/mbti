const app = getApp()
const db = wx.cloud.database()
const getInfo = db.collection('mbti');
const mbti = require('../../utils/mbti.js')
var that
Page({
  data: {
    curIndex: 92,
    art: [],
    result: ["J", "P", "S", "E", "N", "F", "P", "E", "J", "J", "P", "I", "S", "E", "N", "F", "P", "I", "E", "J", "P", "I", "E", "N", "P", "I", "I", "J", "N", "F", "T", "S", "P", "E", "I", "J", "N", "F", "T", "S", "P", "I", "J", "N", "F", "T", "S", "I", "J", "N", "F", "T", "S", "I", "N", "F", "T", "S", "J", "I", "S", "E", "N", "F", "P", "I", "E", "J", "T", "J", "P", "I", "S", "N", "T", "P", "E", "T", "N", "F", "T", "S", "N", "F", "T", "S", "N", "F", "T", "S", "F", "T", "S"],
    mbtiResult: '',
    mbtiResults: '',
    list: []
    

  },
  onLoad(options) {
    that = this
    let result = that.data.result
    console.log(result)
    that.count(result)
    // result.sort()
    // console.log(result)
    // console.log(that.count(result))
    wx.showLoading({
      title: '',
      mask: true
    })
    mbti.main().then((res) => {
      that.setData({
        list: res.data
      })
      wx.hideLoading()
      console.log(res)
    })
  },
  // formSubmit() {
  //   let mbtiResults = encodeURIComponent(JSON.stringify(that.data.mbtiResults));
  //   wx.navigateTo({
  //     url: '../result/result?mbtiResult=' + that.data.mbtiResult + '&mbtiResults=' + mbtiResults
  //   })
  // },
  count(data){
    let result = data
    let countE = 0
    let countI = 0
    let countS = 0
    let countN = 0 
    let countT = 0 
    let countF = 0 
    let countJ = 0 
    let countP = 0
    let mbtiResult = ''
    result.map((item, index) => {
      if (item == 'E') {
        countE++
      }
      if (item == 'I') {
        countI++
      }
      if (item == 'S') {
        countS++
      }
      if (item == 'N') {
        countN++
      }
      if (item == 'T') {
        countT++
      }
      if (item == 'F') {
        countF++
      }
      if (item == 'J') {
        countJ++
      }
      if (item == 'P') {
        countP++
      } 
    })
    if (countE > countI) {
      mbtiResult = mbtiResult + 'E'
    } else {
      mbtiResult = mbtiResult + 'I'
    }
    if (countS > countN) {
      mbtiResult = mbtiResult + 'S'
    } else {
      mbtiResult = mbtiResult + 'N'
    }
    if (countT > countF) {
      mbtiResult = mbtiResult + 'T'
    } else {
      mbtiResult = mbtiResult + 'F'
    }
    if (countJ > countP) {
      mbtiResult = mbtiResult + 'J'
    } else {
      mbtiResult = mbtiResult + 'P'
    }
    console.log(countE)
    console.log(countI)
    console.log(countS)
    console.log(countN)
    console.log(countT)
    console.log(countF)
    console.log(countJ)
    console.log(countP)
    let mbtiResults = {
      'E': countE,
      'I': countI,
      'S': countS,
      'N': countN,
      'T': countT,
      'F': countF,
      'J': countJ,
      'P': countP,
    }
    console.log(mbtiResult)
    // return mbtiResult
    that.setData({
      mbtiResult: mbtiResult,
      mbtiResults: mbtiResults
    })
  },
  radioTap(e){
    console.log(e)
    let count = e.currentTarget.dataset.count
    let type = e.currentTarget.dataset.type
    let i = e.currentTarget.dataset.index
    let list = that.data.list
    let data = that.data.art
    console.log(data)
    data.push(type)
    list.map((item,index,arr) => {
      if(count == index){
        item.options.map((iteml,indexl,arrl) => {
          if(indexl == i){
            iteml.checked = true
          }
        })
      }
    })
    // if (data.length == 93){
    //   that.count(data)
    // }
    console.log(data)
    that.setData({
      list: list,
      curIndex: that.data.curIndex + 1,
      art: data
    })
  },
  formSubmit() {
    const db = wx.cloud.database()
    let mbtiResult = that.data.mbtiResult
    let mbtiResults = encodeURIComponent(JSON.stringify(that.data.mbtiResults))
    // wx.navigateTo({
    //   url: '../result/result?mbtiResult=' + that.data.mbtiResult + '&mbtiResults=' + mbtiResults
    // })
    db.collection('result').add({
      data: {
        result: mbtiResult
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
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

})