// pages/resumeDetail/resumeDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    id: '',
    resumeInfo: null,
    pay: false,
    gunzhuIcon: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getDetail(options.id)
    this.setData({
      imgSrc: app.globalData.imgSrc,
      id: options.id
    })
  },
  // 关注
  guanzhu(e) {
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
        wx.showToast({
          title: '关注成功',
          icon: 'success'
        })
        this.setData({
          pay: true
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
  // 下载按钮
  bottomBtn() {
    if (!this.data.pay) {
      wx.showModal({
        confirmText: '立即下载',
        confirmColor: '#0073ff',
        title: '提示',
        content: '您将消耗XX猎币下载简历，下载后就可以联系他啦~',
        success: (res) => {
          if (res.confirm) {
            this.downResume()
          }
        }
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: this.data.resumeInfo.user_info.mobile,
        complete(res) {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: '可在我的-简历-待沟通中邀请面试',
          })
        }
      })
    }
  },
  downResume() {
    wx.showLoading({
      mask: true,
      title: '下载中...',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/apply/buyResume.html`,
      data: {
        sess_key: app.globalData.sess_key,
        re_resume_id: this.data.id
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '下载成功',
          icon: 'success'
        })
        this.setData({
          gunzhuIcon: true
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
  // 获取简历详情
  getDetail (id) {
    wx.request({
      url: `${app.globalData.baseUrl}/Resume/resumeDetail.html`,
      data: {
        sess_key: app.globalData.sess_key,
        id: id
      },
      method: 'POST',
      success: (res) => {
        let resData = res.data.bizobj.data.resume_info
        console.log(resData)
        // 1说明已下载
        if (resData.user_info.download_status == 1) {
          this.setData({
            pay: true
          })
        }
        this.setData({
          resumeInfo: resData
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