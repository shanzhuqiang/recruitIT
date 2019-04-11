// pages/baseInfo/baseInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    xingbieArray: ['男', '女'],
    xingbie: '',
    birthday: '',
    shenfenArray: ['职场人生', '应届生'],
    shenfen: '',
    workTime: '',
    tagArray: ['PS'],
    addTag: false,
    tagVal: '',
    maxlengthModal: false,
    delModal: false,
    delId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 添加标签
  addTag() {
    this.setData({
      tagVal: '',
      addTag: true
    })
  },
  // 监听输入改变
  tagValChange(e) {
    this.setData({
      tagVal: e.detail.detail.value
    })
  },
  // 取消删除
  cancelDel() {
    this.setData({
      delModal: false,
      delId: ''
    })
  },
  // 确认删除
  confirmDel() {
    let tagArray = this.data.tagArray
    let delId = this.data.delId
    let newTagArray = tagArray.filter((el, index) => {
      return el !== delId
    })
    this.setData({
      tagArray: newTagArray,
      delModal: false
    })
  },
  // 删除标签
  delTag(e) {
    this.setData({
      delModal: true,
      delId: e.currentTarget.dataset.id
    })
  },
  // 关闭最长提示
  maxlengthModalClose() {
    this.setData({
      maxlengthModal: false
    })
  },
  // 添加标签--确认
  addTagOk() {
    let tagVal = this.data.tagVal
    if (tagVal !== '') {
      let tagArray = this.data.tagArray
      if (tagArray.length > 4) {
        this.setData({
          addTag: false,
          maxlengthModal: true
        })
      } else {
        tagArray.push(tagVal)
        this.setData({
          tagArray: tagArray,
          addTag: false
        })
      }
    }
  },
  // 添加标签--取消
  addTagCancel() {
    this.setData({
      addTag: false
    })
  },
  // 参加工作时间
  workTimeChange(e) {
    this.setData({
      workTime: e.detail.value
    })
  },
  // 当前身份
  shenfenChange(e) {
    this.setData({
      shenfen: this.data.shenfenArray[e.detail.value]
    })
  },
  // 出生日期
  birthdayChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  // 性别
  xingbieChange(e) {
    this.setData({
      xingbie: this.data.xingbieArray[e.detail.value]
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