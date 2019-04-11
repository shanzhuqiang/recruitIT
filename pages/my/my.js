// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: '',
    releaseMark: false,
    imgSrc: ''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: app.globalData.userType,
      imgSrc: app.globalData.imgSrc
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
  // 完善简历
  goImproveResume() {
    wx.navigateTo({
      url: '../improveResume/improveResume'
    })
  },
  // hr简历
  goResume() {
    wx.navigateTo({
      url: '../resume/resume'
    })
  },
  // hr我的关注
  goMyGuanzhu() {
    wx.navigateTo({
      url: '../myGuanzhu/myGuanzhu'
    })
  },
  // 经纪人我的推荐
  goMyRecommend() {
    wx.navigateTo({
      url: '../myRecommend/myRecommend'
    })
  },
  // 我的投递
  goMyDelivery() {
    wx.navigateTo({
      url: '../myDelivery/myDelivery'
    })
  },
  // 我的任务
  goMyTask() {
    wx.navigateTo({
      url: '../myTask/myTask'
    })
  },
  // vip
  goVip() {
    wx.navigateTo({
      url: '../vip/vip'
    })
  },
  // 我的公司
  goMyCompany() {
    wx.navigateTo({
      url: '../myCompany/myCompany'
    })
  },
  // 我的金币
  goMyGold() {
    wx.navigateTo({
      url: '../myGold/myGold'
    })
  },
  // 我的钱包
  goMyMoney() {
    wx.navigateTo({
      url: '../myMoney/myMoney'
    })
  },
  // 我的消息
  goMyMessage() {
    wx.navigateTo({
      url: '../myMessage/myMessage'
    })
  },
  // 每日任务
  goTask() {
    wx.navigateTo({
      url: '../taskDay/taskDay'
    })
  },
  // 我的发布
  goMyRelease() {
    wx.navigateTo({
      url: '../myRelease/myRelease'
    })
  },
  // 关注公司
  goGUnzhugongsi() {
    wx.navigateTo({
      url: '../guanzhugongsi/guanzhugongsi'
    })
  },
  // 认证
  goRenzheng() {
    wx.navigateTo({
      url: '../renzheng/renzheng'
    })
  },
  // 进入首页
  goHome() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  // 进入赏金平台
  goBountyPlatform() {
    wx.navigateTo({
      url: '../bountyPlatform/bountyPlatform'
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
  // 成为推广人
  goSpread() {
    wx.navigateTo({
      url: '../spread/spread'
    })
  },
  // 设置
  goSetting() {
    wx.navigateTo({
      url: '../setting/setting'
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