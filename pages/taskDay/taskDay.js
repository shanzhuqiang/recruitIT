// pages/taskDay/taskDay.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
data: {
    imgSrc: '',
    qiandao: false
  },
  qiandaoBtn () {
    this.setData({
      qiandao: true
    })
  },
  openRule () {

  },
  // 进入微信步数兑换
  goWalk() {
    wx.navigateTo({
      url: '../walk/walk'
    })
  },
  // 进入论坛阅读
  goBbs() {
    wx.navigateTo({
      url: '../bbs/bbs'
    })
  },
  // 进入金币投票
  goGoldVote() {
    wx.navigateTo({
      url: '../goldVote/goldVote'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
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