// pages/chooseCity/chooseCity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseActive: 'used',
    cityList: [
      {
        label: "河北",
        id: 1
      },
      {
        label: "山西",
        id: 2
      },
      {
        label: "吉林",
        id: 2
      },
      {
        label: "辽宁",
        id: 2
      },
      {
        label: "黑龙江",
        id: 2
      },
      {
        label: "陕西",
        id: 2
      },
      {
        label: "甘肃",
        id: 2
      },
      {
        label: "青海",
        id: 2
      },
      {
        label: "山东",
        id: 2
      },
      {
        label: "福建",
        id: 2
      },
      {
        label: "浙江",
        id: 2
      },
      {
        label: "河南",
        id: 2
      },
      {
        label: "湖北",
        id: 2
      },
      {
        label: "湖南",
        id: 2
      },
      {
        label: "江西",
        id: 2
      },
      {
        label: "江苏",
        id: 2
      },
      {
        label: "安徽",
        id: 2
      },
      {
        label: "广东",
        id: 2
      },
      {
        label: "海南",
        id: 2
      },
      {
        label: "四川",
        id: 2
      },
      {
        label: "贵州",
        id: 2
      },
      {
        label: "云南",
        id: 2
      },
      {
        label: "内蒙古",
        id: 2
      },
      {
        label: "新疆",
        id: 2
      },
      {
        label: "宁夏",
        id: 2
      },
      {
        label: "广西",
        id: 2
      },
      {
        label: "西藏",
        id: 2
      },
      {
        label: "香港",
        id: 2
      },
      {
        label: "澳门",
        id: 2
      }
    ]
  },
  chooseCity (e) {
    let stringId = e.currentTarget.dataset.id
    console.log(stringId)
    this.setData({
      chooseActive: stringId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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