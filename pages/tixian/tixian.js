// pages/tixian/tixian.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    totalCoin: 0,
    money: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.totalCoin)
    this.setData({
      imgSrc: app.globalData.imgSrc,
      totalCoin: options.totalCoin
    })
  },
  // 输入金融
  moneyChange (e) {
    let money = e.detail.value
    if (Number(money) > Number(this.data.totalCoin)) {
      money = this.data.totalCoin
    }
    this.setData({
      money: money
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

  }
})