// const cloud = require('wx-server-sdk')
// console.log(cloud)
// wx.cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV
// })
const db = wx.cloud.database()
const MAX_LIMIT = 20
exports.main = async (event, context) => {
  // console.log(event)
  // console.log(context)
  // 先取出集合记录总数
  const countResult = await db.collection('mbti').count()
  const total = countResult.total
  // console.log(countResult)
  // console.log(total)
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 20)
  console.log(batchTimes)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('mbti').skip(i * MAX_LIMIT).limit(MAX_LIMIT).field({
      title: true,
      options: true,
    }).get()
    // console.log(tasks)
    tasks.push(promise)
  }
  // console.log(tasks)
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    // console.log(acc)
    // console.log(cur)
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
  console.log(tasks)
}