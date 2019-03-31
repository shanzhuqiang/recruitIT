//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
  globalData: {
    authMask: false,
    imgSrc: '../../images',
    userType: '',
    userInfo: null
  }
})