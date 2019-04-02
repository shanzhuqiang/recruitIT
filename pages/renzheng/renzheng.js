// pages/renzheng/renzheng.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    shenfen: '我的身份',
    xingbie: "性别",
    birthday: '出生年月'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })

  },
  nextStep() {
    wx.navigateTo({
      url: '../qiuzhiyixiang/qiuzhiyixiang'
    })
  },
  finish() {
    wx.showToast({
      title: '认证成功',
      mask: true,
      icon: 'success',
      success () {
        setTimeout(() => {
          wx.reLaunch({
            url: '../my/my'
          })
        }, 1500)
      }
    })
  },
  chooseShenfen () {
    let that = this
    let shenfenList = ["工程师", "企业HR", "经济人"]
    wx.showActionSheet({
      itemList: shenfenList,
      success(res) {
        that.setData({
          shenfen: shenfenList[res.tapIndex]
        })
        // console.log(res.tapIndex)
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  },
  chooseXingbie() {
    let that = this
    let shenfenList = ["男", "女"]
    wx.showActionSheet({
      itemList: shenfenList,
      success(res) {
        that.setData({
          xingbie: shenfenList[res.tapIndex]
        })
        // console.log(res.tapIndex)
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  },
  bindDateChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})