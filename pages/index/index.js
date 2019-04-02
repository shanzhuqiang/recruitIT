// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    authMask: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo()
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  initUserInfo () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    if (app.globalData.authMask) {
      this.setData({
        authMask: true
      })
    }
    app.userInfoReadyCallback = res => {
      if (res === 'authMask') {
        this.setData({
          authMask: true
        })
      } else {
        this.setData({
          userInfo: res
        }) 
      }
    };
  },
  bindgetuserinfo(res) {
    this.setData({
      authMask: false
    })
    console.log(res.detail.userInfo)
  },
  goFindPartTime(e) {
    let key = e.currentTarget.dataset.id
    app.globalData.userType = key
    wx.navigateTo({
      url: '../setting/setting'
    })
    // wx.navigateTo({
    //   url: '../home/home'
    // })
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