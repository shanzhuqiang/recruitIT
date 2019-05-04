// pages/releaseBbs/releaseBbs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    typesArray: ['官方发布', '个人发布'],
    types: '',
    shenfenArray: ['工程师', '企业HR', '经纪人'],
    shenfen: '',
    address: '',
    imgBox: '',
    title: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 标题改变
  titleChange(e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 内容改变
  contentChange(e) {
    this.setData({
      content: e.detail.value
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
          imgBox: res.tempFilePaths[0]
        })
        // tempFilePath可以作为img标签的src属性显示图片
      }
    })
  },
  confirm() {
    let title = this.data.title
    let content = this.data.content
    let types = this.data.types
    let shenfen = this.data.shenfen
    let address = this.data.address
    if (title == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入标题',
      })
    } else if (content == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入内容',
      })
    } else if (types == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择发布类型',
      })
    } else if (shenfen == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择发布身份',
      })
    } else if (address == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择公司地址',
      })
    } else {
      wx.showLoading({
        mask: true,
        title: '提交中...',
      })
      wx.request({
        url: `${app.globalData.baseUrl}/Post/savePost.html`,
        data: {
          sess_key: app.globalData.sess_key,
          title: title,
          content: content,
          imgs: [this.data.imgBox],
          type: types === '官方发布' ? 2 : 1,
          user_type: shenfen === '工程师' ? 1 : shenfen === '企业HR' ? 2 : 3,
          address: address
        },
        method: 'POST',
        success: (res) => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
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
  // 发布类别
  typesChange(e) {
    this.setData({
      types: this.data.typesArray[e.detail.value]
    })
  },
  // 发布身份
  shenfenChange(e) {
    this.setData({
      shenfen: this.data.shenfenArray[e.detail.value]
    })
  },
  // 所在地址
  addressChange(e) {
    this.setData({
      address: e.detail.value
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