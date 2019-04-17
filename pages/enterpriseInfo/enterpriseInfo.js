// pages/enterpriseInfo/enterpriseInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    tabCurrent: 'gongsi',
    guanzhuOnOff: false,
    company_info: {},
    projectList: [],
    quartersList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
    this.getInfo(options.id)
    this.getProjectList(options.id)
    this.getQuartersList(options.id)
  },
  // 进入岗位详情
  goPostDetail(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../postDetail/postDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 进入项目详情
  goProjectDetail(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../projectDetail/projectDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 获取公司详情
  getInfo (id) {
    console.log(id)
    wx.request({
      url: `${app.globalData.baseUrl}/Company/companyInfo.html`,
      data: {
        sess_key: app.globalData.sess_key,
        id: id
      },
      method: 'POST',
      success: (res) => {
        let company_info = res.data.bizobj.data.company_info
        console.log(company_info.attention)
        this.setData({
          guanzhuOnOff: company_info.attention === 1,
          company_info: company_info
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
  // 获取在招岗位
  getQuartersList(id) {
    wx.request({
      url: `${app.globalData.baseUrl}/Work/workList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        re_company_id: id,
        page: 1,
        page_size: 99999
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.job_list
        console.log(listData)
        listData.forEach((el, index) => {
          el['mini_salary1'] = Math.round(el.mini_salary / 1000) + 'k'
          el['max_salary1'] = Math.round(el.max_salary / 1000) + 'k'
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
  // 获取在招项目
  getProjectList(id) {
    wx.request({
      url: `${app.globalData.baseUrl}/Project/projectList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        re_company_id: id,
        page: 1,
        page_size: 99999
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.project_list
        console.log(listData)
        listData.forEach((el, index) => {
          el['mini_salary1'] = Math.round(el.mini_salary / 1000) + 'k'
          el['max_salary1'] = Math.round(el.max_salary / 1000) + 'k'
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
  // 关注
  guanzhuClick () {
    this.setData({
      guanzhuOnOff: !this.data.guanzhuOnOff
    })
  },
  // 切换tab
  changeTabs(e) {
    let tabCurrent = e.currentTarget.dataset.id
    this.setData({
      tabCurrent: tabCurrent
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