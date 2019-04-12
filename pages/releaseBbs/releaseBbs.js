// pages/releaseBbs/releaseBbs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    typesArray: ['官方发布', '个人发布'],
    types: '',
    shenfenArray: ['企业HR', '经纪人', '工程师'],
    shenfen: '',
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 发布类别
  typesChange(e) {
    this.setData({
      types: this.data.typesArray[e.detail.value]
    })
  },
  // 发布身份
  shenfenChange(e) {
    this.setData({
      shenfen: this.data.shenfenArray[e.detail.value]
    })
  },
  // 所在地址
  addressChange(e) {
    this.setData({
      address: e.detail.value
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