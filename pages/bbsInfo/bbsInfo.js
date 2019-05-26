// pages/bbsInfo/bbsInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    bbsInfo: {},
    is_collect: 1,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
    this.getInfo(options.id)
  },
  // 评论
  iptChange(e) {
    wx.showLoading({
      mask: true,
      title: '评论中...',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Post/replyPost.html`,
      data: {
        sess_key: app.globalData.sess_key,
        post_id: this.data.id,
        content: e.detail.value,
        parent_id: 0
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '评论成功',
            mask: true,
            icon: 'success',
            success: () => {
              this.getInfo(this.data.id)
            }
          })
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
  // 关注
  guanzhuBtn(e) {
    wx.showLoading({
      mask: true,
      title: '关注中...',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/user/collect.html`,
      data: {
        sess_key: app.globalData.sess_key,
        user_id: e.currentTarget.dataset.id
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '关注成功',
            mask: true,
            icon: 'success',
            success: () => {
              this.setData({
                is_collect: 1
              })
            }
          })
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
  // 获取帖子详情
  getInfo(id) {
    wx.showLoading({
      mask: true,
      title: '加载中...',
    })
    this.setData({
      id: id
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Post/getPostInfo.html`,
      data: {
        sess_key: app.globalData.sess_key,
        id: id
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          let resData = res.data.bizobj.data.post_info
          this.setData({
            bbsInfo: resData,
            is_collect: resData.user_info.is_collect
          })
          console.log(resData)
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