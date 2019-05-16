// pages/goldVote/goldVote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    imgSrc: '' ,
    maskOnOff: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
    this.getList()
  },
  openRule () {
    this.setData({
      maskOnOff: true
    })
  },
  closeRule() {
    this.setData({
      maskOnOff: false
    })
  },
  // 获取数据
  getList() {
    wx.request({
      url: `${app.globalData.baseUrl}/Topic/topicList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        page: this.data.page,
        page_size: 20,
        type: 2
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.topic_list
        if (listData.length > 0) {
          let oldList = this.data.listData
          let targetTime = {}
          listData.forEach((el, index) => {
            targetTime['id' + el.id] = new Date().getTime() + 590000
          })
          this.setData({
            targetTime: targetTime,
            listData: [...oldList, ...listData],
            page: this.data.page + 1
          })
        }
        console.log(this.data.targetTime)
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})