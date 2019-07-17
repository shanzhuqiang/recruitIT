// pages/resumeDetail/resumeDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: '',
    imgSrc: '',
    id: '',
    resumeInfo: null,
    collect: false,
    download: false,
    re_apply_id: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.reApplyId) {
      this.setData({
        re_apply_id: options.reApplyId
      })
    }
    this.setData({
      userType: app.globalData.userType,
      imgSrc: app.globalData.imgSrc,
      id: options.id
    })
    this.getDetail(options.id)
  },
  // 关注
  guanzhu(e) {
    if (!this.data.collect) {
      wx.showLoading({
        mask: true,
        title: '关注中...',
      })
      wx.request({
        url: `${app.globalData.baseUrl}/user/collect.html`,
        data: {
          sess_key: app.globalData.sess_key,
          user_id: e.currentTarget.dataset.id,
          re_resume_id: e.currentTarget.dataset.ida
        },
        method: 'POST',
        success: (res) => {
          wx.hideLoading()
          if (res.data.error_code == 0) {
            wx.showToast({
              title: '关注成功',
              icon: 'success'
            })
            this.setData({
              collect: true
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
    }
  },
  // 联系后台
  bottomBtn() {
    wx.makePhoneCall({
      phoneNumber: 18767101010
    })
    // if (!this.data.download) {
    //   let userData = this.data.resumeInfo.user_info
    //   wx.showModal({
    //     confirmText: '立即下载',
    //     confirmColor: '#0073ff',
    //     title: '提示',
    //     content: `您将消耗${userData.download_coin}猎币下载简历，下载后就可以联系他啦~`,
    //     success: (res) => {
    //       if (res.confirm) {
    //         if (userData.download_coin > userData.coin) {
    //           // 消耗的比拥有的多
    //           wx.showModal({
    //             title: '提示',
    //             confirmColor: '#0073ff',
    //             confirmText: '前往',
    //             content: '您的猎币不够，请前往充值',
    //             success: (res) => {
    //               if (res.confirm) {
    //                 wx.navigateTo({
    //                   url: '../myGold2/myGold2'
    //                 })
    //               }
    //             }
    //           })
    //         } else {
    //           this.downResume()
    //         }
    //       }
    //     }
    //   })
    // } else {
    //   wx.makePhoneCall({
    //     phoneNumber: this.data.resumeInfo.user_info.mobile
    //     complete(res) {
    //       wx.showModal({
    //         showCancel: false,
    //         title: '提示',
    //         content: '可在我的-简历-待沟通中邀请面试',
    //       })
    //     }
    //   })
    // }
  },
  // 下载简历
  downResume() {
    wx.showLoading({
      mask: true,
      title: '下载中...',
    })
    let userType = this.data.userType
    wx.request({
      url: `${app.globalData.baseUrl}/apply/buyResume.html`,
      data: {
        sess_key: app.globalData.sess_key,
        user_type: userType === 'engineer' ? 1 : userType === 'hr' ? 2 : 3,
        re_resume_id: this.data.id,
        re_apply_id: this.data.re_apply_id
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '下载成功',
            icon: 'success'
          })
          this.setData({
            download: true
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
  // 获取简历详情
  getDetail(id) {
    let userType = this.data.userType
    wx.request({
      url: `${app.globalData.baseUrl}/Resume/resumeDetail.html`,
      data: {
        sess_key: app.globalData.sess_key,
        user_type: userType === 'engineer' ? 1 : userType === 'hr' ? 2 : 3,
        id: id,
        re_apply_id: this.data.re_apply_id
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code == 0) {
          let resData = res.data.bizobj.data.resume_info
          console.log(resData.user_info.birthday)
          // 计算年龄
          let year = 1000 * 60 * 60 * 24 * 365;
          let now = new Date();
          let birthday = new Date(resData.user_info.birthday);
          let workStartTime = new Date(resData.user_info.work_begin_time);
          let age = parseInt((now - birthday) / year);
          let workTime = parseInt((now - workStartTime) / year);
          resData.user_info['birthday2'] = age + '岁'
          resData.user_info['workTime'] = workTime + '年'
          // 1说明已下载
          if (resData.user_info.download_status == 1) {
            this.setData({
              download: true
            })
          }
          // 1说明已收藏
          if (resData.user_info.is_collect == 1) {
            this.setData({
              collect: true
            })
          }
          this.setData({
            resumeInfo: resData
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
    return {
      title: '寻猿招聘',
      path: `/pages/index/index`,
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    }
  }
})