// pages/postDetail/postDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    id: '',
    dataInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo(options.id)
    this.setData({
      imgSrc: app.globalData.imgSrc,
      id: options.id
    })
  },
  // 改变岗位状态
  changeStatus(e) {
    let key = e.currentTarget.dataset.id
    if (this.data.dataInfo.operate_status == key) {
      return false
    }
    wx.showLoading({
      mask: true,
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Apply/changeOperateStatus.html`,
      data: {
        sess_key: app.globalData.sess_key,
        operate_status: key,
        id: this.data.id,
        type: 1
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '操作成功',
            mask: true,
            icon: 'success',
            success() {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            }
          })
        } else {
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: res.data.msg,
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
  // 获取岗位详情
  getInfo(id) {
    wx.showLoading({
      mask: true,
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Work/workDetail.html`,
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
          dataInfo: data
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