// pages/renzheng/renzheng.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteDate: '选择日期',
    inviteTime: '选择时间',
    imgSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })

  },
  finish() {
    wx.showToast({
      title: '认证成功',
      mask: true,
      icon: 'success',
      success() {
        setTimeout(() => {
          wx.reLaunch({
            url: '../my/my'
          })
        }, 1500)
      }
    })
  },
  bindDateChange(e) {
    this.setData({
      inviteDate: e.detail.value
    })
  }, 
  bindTimeChange(e) {
    this.setData({
      inviteTime: e.detail.value
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