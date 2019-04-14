//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        this.loginSesskey(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      },
      fail (res) {
        console.log(res)
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          this.globalData.authMask = true
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback('authMask')
          }
        }
      }
    })
  },
  loginSesskey(code) {
    wx.request({
      url: `${this.globalData.baseUrl}/Login/login.html_1554704801303`,
      data: {
        'code': code
      },
      method: 'POST',
      success: (res) => {
        let resData = res.data.bizobj.data
        this.globalData.sess_key = resData.sess_key
        if (resData.user_info) {
          this.globalData.sess_key = resData.sess_key
        } else {

        }
        console.log(res.data.bizobj.data)
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
    baseUrl: 'http://118.31.72.207:3000/mock/16/api',
    userInfo: null,
    sess_key: '',
    authMask: false,
    imgSrc: '../../images',
    userType: ''
  }
})