// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    address: '杭州',
    bannerImg: ['../../images/banner.png', '../../images/banner.png', '../../images/banner.png'],
    titleChoosed: 'project',
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
    this.initProjectData()
    // this.initQuartersData()
  },
  // 最新项目初始化
  initProjectData() {
    let projectList = [
      {
        title: '我需要app设计我需要app设计我需要app设计',
        money: '20k-30k/月',
        address: '杭州',
        time: '3-5年',
        typeOne: '短期兼职',
        content: '需要ad阿萨德阿萨德开发啊是，需要ad阿萨德阿萨德开发啊是，需要ad阿萨德阿萨德开发啊是，需要ad阿萨德阿萨德开发啊是',
        peopleNum: '3'
      },
      {
        title: '我需要ap',
        money: '21k-32k/月',
        address: '杭州',
        time: '3-8年',
        typeOne: '短期兼职',
        content: '需要ad阿萨德阿萨德开发要ad阿萨德阿萨德开发啊是，需要ad阿萨德阿萨德开发啊是',
        peopleNum: '4'
      }
    ]
    this.setData({
      projectList: projectList
    })
  },
  // 最新岗位初始化
  initQuartersData() {
    let quartersList = [
      {
        title: '前端工程师',
        money: '10-20万',
        address: '杭州',
        time: '3-5年',
        education: '本科',
        name: '杭州平面设计有限公司',
        typeOne: '互联网·电商',
        img: '../../images/logo.png'
      }
    ]
    this.setData({
      quartersList: quartersList
    })
  },
  // title切换
  chooseTitle (e) {
    let key = e.currentTarget.dataset.id
    if (key === 'project') {
      this.setData({
        quartersList: [],
        titleChoosed: key
      })
      this.initProjectData()
    } else {
      this.setData({
        projectList: [],
        titleChoosed: key
      })
      this.initQuartersData()
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
  // 平台推广
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