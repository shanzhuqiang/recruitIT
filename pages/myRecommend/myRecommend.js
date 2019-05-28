// pages/myRecommend/myRecommend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    tabType: 'all',
    listData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
    this.getDataList()
  },
  // 切换类型
  chooseType(e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      tabType: key
    })
    this.getDataList()
  },
  // 获取数据
  getDataList() {
    wx.showLoading({
      mask: true,
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.baseUrl}/rec/recList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        offer: this.data.tabType === 'all' ? '' : this.data.tabType,
        page: 1,
        page_size: 99999
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading()
        let listData = res.data.bizobj.data.rec_list
        listData.forEach((el, index) => {
          if (el.max_salary) {
            el['salaryStr'] = Math.round(el.mini_salary / 1000) + 'k-' + Math.round(el.max_salary / 1000) + 'k/月'
          } else {
            el['salaryStr'] = '不限'
          }
        })
        this.setData({
          listData: listData
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
  // 进入简历
  goEngineer() {
    wx.navigateTo({
      url: '../resumeDetail/resumeDetail'
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

  }
})