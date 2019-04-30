// pages/renzheng/renzheng.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    shenfen: '我的身份',
    name: '',
    xingbie: "性别",
    phone: '',
    birthday: '出生年月'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })

  },
  // 输入名字
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 输入手机号
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 工程师下一步
  nextStep() {
    let shenfen = this.data.shenfen
    let name = this.data.name
    let phone = this.data.phone
    let xingbie = this.data.xingbie
    let birthday = this.data.birthday
    if (shenfen == '我的身份') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择身份',
      })
    } else if (name == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入真实姓名',
      })
    } else if (phone == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入手机号码',
      })
    } else if (xingbie == '性别') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择性别',
      })
    } else if (birthday == '出生年月') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择出生年月',
      })
    } else {
      this.identify()
    }
  },
  identify() {
    wx.showLoading({
      mask: true,
      title: '认证中...',
    })
    let type = this.data.shenfen === '工程师' ? 1 : this.data.shenfen === '企业HR' ? 2 : 3
    wx.request({
      url: `${app.globalData.baseUrl}/User/identify.html`,
      data: {
        sess_key: app.globalData.sess_key,
        mobile: this.data.phone,
        type: type,
        gender: this.data.xingbie,
        username: this.data.name,
        birthday: this.data.birthday
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (type == 1) {
          wx.showToast({
            title: '认证成功',
            mask: true,
            icon: 'success',
            success() {
              setTimeout(() => {
                wx.reLaunch({
                  url: '../qiuzhiyixiang/qiuzhiyixiang'
                })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: '认证成功',
            mask: true,
            icon: 'success',
            success() {
              setTimeout(() => {
                wx.reLaunch({
                  url: '../my/my'
                })
              }, 1500)
            }
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
  // hr,经纪人完成认证
  finish() {
    this.nextStep()
  },
  // 选择身份
  chooseShenfen () {
    let that = this
    let shenfenList = ["工程师", "企业HR", "经济人"]
    wx.showActionSheet({
      itemList: shenfenList,
      success(res) {
        that.setData({
          shenfen: shenfenList[res.tapIndex]
        })
        // console.log(res.tapIndex)
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  },
  // 选择性别
  chooseXingbie() {
    let that = this
    let shenfenList = ["男", "女"]
    wx.showActionSheet({
      itemList: shenfenList,
      success(res) {
        that.setData({
          xingbie: shenfenList[res.tapIndex]
        })
        // console.log(res.tapIndex)
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  },
  // 选择生日
  bindDateChange(e) {
    this.setData({
      birthday: e.detail.value
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