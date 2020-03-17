//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        this.loginSesskey(res.code)
      }
    })
    // 位置授权
    this.initLocation()
  },
  // 初始化地理信息
  initLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        let data = {
          lat: res.latitude,
          lng: res.longitude
        }
        this.getUserInfo(data)
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '取消授权',
        })
        let data = {
          lat: 30.04885,
          lng: 119.96043
        }
        this.getUserInfo(data)
      }
    })
  },
  getUserInfo(data) {
    this.globalData.locationData = data
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.updateUserinfo(res)
            }
          })
        }
      }
    })
  },
  // 获取sessKey
  loginSesskey(code) {
    wx.request({
      url: `${this.globalData.baseUrl}/Login/login.html`,
      data: {
        code: code
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code == 0) {
          let resData = res.data.bizobj.data
          this.globalData.sess_key = resData.sess_key
          this.globalData.userInfo = resData.user_info
          // 更新用户信息
          // this.updateUserinfo(data)
          // this.globalData.has_password = resData.has_password
          // this.globalData.has_password = 2
          // this.globalData.need_auth = resData.need_auth
          // 是否需要强制授权 1: 需要 2: 不需要(不需要授权的情况下用户信息不为空)
          // 用户是否有密码 1: 有密码 2: 无密码
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
  // 更新用户信息
  updateUserinfo(data) {
    // this.globalData.userInfo = data.userInfo
    wx.request({
      url: `${this.globalData.baseUrl}/User/updateUserInfo.html`,
      data: {
        sess_key: this.globalData.sess_key,
        nickname: data.userInfo.nickName,
        avatar: data.userInfo.avatarUrl,
        gender: data.userInfo.gender,
        lat: this.globalData.locationData.lat,
        lng: this.globalData.locationData.lng
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code == 0) {
          this.globalData.userInfo = res.data.bizobj.data.user_info
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
  globalData: {
    locationData: null,
    is_shenhe: null,
    // baseUrl: 'http://118.31.72.207:3000/mock/16/api',
    baseUrl: 'https://www.cnlhyg.com/api',
    sess_key: '',
    need_auth: '',
    has_password: '',
    baseInfo: null,
    userInfo: null,
    imgSrc: '../../images',
    userType: '',
    companyObj: null
  }
})