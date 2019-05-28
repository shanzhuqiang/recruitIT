// pages/myMessage/myMessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    listData: [],
    imgSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 获取消息列表
  getListData () {
    wx.request({
      url: `${app.globalData.baseUrl}/notice/noticeInfo.html`,
      data: {
        sess_key: app.globalData.sess_key,
        page_size: 20,
        page: this.data.page
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code == 0) {
          let data = res.data.bizobj.data
          if (data && data.length > 0) {
            let oldListData = this.data.listData
            this.setData({
              listData: [...oldListData, ...data],
              page: this.data.page + 1
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  goMessage(e) {
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    let re_job_id = e.currentTarget.dataset.rejobid
    let re_project_id = e.currentTarget.dataset.reprojectid
    let from_sess_key = e.currentTarget.dataset.fromsesskey
    if (type == 1) {
      // 1是岗位
      wx.navigateTo({
        url: `../postDetail/postDetail?id=${re_job_id}&fromsesskey=${from_sess_key}`
      })
    } else if (type == 2) {
      // 2是项目
      wx.navigateTo({
        url: `../projectDetail/projectDetail?id=${re_project_id}&fromsesskey=${from_sess_key}`
      })
    }

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
    this.getListData()
  }
})