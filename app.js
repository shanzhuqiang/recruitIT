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
    cityInfo: null,
    sess_key: '',
    imgSrc: '../../images',
    userType: ''
  }
})