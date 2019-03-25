// pages/projectHall/projectHall.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '杭州',
    imgSrc: '',
    topFilterBtn: '',
    filterBtn: '',
    filterBtnZhouqi: '',
    maskOnOff: false,
    filterTitle: '',
    filterList: [],
    quyuData: [
      ["不限", "上城区", "下城区"],
      ["江干区", "拱墅区", "西湖区"],
      ["滨江区", "萧山区", "余杭区"],
      ["桐庐县", "淳安县", "建德市"],
      ["富阳市", "临安市", ""]
    ],
    jiageData: [
      ["最低价", "最高价", ""]
    ],
    shaixuanData: [
      ["不限", "应届毕业生", "3年以内"],
      ["3-5年", "5-10年", "10年以上"]
    ],
    projectList: [
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
  },
  // 选择过滤类型弹窗
  topFilter(e) {
    let id = e.currentTarget.dataset.id
    if (id === 'quyu') {
      this.setData({
        filterList: this.data.quyuData,
        filterTitle: '工作区域',
        filterBtn: '不限',
        topFilterBtn: 'quyu'
      }, () => {
        this.setData({
          maskOnOff: true
        })
      })
    } else if (id === 'jiage') {
      this.setData({
        filterList: this.data.jiageData,
        filterTitle: '价格区间（元）',
        filterBtn: '',
        topFilterBtn: 'jiage'
      }, () => {
        this.setData({
          maskOnOff: true
        })
      })
    } else if (id === 'shaixuan') {
      this.setData({
        filterList: this.data.shaixuanData,
        filterTitle: '工作经验',
        filterBtn: '不限',
        filterBtnZhouqi: '不限',
        topFilterBtn: 'shaixuan'
      }, () => {
        this.setData({
          maskOnOff: true
        })
      })
    }
  },
  // 选择过滤内容按钮
  chooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      filterBtn: id
    })
  },
  // 工作周期选择过滤内容按钮
  chooseFilterZhouqi(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      filterBtnZhouqi: id
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