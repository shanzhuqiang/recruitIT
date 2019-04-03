// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  // 我的消息
  goMyMessage() {
    wx.navigateTo({
      url: '../myMessage/myMessage'
    })
  },
  // 每日任务
  goTask() {
    wx.navigateTo({
      url: '../taskDay/taskDay'
    })
  },
  // 我的发布
  goMyRelease() {
    wx.navigateTo({
      url: '../myRelease/myRelease'
    })
  },
  // 关注公司
  goGUnzhugongsi() {
    wx.navigateTo({
      url: '../guanzhugongsi/guanzhugongsi'
    })
  },
  // 认证
  goRenzheng() {
    wx.navigateTo({
      url: '../renzheng/renzheng'
    })
  },
  // 进入首页
  goHome() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  // 进入赏金平台
  goBountyPlatform() {
    wx.navigateTo({
      url: '../bountyPlatform/bountyPlatform'
    })
  },
  // 发布
  goRelease() {
    wx.navigateTo({
      url: '../release/release'
    })
  },
  // 进入论坛
  goBbs() {
    wx.navigateTo({
      url: '../bbs/bbs'
    })
  },
  // 设置
  goSetting() {
    wx.navigateTo({
      url: '../setting/setting'
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