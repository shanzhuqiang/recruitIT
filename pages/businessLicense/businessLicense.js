// pages/businessLicense/businessLicense.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    imgBox: '',
    chooseOk: false,
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imgSrc = app.globalData.imgSrc
    this.setData({
      imgSrc: imgSrc,
      imgBox: `${imgSrc}/businessLicense.png`,
      name: app.globalData.companyObj.name
    })
  },
  // 选择图片
  chooseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          imgBox: res.tempFilePaths[0],
          chooseOk: true
        })
        // tempFilePath可以作为img标签的src属性显示图片
      }
    })
  },
  // 提交
  confirm () {
    if (this.data.chooseOk) {
      wx.showModal({
        title: '提示',
        content: '确认上传该营业执照？',
        success: (res) => {
          if (res.confirm) {
            this.companyFill()
          }
        }
      })
    }
  },
  // 公司认证
  companyFill() {
    wx.showLoading({
      mask: true,
      title: '保存中...',
    })
    let companyObj = app.globalData.companyObj
    wx.request({
      url: `${app.globalData.baseUrl}/Company/companyFill.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_name: companyObj.addressCity,
        city_code: companyObj.btnChoose,
        name: companyObj.name,
        financing: companyObj.financing,
        scale: companyObj.scale,
        re_line_id: companyObj.re_line_id,
        address: companyObj.addressInfo,
        instruction: companyObj.instruction,
        image: companyObj.imgBox,
        licence_image: this.data.imgBox,
        lng: companyObj.longitude,
        lat: companyObj.latitude
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        if (res.data.error_code == 0) {
          wx.showToast({
            title: '保存成功',
            mask: true,
            icon: 'success',
            success() {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 3
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