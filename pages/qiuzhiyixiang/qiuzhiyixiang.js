// pages/qiuzhiyixiang/qiuzhiyixiang.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    xingzhiArray: ['短期兼职', '长期兼职'],
    xingzhi: '',
    yuexinArray: ["1k-5k", "5k-10k", "10k-15k", "15k-20k", "20k-25k", "25k-30k", "30k+"],
    yuexin: '',
    zhuangtaiArray: ["积极找工作", "暂时不换工作", "随便看看"],
    zhuangtai: '',
    shijianArray: ["2周以内", "2周-1个月", "1-3个月", "随时"],
    shijian: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })

  },
  // 完成
  finish() {
    wx.showToast({
      title: '认证成功',
      icon: 'success',
      mask: true,
      success() {
        setTimeout(() => {
          wx.reLaunch({
            url: '../my/my'
          })
        }, 1500)
      }
    })
  },
  // 工作性质
  xingzhiChange (e) {
    this.setData({
      xingzhi: this.data.xingzhiArray[e.detail.value]
    })
  },
  // 期望薪资
  yuexinChange (e) {
    this.setData({
      yuexin: this.data.yuexinArray[e.detail.value]
    })
  },
  // 当前状态
  zhuangtaiChange(e) {
    this.setData({
      zhuangtai: this.data.zhuangtaiArray[e.detail.value]
    })
  },
  // 到岗时间
  shijianChange(e) {
    this.setData({
      shijian: this.data.shijianArray[e.detail.value]
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