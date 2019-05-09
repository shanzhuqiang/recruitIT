// pages/setting/setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    mobile: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
    this.init()
  },
  init() {
    let mobile = app.globalData.userInfo.mobile
    let has_password = app.globalData.has_password
    if (has_password == 1) {
      this.setData({
        password: '更改密码'
      })
    } else {
      this.setData({
        password: '设置密码'
      })
    }
    if (mobile) {
      this.setData({
        mobile: mobile
      })
    } else {
      this.setData({
        mobile: '绑定手机'
      })
    }
  },
  // 进入手机号页面
  goSettingPhone() {
    // let mobile = this.data.mobile
    // if (mobile && mobile === '绑定手机') {
      wx.navigateTo({
        url: '../settingPhone/settingPhone'
      })
    // }
  },
  goSettingPassword() {
    wx.navigateTo({
      url: '../settingPassword/settingPassword'
    })
  },
  goShouquan() {

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