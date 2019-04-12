// pages/editCompany/editCompany.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    rongziArray: ["不需要融资", "未融资", "天使轮", "A轮", "B轮", "C轮", "D轮及以上", "上市公司"],
    rongzi: '',
    guimoArray: ["少于15人", "15-50人", "50-150人", "150-500人", "500-2000人", "2000人以上"],
    guimo: '',
    hangyeArray: ["移动互联网", "电子商务", "社交网络", "企业服务", "O2O", "教育", "游戏", "旅游", "金融", "医疗健康", "生活服务", "信息安全", "数据服务", "广告营销", "文化娱乐", "硬件", "分类信息", "招聘", "其他"],
    hangye: '',
    address: '',
    addressInfo: '',
    introduceChange: ''
  },
  // 融资
  rongziChange(e) {
    this.setData({
      rongzi: this.data.rongziArray[e.detail.value]
    })
  },
  // 规模
  guimoChange(e) {
    this.setData({
      guimo: this.data.guimoArray[e.detail.value]
    })
  },
  // 行业
  hangyeChange(e) {
    this.setData({
      hangye: this.data.hangyeArray[e.detail.value]
    })
  },
  // 公司地址
  addressChange (e) {
    this.setData({
      address: e.detail.value
    })
  },
  // 详细地址
  addressInfoChange(e) {
    this.setData({
      addressInfo: e.detail.value
    })

  },
  // 公司解释
  introduceChange(e) {
    this.setData({
      introduce: e.detail.value
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