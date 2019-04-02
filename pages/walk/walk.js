// pages/walk/walk.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    walkNum: 500,
    maskOnOff: false,
    visible: false,
    ruleOnOff: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getWeRunData({
      success(res) {
        console.log(res)
      }
    })
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 规则说明
  openRule () {
    this.setData({
      ruleOnOff: true
    })
  },
  closeRuleOnOff() {
    this.setData({
      ruleOnOff: false
    })
  },
  // 立即邀请
  yaoqingNow() {
    this.setData({
      maskOnOff: true
    })
  },
  closeMask() {
    this.setData({
      maskOnOff: false
    })
  },
  openImg() {
    wx.previewImage({
      urls: ['https://csdnimg.cn/pubfooter/images/csdn-cxrs.png']
      // urls: [`${this.data.imgSrc}/shareImg.png`] // 需要预览的图片http链接列表
    })
  },
  closeVisible() {
    this.setData({
      visible: false
    })
  },
  closeVisible2() {
    this.setData({
      visible2: false
    })
  },
  closeVisible3() {
    this.setData({
      visible3: false
    })
  },
  shouquan() {
    if (this.data.walkNum === null) {
      this.setData({
        visible: true
      })
    } else if (this.data.walkNum < 500) {
      this.setData({
        visible2: true
      })
    } else if (this.data.walkNum >= 500) {
      this.setData({
        visible3: true
      })
    }
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