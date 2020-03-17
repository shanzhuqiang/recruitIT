// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authMask: false,
    // home
    imgSrc: '',
    userInfo:  null,
    bannerImg: [],
    titleChoosed: 'project',
    projectList: [],
    quartersList: [],
    talentResumeList: [],
    userType: '',
    releaseMark: false,
    // getPhoneMaskOnOff: true
    getPhoneMaskOnOff: false,
    unReadNum: 0,
    basePage: '',
    cityName: '全国',
    cityCode: '',
    firstBtn: true,
    is_shenhe: null
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUnRead()
    // 初始化
    this.initTimes()
  },
  jupgeVersion(version) {
    wx.request({
      url: `${app.globalData.baseUrl}/index/getVersionInfo`,
      data: {
        version: "2.0"
      },
      success: (res) => {
        let is_shenhe = res.data.bizobj.is_shenhe
        app.globalData.is_shenhe = is_shenhe
        this.setData({
          is_shenhe: is_shenhe
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jupgeVersion()
    this.getBanner()
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 获取banner
  getBanner () {
    wx.request({
      url: `${app.globalData.baseUrl}/web/bannerList`,
      method: 'GET',
      success: (res) => {
        this.setData({
          bannerImg: res.data.bizobj.banner_list
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
  initTimes() {
    // 拿到登陆信息
    if (app.globalData.sess_key !== "") {
      let userInfo = app.globalData.userInfo
      this.setData({
        userInfo: userInfo
      })
      // 认证过了
      let userType = ""
      if (userInfo && userInfo.identity_auth) {
        if (userInfo.identity_auth.is_engineer == 1) {
          userType = "engineer"
          app.globalData.userType = userType
          this.setData({
            userType: userType,
            basePage: 'two'
          })
          this.initProjectData()
          this.initQuartersData()
        } else if (userInfo.identity_auth.is_hr == 1) {
          userType = "hr"
          app.globalData.userType = userType
          this.setData({
            userType: userType,
            basePage: 'two'
          })
          this.initResumeData()
        } else if (userInfo.identity_auth.is_agent == 1) {
          userType = "agent"
          app.globalData.userType = userType
          this.setData({
            userType: userType,
            basePage: 'two'
          })
          this.initResumeData()
        } else {
          this.setData({
            basePage: 'one'
          })
        }
      } else {
        this.setData({
          basePage: 'one'
        })
      }
    } else {
      setTimeout(() => {
        this.initTimes()
      }, 100)
    }
  },
  // 获取未读消息
  getUnRead() {
    if (app.globalData.sess_key) {
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
    } else {
      setTimeout(() => {
        this.getUnRead()
      }, 100)
    }
  },
  // 前往认证
  goHomePage(e) {
    if (this.data.is_shenhe === 1) {
      let userType = e.currentTarget.dataset.id
      let data = {
          avatar: "",
          city_code: "330100",
          city_name: "杭州市",
          gender: 1,
          id: 326,
        identity_auth: { is_engineer: userType === 'engineer' ? 1 : 2, is_hr: userType === 'hr' ? 1 : 2, is_agent: userType === 'agent' ? 1 : 2 },
          lat: "30.04885",
          lng: "119.96043",
          mobile: "",
          nickname: "用户",
          password: "",
          session_key: "",
          username: "",
      }
      app.globalData.userInfo = data
      this.setData({
        userType: userType,
        basePage: 'two'
      })
      if (userType === "engineer") {
        this.initProjectData()
        this.initQuartersData()
      }
      if (userType === "hr" || userType === "agent") {
        this.initResumeData()
      }
    } else if (this.data.is_shenhe === 0) {
      if (app.globalData.userInfo) {
        wx.navigateTo({
          url: `../renzheng/renzheng?shenfen=${e.currentTarget.dataset.id}`
        })
      } else {
        this.setData({
          authMask: true
        })
      }
    }
  },
  // 取消登录
  cancelLogin() {
    this.setData({
      authMask: false
    })
  },
  // 用户授权结果回调
  bindgetuserinfo(res) {
    if (res.detail.errMsg != "getUserInfo:fail auth deny") {
      this.setData({
        authMask: false
      })
      app.updateUserinfo(res.detail)
    }
  },
  // 进入赏金平台
  goBountyPlatform() {
    if (this.data.userType === 'agent') {
      wx.redirectTo({
        url: '../bountyPlatform/bountyPlatform'
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '该功能仅经纪人可用'
      })
    }
  },
  // 发布帖子
  goReleaseBbs() {
    // wx.showModal({
    //   title: '提示',
    //   showCancel: false,
    //   content: '该功能暂未开放'
    // })
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
    // wx.showModal({
    //   title: '提示',
    //   showCancel: false,
    //   content: '该功能暂未开放'
    // })
    wx.redirectTo({
      url: '../bbs/bbs'
    })
  },
  // 进入我的
  goMy() {
    wx.redirectTo({
      url: '../my/my'
    })
  },
  // 简历
  goResumeDetail(e) {
    wx.navigateTo({
      url: `../resumeDetail/resumeDetail?id=${e.currentTarget.dataset.id}`
    })
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
        // city_code: this.data.userInfo.city_code,
        city_code: this.data.cityCode,
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
        // city_code: this.data.userInfo.city_code,
        city_code: this.data.cityCode,
        is_bonus: 2,
        sort: 1,
        page: 1,
        is_hot:1,
        page_size: 20
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
  // 最新简历初始化
  initResumeData () {
    wx.request({
      url: `${app.globalData.baseUrl}/Resume/resumeList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        // city_code: this.data.userInfo.city_code,
        city_code: this.data.cityCode,
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
  updateBlogs() {
    this.initProjectData()
    this.initQuartersData()
    this.initResumeData()
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
    // } else if (this.data.userType === 'hr') {
     } else {
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
    // wx.showModal({
    //   title: '提示',
    //   showCancel: false,
    //   content: '该功能暂未开放'
    // })
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
    this.updateBlogs()
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
      title: '夯大猎',
      path: `/pages/index/index`
    }
  }
})