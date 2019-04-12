// pages/education/education.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    xueliArray: ["不限", "高中", "大专", "本科", "硕士", "博士"],
    xueli: '',
    intime: '',
    outtime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 入学时间
  intimeChange(e) {
    this.setData({
      intime: e.detail.value
    })
  },
  // 毕业时间
  outtimeChange(e) {
    this.setData({
      outtime: e.detail.value
    })
  },
  // 学历
  xueliChange(e) {
    this.setData({
      xueli: this.data.xueliArray[e.detail.value]
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