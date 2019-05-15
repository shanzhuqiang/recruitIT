// pages/myRelease/myRelease.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    tabType: 'tiezi',
    userType: '',
    projectList: [],
    quartersList: []
  },
  // 切换类型
  chooseType(e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      tabType: key
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: app.globalData.userType,
      imgSrc: app.globalData.imgSrc
    })
    if (this.data.userType === 'hr') {
      this.initProjectData()
      this.initQuartersData()
    }
  },
  goProjectDetail(e) {
    wx.navigateTo({
      url: `../projectDetail2/projectDetail2?id=${e.currentTarget.dataset.id}`
    })
  },
  goWordDetail(e) {
    wx.navigateTo({
      url: `../postDetail/postDetail?id=${e.currentTarget.dataset.id}`
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
  // 我的发布项目
  initProjectData() {
    wx.request({
      url: `${app.globalData.baseUrl}/Project/projectList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        hr_key: app.globalData.sess_key,
        page: 1,
        page_size: 99999
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.project_list
        listData.forEach((el, index) => {
          if (el.max_salary) {
            el['salaryStr'] = Math.round(el.mini_salary / 1000) + 'k-' + Math.round(el.max_salary / 1000) + 'k/月'
          } else {
            el['salaryStr'] = '不限'
          }
        })
        this.setData({
          projectList: listData
        })
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  // 发布的岗位
  initQuartersData() {
    wx.request({
      url: `${app.globalData.baseUrl}/Work/workList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        hr_key: app.globalData.sess_key,
        page: 1,
        page_size: 99999
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.job_list
        listData.forEach((el, index) => {
          if (el.max_salary) {
            el['salaryStr'] = Math.round(el.mini_salary / 1000) + 'k-' + Math.round(el.max_salary / 1000) + 'k/月'
          } else {
            el['salaryStr'] = '不限'
          }
        })
        this.setData({
          quartersList: listData
        })
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