// pages/bountyPlatform/bountyPlatform.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    releaseMark: false,
    topType: 'xiangmu',
    xiangmuFilter: '',
    xiangmuMask: false,
    quyuData: [],
    quyuChoose: '',
    mini_salary: '',
    max_salary: '',
    shaixuanData: [
      [
        {
          id: '',
          name: "不限"
        },
        {
          id: 1,
          name: "应届毕业生"
        },
        {
          id: 2,
          name: "3年以内"
        }
      ],
      [
        {
          id: 3,
          name: "3-5年"
        },
        {
          id: 4,
          name: "5-10年"
        },
        {
          id: 5,
          name: "10年以上"
        }
      ]
    ],
    shaixuan1: '',
    shaixuan2: '',
    page: 1,
    // 招聘
    zhaopinFilter: '',
    zhaopinMask: false,
    jingyanData: [
      [{
        id: '',
        name: '不限'
      }, {
        id: '1',
        name: '应届毕业生'
      }, {
        id: '2',
        name: '3年以内'
      }],
      [{
        id: '3',
        name: '3-5年'
      }, {
        id: '4',
        name: '5-10年'
      }, {
        id: '5',
        name: '10年以上'
      }]
    ],
    jingyanChoose: '',
    xueliData: [
      [{
        id: '1',
        name: '不限'
      }, {
        id: '5',
        name: '大专'
      }, {
        id: '6',
        name: '本科'
      }],
      [{
        id: '7',
        name: '硕士'
      }]
    ],
    xueliChoose: '1',
    zhouqiChoose: ''
  },
  // 招聘过滤
  zhaopinBtn(e) {
    let key = e.currentTarget.dataset.id
    if (this.data.zhaopinFilter === key && this.data.zhaopinMask) {
      this.setData({
        zhaopinMask: false
      })
    } else {
      this.setData({
        zhaopinMask: true,
        zhaopinFilter: key
      })
    }
  },
  // 经验选择
  jingyanChooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      jingyanChoose: id,
      xueliChoose: '1',
      zhouqiChoose: '',
      page: 1,
      listData: [],
      zhaopinMask: false
    })
    this.getZhaopinList()
  },
  // 学历选择
  xueliChooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      xueliChoose: id,
      jingyanChoose: '',
      zhouqiChoose: '',
      page: 1,
      listData: [],
      zhaopinMask: false
    })
    this.getZhaopinList()
  },
  // 周期选择
  zhouqiChooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      zhouqiChoose: id,
      jingyanChoose: '',
      xueliChoose: '1',
      page: 1,
      listData: [],
      zhaopinMask: false
    })
    this.getZhaopinList()
  },
  // 获得招聘列表
  getZhaopinList() {

  },
  // 获得项目列表
  getProjectList() {

  },
  miniSalaryChange(e) {
    this.setData({
      mini_salary: Number(e.detail.value)
    })
  },
  maxSalaryChange(e) {
    this.setData({
      max_salary: Number(e.detail.value)
    })
  },
  // 区域选择过滤内容按钮
  quyuChooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      page: 1,
      xiangmuMask: false,
      quyuChoose: id,
      mini_salary: '',
      max_salary: '',
      shaixuan1: '',
      shaixuan2: '',
      listData: []
    })
    this.getProjectList()
  },
  // 价格确定
  confirmFilterjiage() {
    this.setData({
      page: 1,
      xiangmuMask: false,
      quyuChoose: '',
      shaixuan1: '',
      shaixuan2: '',
      listData: []
    })
    this.getProjectList()
  },
  // 筛选确定
  confirmFilter() {
    this.setData({
      page: 1,
      xiangmuMask: false,
      quyuChoose: '',
      mini_salary: '',
      max_salary: '',
      listData: []
    })
    this.getProjectList()
  },
  // 项目过滤点击
  xiangmuBtn(e) {
    let key = e.currentTarget.dataset.id
    if (this.data.xiangmuFilter === key && this.data.xiangmuMask) {
      this.setData({
        xiangmuMask: false
      })
    } else {
      this.setData({
        xiangmuMask: true,
        xiangmuFilter: key
      })
    }
  },
  // 工作经验选择
  shaixuanchooseFilter1(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      shaixuan1: id
    })
  },
  // 工作周期选择
  shaixuanchooseFilter2(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      shaixuan2: id
    })
  },
  // 项目/招聘切换
  changeTopType(e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      topType: key,
      zhaopinMask: false,
      xiangmuMask: false,
      xiangmuFilter: '',
      zhaopinFilter: '',
      page: 1,
      xiangmuMask: false,
      quyuChoose: '',
      mini_salary: '',
      max_salary: '',
      listData: [],
      jingyanChoose: '',
      xueliChoose: '1',
      zhouqiChoose: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
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
  // 进入我的
  goMy() {
    if (this.data.userType === 'engineer' && this.data.userInfo.identity_auth.is_engineer == 2) {
      wx.navigateTo({
        url: '../renzheng/renzheng'
      })
    } else if (this.data.userType === 'hr' && this.data.userInfo.identity_auth.is_hr == 2) {
      wx.navigateTo({
        url: '../renzheng/renzheng'
      })
    } else if (this.data.userType === 'agent' && this.data.userInfo.identity_auth.is_agent == 2) {
      wx.navigateTo({
        url: '../renzheng/renzheng'
      })
    } else {
      wx.navigateTo({
        url: '../my/my'
      })
    }
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