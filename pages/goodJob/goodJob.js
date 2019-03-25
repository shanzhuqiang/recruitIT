// pages/goodJob/goodJob.js
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
    jingyanData: [
      ["不限", "应届毕业生", "3年以内"],
      ["3-5年", "5-10年", "10年以上"]
    ],
    xueliData: [
      ["不限", "大专", "本科"],
      ["硕士"]
    ],
    shaixuanData: [
      ["不限", "今天发布", "三日内"],
      ["一周内", "两周内", ""]
    ],
    quartersList: [
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
  },
  // 选择过滤类型弹窗
  topFilter(e) {
    let id = e.currentTarget.dataset.id
    if (id === 'jingyan') {
      this.setData({
        filterList: this.data.jingyanData,
        filterTitle: '工作经验',
        filterBtn: '不限',
        topFilterBtn: 'jingyan'
      }, () => {
        this.setData({
          maskOnOff: true
        })
      })
    } else if (id === 'xueli') {
      this.setData({
        filterList: this.data.xueliData,
        filterTitle: '学历要求',
        filterBtn: '不限',
        topFilterBtn: 'xueli'
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