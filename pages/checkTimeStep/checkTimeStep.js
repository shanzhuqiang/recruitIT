// pages/checkTimeStep/checkTimeStep.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    success: false,
    current: 0,
    company: '',
    name: '',
    start_time: '',
    end_time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      imgSrc: app.globalData.imgSrc,
      company: options.company,
      name: options.name,
      start_time: options.start_time,
      end_time: options.end_time
    })
  },
  // 完成1/2
  finishHalf () {
    wx.navigateTo({
      url: '../checkTimePull/checkTimePull'
    })
  },
  // 修改
  stepOneFail () {

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