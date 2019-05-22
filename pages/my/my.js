// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: '',
    userInfo: null,
    releaseMark: false,
    imgSrc: '',
    num: ''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getNum()
  },
  // 获取金币/猎币
  getNum() {
    let userType = this.data.userType
    wx.request({
      url: `${app.globalData.baseUrl}/Coin/coinLog.html`,
      data: {
        sess_key: app.globalData.sess_key,
        way: this.data.typeStr,
        user_type: userType === 'engineer' ? 1 : userType === 'hr' ? 2 : 3
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data
        this.setData({
          num: listData.total_coin
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
  // 我的下载
  goMyDownResume() {
    wx.navigateTo({
      url: '../myDown/myDown'
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
    if (this.data.userType == 'engineer') {
      wx.navigateTo({
        url: '../myGold/myGold'
      })
    } else {
      wx.navigateTo({
        url: '../myGold2/myGold2'
      })
    }
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
    // wx.navigateTo({
    //   url: '../renzheng/renzheng'
    // })
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