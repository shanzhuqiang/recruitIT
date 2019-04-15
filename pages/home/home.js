// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    cityInfo:  null,
    bannerImg: ['../../images/banner.png', '../../images/banner.png', '../../images/banner.png'],
    titleChoosed: 'project',
    projectList: [],
    quartersList: [],
    talentResumeList: [{}],
    userType: '',
    releaseMark: false,
    // getPhoneMaskOnOff: true
    getPhoneMaskOnOff: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: app.globalData.userType,
      imgSrc: app.globalData.imgSrc
    })
    this.initProjectData()
    this.initQuartersData()
    // this.initAuth()
    // this.initQuartersData()
  },
  // 初始化授权
  initAuth() {
    if (app.globalData.userInfo) {
      // if (app.globalData.userInfo && app.globalData.userInfo.phone) {
      this.setData({
        getPhoneMaskOnOff: false
      })
    }
  },
  getPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      this.setData({
        getPhoneMaskOnOff: false
      })
      console.log(e)
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
    }
  },
  // 进入赏金平台
  goBountyPlatform() {
    wx.navigateTo({
      url: '../bountyPlatform/bountyPlatform'
    })
  },
  // 发布帖子
  goReleaseBbs() {
    wx.navigateTo({
      url: '../releaseBbs/releaseBbs'
    })
  },
  // 发布岗位
  goReleaseGangwei() {
    wx.navigateTo({
      url: '../releaseGangwei/releaseGangwei'
    })
  },
  // 发布项目
  goReleaseProject() {
    wx.navigateTo({
      url: '../releaseProject/releaseProject'
    })
  },
  // 发布
  goRelease() {
    this.setData({
      releaseMark: true
    })
  },
  closeRelease() {
    this.setData({
      releaseMark: false
    })
  },
  // 进入论坛
  goBbs() {
    wx.navigateTo({
      url: '../bbs/bbs'
    })
  },
  // 进入我的
  goMy() {
    wx.navigateTo({
      url: '../my/my'
    })
  },
  // 简历
  goResumeDetail() {
    wx.navigateTo({
      url: '../resumeDetail/resumeDetail'
    })
  },
  // 岗位信息
  goPostDetail() {
    wx.navigateTo({
      url: '../postDetail/postDetail'
    })
  },
  // 项目信息
  goProjectDetail(e) {
    wx.navigateTo({
        url: `../projectDetail/projectDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  // 最新项目初始化
  initProjectData() {
    wx.request({
      url: `${app.globalData.baseUrl}/Project/projectList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        page_size: 20
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.project_list
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
  // 最新岗位初始化
  initQuartersData() {
    wx.request({
      url: `${app.globalData.baseUrl}/Work/workList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        page_size: 20
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        let listData = res.data.bizobj.data.job_list
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
  // title切换
  chooseTitle (e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      titleChoosed: key
    })
  },
  // 搜索
  goHomeSearch () {
    if (this.data.userType === 'engineer') {
      wx.navigateTo({
        url: '../searchFirst/searchFirst'
      })
    } else if (this.data.userType === 'hr') {
      wx.navigateTo({
        url: '../searchSecond/searchSecond'
      })
    }
  },
  // 切换城市
  goChooseCity() {
    wx.navigateTo({
      url: '../chooseCity/chooseCity'
    })
  },
  // 平台推广
  goSpread() {
    wx.navigateTo({
      url: '../spread/spread'
    })
  },
  // 金币投票
  goGoldVote() {
    wx.navigateTo({
      url: '../goldVote/goldVote'
    })
  },
  // 名企专区
  goEnterprise() {
    wx.navigateTo({
      url: '../enterprise/enterprise'
    })
  },
  // 职位精选
  goGoodJob() {
    wx.navigateTo({
      url: '../goodJob/goodJob'
    })
  },
  // 项目大厅
  goProjectHall() {
    wx.navigateTo({
      url: '../projectHall/projectHall'
    })
  },
  // 人才简历
  goTalentResume() {
    wx.navigateTo({
      url: '../talentResume/talentResume'
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