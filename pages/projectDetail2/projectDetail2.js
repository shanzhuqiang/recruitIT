// pages/postDetail/postDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    imgSrc: '',
    job_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getInfo(options.id)
    this.setData({
      imgSrc: app.globalData.imgSrc,
      id: options.id
    })
  },
  // 获取项目详情
  getInfo(id) {
    wx.showLoading({
      mask: true,
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Project/projectDetail.html`,
      data: {
        sess_key: app.globalData.sess_key,
        id: id
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        let data = res.data.bizobj.data.job_info
        if (data.max_salary) {
          data['salaryStr'] = Math.round(data.mini_salary / 1000) + 'k-' + Math.round(data.max_salary / 1000) + 'k/月'
        } else {
          data['salaryStr'] = '不限'
        }
        this.setData({
          job_info: data
        })
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
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