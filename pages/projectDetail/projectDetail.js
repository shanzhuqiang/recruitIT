// pages/postDetail/postDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    userType: '',
    imgSrc: '',
    job_info: {},
    companyInfo: {},
    shareMask: false,
    maskOnOff: false,
    user_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    console.log(options)
    this.getInfo(options.id)
    this.setData({
      userType: app.globalData.userType,
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
        if (res.data.error_code == 0) {
          let data = res.data.bizobj.data.job_info
          if (data.max_salary) {
            data['salaryStr'] = Math.round(data.mini_salary / 1000) + 'k-' + Math.round(data.max_salary / 1000) + 'k/月'
          } else {
            data['salaryStr'] = '不限'
          }
          this.setData({
            job_info: data
          })
          this.getCompany(data.re_company_id)
        } else {
          wx.hideLoading()
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
  // 获取企业信息
  getCompany(id) {
    wx.request({
      url: `${app.globalData.baseUrl}/Company/companyInfo.html`,
      data: {
        sess_key: app.globalData.sess_key,
        id: id
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          let company_info = res.data.bizobj.data.company_info
          this.setData({
            companyInfo: company_info
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
  // 立即投递
  applyNow () {
    wx.showLoading({
      mask: true,
      title: '投递中...',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/apply/apply.html`,
      data: {
        sess_key: app.globalData.sess_key,
        re_project_id: this.data.id,
        type: 2
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '投递成功',
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
  // 图片分享
  sharePhoto () {
    this.setData({
      shareMask: false,
      maskOnOff: true
    })
  },
  // 关闭图片分享
  closeMask() {
    this.setData({
      maskOnOff: false
    })
  },
  // 分享
  shareBtn () {
    this.getUserCollects()
    this.setData({
      shareMask: true
    })
  },
  // 关闭分享
  cancalShare() {
    this.setData({
      shareMask: false
    })
  },
  // 站内分享
  shareUser () {
    let user_list = this.data.user_list
    let newUserList = []
    user_list.forEach((el, index) => {
      newUserList.push(el.username)
    })
    wx.showActionSheet({
      itemList: newUserList,
      success: (res) => {
        this.shareUserFn(user_list[res.tapIndex])
      }
    })
  },
  // 站内分享方法
  shareUserFn (obj) {
    wx.showLoading({
      mask: true,
      title: '分享中...',
    })
    let userType = this.data.userType
    wx.request({
      url: `${app.globalData.baseUrl}/work/shareInWork.html`,
      data: {
        sess_key: app.globalData.sess_key,
        user_type: userType === 'engineer' ? 1 : userType === 'hr' ? 2 : 3,
        re_job_id: this.data.id,
        to_user_id: obj.id
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '分享成功',
            mask: true,
            icon: 'success',
            success() {
              this.setData({
                shareMask: false
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
  // 获取站内关注用户
  getUserCollects () {
    wx.request({
      url: `${app.globalData.baseUrl}/user/collects.html`,
      data: {
        sess_key: app.globalData.sess_key
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code == 0) {
          this.setData({
            user_list: res.data.bizobj.data.user_list
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