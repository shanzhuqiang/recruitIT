// pages/releaseGangwei/releaseGangwei.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    jingyanArray: ["不限", "应届毕业生", "3年以内", "3-5年", "5-10年", "10年以上"],
    jingyan: '',
    xueliArray: ["不限", "大专", "本科", "硕士"],
    xueli: '',
    moneyArray: ["不限", "2K以下", "2K-5K", "5K-10K", "10K-15K", "15K-25K", "25K-50K", "50K以上"],
    money: '',
    tagArray: ['PS'],
    addTag: false,
    tagVal:'312'
  },
  // 添加标签
  addTag() {
    this.setData({
      addTag: true,
      tagVal: ''
    })
  },
  // 添加标签--确认
  addTagOk () {
    this.data.tagArray.push(this.data.tagVal)
    this.setData({
      addTag: false
    })
  },
  // 添加标签--取消
  addTagCancel () {
    this.setData({
      addTag: false
    })
  },
  // 岗位职责
  goGangweizhize() {
    wx.navigateTo({
      url: '../gangweizhize/gangweizhize'
    })
  },
  // 任职要求
  goRenzhiyaoqiu() {
    wx.navigateTo({
      url: '../renzhiyaoqiu/renzhiyaoqiu'
    })
  },
  // 经验要求
  jingyanChange(e) {
    this.setData({
      jingyan: this.data.jingyanArray[e.detail.value]
    })
  }, 
  // 学历
  xueliChange(e) {
    this.setData({
      xueli: this.data.xueliArray[e.detail.value]
    })
  },
  // 月薪
  moneyChange(e) {
    this.setData({
      money: this.data.moneyArray[e.detail.value]
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