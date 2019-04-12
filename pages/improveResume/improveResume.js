// pages/improveResume/improveResume.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: ''
  },
  // 项目经历
  goProjectHistory() {
    wx.navigateTo({
      url: '../projectHistory/projectHistory'
    })
  },
  // 教育经历
  goEducation() {
    wx.navigateTo({
      url: '../education/education'
    })
  },
  // 编辑基本信息
  goBaseInfo () {
    wx.navigateTo({
      url: '../baseInfo/baseInfo'
    })
  },
  // 工作经历
  goWorkHistory() {
    wx.navigateTo({
      url: '../workHistory/workHistory'
    })
  },
  // 自我描述
  goDesMyself() {
    wx.navigateTo({
      url: '../desMyself/desMyself'
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