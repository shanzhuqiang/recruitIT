// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    userInfo:  null,
    bannerImg: ['../../images/banner.png', '../../images/banner.png', '../../images/banner.png'],
    titleChoosed: 'project',
    projectList: [],
    quartersList: [],
    talentResumeList: [],
    userType: '',
    releaseMark: false,
    // getPhoneMaskOnOff: true
    getPhoneMaskOnOff: false,
    unReadNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      userType: app.globalData.userType,
      imgSrc: app.globalData.imgSrc
    })
    // 工程师加载项目和岗位
    if (this.data.userType === 'engineer') {
      this.initProjectData()
      this.initQuartersData()
    } else {
      this.initResumeData()
    }
    this.getUnRead()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getUnRead () {
    wx.request({
      url: `${app.globalData.baseUrl}/notice/noticeCount.html`,
      data: {
        sess_key: app.globalData.sess_key
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          unReadNum: res.data.bizobj.data.new_message
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
  // 初始化授权
  initAuth() {
    if (app.globalData.userInfo) {
      // if (app.globalData.userInfo && app.globalData.userInfo.phone) {
      this.setData({
        getPhoneMaskOnOff: false
      })
    }
  },
  // getPhoneNumber(e) {
  //   if (e.detail.errMsg === 'getPhoneNumber:ok') {
  //     this.setData({
  //       getPhoneMaskOnOff: false
  //     })
  //     console.log(e)
  //     console.log(e.detail.errMsg)
  //     console.log(e.detail.iv)
  //     console.log(e.detail.encryptedData)
  //   }
  // },
  // 进入赏金平台
  goBountyPlatform() {
    wx.redirectTo({
      url: '../bountyPlatform/bountyPlatform'
    })
    // if (this.data.userType === 'agent') {
    //   wx.redirectTo({
    //     url: '../bountyPlatform/bountyPlatform'
    //   })
    // } else {
    //   wx.showModal({
    //     title: '提示',
    //     content: '该功能仅经纪人可用'
    //   })
    // }
  },
  // 发布帖子
  goReleaseBbs() {
    wx.navigateTo({
      url: '../releaseBbs/releaseBbs'
    })
    this.setData({
      releaseMark: false
    })
  },
  // 发布岗位
  goReleaseGangwei() {
    wx.navigateTo({
      url: '../releaseGangwei/releaseGangwei'
    })
    this.setData({
      releaseMark: false
    })
  },
  // 发布项目
  goReleaseProject() {
    wx.navigateTo({
      url: '../releaseProject/releaseProject'
    })
    this.setData({
      releaseMark: false
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
    wx.redirectTo({
      url: '../bbs/bbs'
    })
  },
  // 进入我的
  goMy() {
    wx.redirectTo({
      url: '../my/my'
    })
    // if (this.data.userType === 'engineer' && this.data.userInfo.identity_auth.is_engineer == 2) {
    //   wx.navigateTo({
    //     url: '../renzheng/renzheng'
    //   })  
    // } else if (this.data.userType === 'hr' && this.data.userInfo.identity_auth.is_hr == 2) {
    //   wx.navigateTo({
    //     url: '../renzheng/renzheng'
    //   })
    // } else if (this.data.userType === 'agent' && this.data.userInfo.identity_auth.is_agent == 2) {
    //   wx.navigateTo({
    //     url: '../renzheng/renzheng'
    //   })
    // } else {
    //   wx.redirectTo({
    //     url: '../my/my'
    //   })
    // }
  },
  // 简历
  goResumeDetail(e) {
    if (this.data.userType === 'agent') {
      wx.navigateTo({
        url: `../resumeDetail/resumeDetail?id=${e.currentTarget.dataset.id}`
      })
    }
  },
  // 岗位信息
  goPostDetail(e) {
    wx.navigateTo({
      url: `../postDetail/postDetail?id=${e.currentTarget.dataset.id}`
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
        city_code: this.data.userInfo.city_code,
        is_bonus: 2,
        sort: 1,
        page: 1,
        page_size: 20
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
  // 最新岗位初始化
  initQuartersData() {
    wx.request({
      url: `${app.globalData.baseUrl}/Work/workList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        education: "1",
        city_code: this.data.userInfo.city_code,
        is_bonus: 2,
        sort: 1,
        page: 1,
        page_size: 20
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
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
  // 最新简历初始化
  initResumeData () {
    wx.request({
      url: `${app.globalData.baseUrl}/Resume/resumeList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.userInfo.city_code,
        sort: 1,
        page: 1,
        page_size: 20
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.resume_list
        listData.forEach((el, index) => {
          if (el.max_salary) {
            el['salaryStr'] = Math.round(el.mini_salary / 1000) + 'k-' + Math.round(el.max_salary / 1000) + 'k/月'
          } else {
            el['salaryStr'] = '不限'
          }
        })
        this.setData({
          talentResumeList: listData
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
    if (this.data.userType === 'engineer') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '当前身份不可查看',
      })
    } else {
      wx.navigateTo({
        url: '../talentResume/talentResume'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    return {
      title: '寻猿招聘',
      path: `/pages/index/index`,
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    }
  }
})