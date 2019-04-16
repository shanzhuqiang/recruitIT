// pages/enterpriseInfo/enterpriseInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    tabCurrent: 'gongsi',
    guanzhuOnOff: false,
    company_info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo(options.id)
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 获取公司详情
  getInfo (id) {
    wx.request({
      url: `${app.globalData.baseUrl}/Company/companyInfo.html`,
      data: {
        sess_key: app.globalData.sess_key,
        id: id
      },
      method: 'POST',
      success: (res) => {
        let company_info = res.data.bizobj.data.company_info
        console.log(company_info.attention)
        this.setData({
          guanzhuOnOff: company_info.attention === 1,
          company_info: company_info
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
  // 关注
  guanzhuClick () {
    this.setData({
      guanzhuOnOff: !this.data.guanzhuOnOff
    })
  },
  // 切换tab
  changeTabs(e) {
    let tabCurrent = e.currentTarget.dataset.id
    this.setData({
      tabCurrent: tabCurrent
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