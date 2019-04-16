// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noAuthWrap: false,
    imgSrc: '',
    authMask: false,
    noLocation: false,
    password: false,
    passwordMask: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initAuto()
    this.setData({
      imgSrc: app.globalData.imgSrc
    })

  },
  initAuto () {
    let data = {
      mustAuto: false,
      password: false
    }
    if (data.password) {
      if (data.mustAuto) {
        this.setData({
          passwordMask: true
        })
        this.initUserInfo()
        this.initLocation()
      } else {
        this.setData({
          passwordMask: true
        })
      }
    } else {
      this.initUserInfo()
      this.initLocation()
    }
  },
  // 打开登录提示
  openPassword() {
    if (app.globalData.userInfo && app.globalData.userInfo)
    this.setData({
      passwordMask: true
    })
  },
  // 初始化地理信息
  initLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('位置授权成功回调', res)
        this.getCityInfo(res.latitude, res.longitude)
      },
      fail: (res) => {
        this.setData({
          noLocation: true
        })
      }
    })
  },
  // 关闭位置不授权提示弹框
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
  // 初始化用户授权信息
  initUserInfo(on) {
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log('个人信息', res)
              app.globalData.userInfo = res.userInfo
              if (this.data.password) {
                this.openPassword()
              }
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
  // 用户拒绝授权
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
  // 获取城市信息
  getCityInfo(lat, lng, on) {
    wx.request({
      url: `${app.globalData.baseUrl}/User/getUserLocation.html`,
      data: {
        sess_key: app.globalData.sess_key,
        lat: lat,
        lng: lng
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data.bizobj.location_info)
        app.globalData.cityInfo = res.data.bizobj.location_info
        if (this.data.password) {
          this.openPassword()
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
  // 获取用户信息
  autoGetUserInfo(res) {
    if (res.detail.userInfo) {
      this.setData({
        authMask: false,
        noAuthWrap: false
      })
      app.globalData.userInfo = res.detail.userInfo
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
      app.globalData.userInfo = res.detail.userInfo
      if (this.data.password) {
        this.openPassword()
      }
    }
  },
  goHomePage(e) {
    let key = e.currentTarget.dataset.id
    app.globalData.userType = key
    wx.navigateTo({
      url: '../home/home'
    })
    // wx.navigateTo({
    //   url: '../home/home'
    // })
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