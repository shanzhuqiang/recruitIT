// pages/talentResume/talentResume.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    topFilterBtn: '',
    filterBtn: '',
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
    jingyanData: [
      ["不限", "应届毕业生", "3年以内"],
      ["3-5年", "5-10年", "10年以上"]
    ],
    yuexinData: [
      ["不限", "2K以下", "2K-5K"],
      ["5K-10K", "10K-15K", "15K-25K"],
      ["25K-50K", "50K以上", ""]
    ],
    talentResumeList: [
      {}
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
    } else if (id === 'jingyan') {
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
    } else if (id === 'yuexin') {
      this.setData({
        filterList: this.data.yuexinData,
        filterTitle: '月薪范围',
        filterBtn: '不限',
        topFilterBtn: 'yuexin'
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