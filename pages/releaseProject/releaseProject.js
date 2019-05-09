// pages/releaseGangwei/releaseGangwei.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    jingyanArray: [
      [{
        id: '',
        name: '不限'
      }, {
        id: '1',
        name: '应届毕业生'
      }, {
        id: '2',
        name: '3年以内'
      }],
      [{
        id: '3',
        name: '3-5年'
      }, {
        id: '4',
        name: '5-10年'
      }, {
        id: '5',
        name: '10年以上'
      }]
    ],
    jingyan: '',
    zhouqiArray: [
      {
        id: '',
        name: '不限'
      },
      {
        id: '2',
        name: '长期兼职'
      },
      {
        id: '1',
        name: '短期兼职'
      }],
    zhouqi: '',
    moneyArray: ["不限", "2K以下", "2K-5K", "5K-10K", "10K-15K", "15K-25K", "25K-50K", "50K以上"],
    money: ''
  },
  // 项目职责
  goProjectZhize() {
    wx.navigateTo({
      url: '../projectZhize/projectZhize'
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
  // 工作周期
  zhouqiChange(e) {
    this.setData({
      zhouqi: this.data.zhouqiArray[e.detail.value]
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