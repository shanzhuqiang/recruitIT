// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstMask: true,
    noAuthWrap: false,
    imgSrc: '',
    authMask: false,
    noLocation: false,
    password: false,
    // passwordMask: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSessKeySuccess()
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 判断用户信息拿到
  getSessKeySuccess() {
    if (app.globalData.sess_key != '') {
      this.setData({
        firstMask: false
      })
      this.initLocation()
    } else {
      setTimeout(() => {
        this.getSessKeySuccess()
      }, 500)
    }
  },
  // 初始化地理信息
  initLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        let obj = app.globalData.userInfo || {}
        obj['lat'] = res.latitude
        obj['lng'] = res.longitude
        Object.assign(app.globalData.userInfo, obj)
        this.initUserInfo()
      },
      fail: (res) => {
        this.setData({
          noLocation: true
        })
      }
    })
  },
  // 位置不授权提示弹框
  closeNoLocation() {
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          this.initLocation()
          this.setData({
            noLocation: false
          })
        }
      }
    })
  },
  // fabuBtn () {
  //   wx.showLoading({
  //     mask: true,
  //     title: '发布中...',
  //   })
  //   setTimeout(() => {
  //     wx.showToast({
  //       title: '提交成功',
  //       mask: true,
  //       icon: 'success'
  //     })
  //   }, 1000)
  // },
  // 开启/关闭
  initAutoStyems () {
    wx.request({
      url: `${app.globalData.baseUrl}/Web/webset.html`,
      data: {
        sess_key: app.globalData.sess_key
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code == 0) {
          this.setData({
            openStatus: res.data.bizobj.config.open_status
            // openStatus: 2
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
  // 授权成功后添加用户信息
  addUserInfo(data) {
    let obj = app.globalData.userInfo || {}
    obj['avatar'] = data.avatarUrl
    obj['gender'] = data.gender
    obj['nickname'] = data.nickName
    Object.assign(app.globalData.userInfo, obj)
    this.updateUserinfo()
  },
  // 更新用户信息
  updateUserinfo () {
    let data = app.globalData.userInfo
    wx.request({
      url: `${app.globalData.baseUrl}/User/updateUserInfo.html`,
      data: {
        sess_key: app.globalData.sess_key,
        nickname: data.nickname,
        avatar: data.avatar,
        gender: data.gender,
        lat: data.lat,
        lng: data.lng
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code == 0) {
          app.globalData.userInfo = res.data.bizobj.data.user_info
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
  // 初始化判断授权
  // initAuto() {
  //   this.setData({
  //     firstMask: false
  //   })
  //   if (app.globalData.has_password == 1) {
  //     // 有密码的情况
  //     if (app.globalData.need_auth == 1) {
  //       // 需要强制授权
  //       this.setData({
  //         password: true
  //       })
  //       this.initLocation()
  //     } else {
  //       // 不需要强制授权，去登录页面
  //       this.setData({
  //         passwordMask: true
  //       })
  //     }
  //   } else {
  //     // 没有密码必须要强制授权
  //     this.initLocation()
  //   }
  // },
  // 打开登录提示
  // openPassword() {
  //   this.setData({
  //     passwordMask: true
  //   })
  // },
  // 初始化用户授权信息
  initUserInfo(on) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.addUserInfo(res.userInfo)
              // if (this.data.password) {
              //   this.openPassword()
              // }
            }
          })
        } else {
          this.setData({
            authMask: true
          })
        }
      }
    })
  },
  // 用户拒绝个人信息授权
  noAuto() {
    this.setData({
      noAuthWrap: false
    })
  },
  // 进入登录页面
  goPassword() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  // 获取用户信息
  autoGetUserInfo(res) {
    if (res.detail.userInfo) {
      this.setData({
        authMask: false,
        noAuthWrap: false
      })
      this.addUserInfo(res.detail.userInfo)
      if (this.data.password) {
        this.openPassword()
      }
    }
  },
  // 用户授权结果回调
  bindgetuserinfo(res) {
    if (res.detail.errMsg === "getUserInfo:fail auth deny") {
      this.setData({
        noAuthWrap: true
      })
    } else {
      this.setData({
        authMask: false
      })
      this.addUserInfo(res.detail.userInfo)
      if (this.data.password) {
        this.openPassword()
      }
    }
  },
  // 找兼职
  goHomePage () {
    if (app.globalData.userInfo.identity_auth.is_engineer == 1) {
      app.globalData.userType = "engineer"
      wx.navigateTo({
        url: '../home/home'
      })
      // wx.navigateTo({
      //   url: '../home/home'
      // })
    } else {
      wx.navigateTo({
        url: '../renzheng/renzheng?shenfen=engineer'
      }) 
    }
  },
  goHomePage2() {
    if (app.globalData.userInfo.identity_auth.is_hr == 1) {
      app.globalData.userType = "hr"
      wx.navigateTo({
        url: '../home/home'
      })
    } else {
      wx.navigateTo({
        url: '../renzheng/renzheng?shenfen=hr'
      })
    }
  },
  goHomePage3() {
    app.globalData.userType = "agent"
    wx.navigateTo({
      url: '../home/home'
    })
    // if (app.globalData.userInfo.identity_auth.is_agent == 1) {
    //   app.globalData.userType = "agent"
    //   wx.navigateTo({
    //     url: '../home/home'
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../renzheng/renzheng?shenfen=agent'
    //   })
    // }
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
      title: '夯大猎',
      path: `/pages/index/index`,
      success: res => {
      },
      fail: res => {
      }
    }
  }
})