// pages/searchFirst/searchFirst.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    userInfo: null,
    keyWord: '',
    dataList: [],
    filterStr: '',
    sortVal: '',
    filtertList: [
      {
        title: '工作区域',
        item: [
          ["不限", "上城区", "下城区"],
          ["江干区", "拱墅区", "西湖区"],
          ["滨江区", "萧山区", "余杭区"],
          ["桐庐县", "淳安县", "建德市"],
          ["富阳市", "临安市", ""]
        ]
      },
      {
        title: '学历要求',
        item: [
          ["不限", "大专", "本科"],
          ["硕士"]
        ]
      },
      {
        title: '薪资区间（元）',
        item: [
          ["最低价", "最高价"]
        ]
      }
    ],
    historyArray: [],
    keyWord: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      imgSrc: app.globalData.imgSrc
    })
    // 获取搜索缓存记录
    this.initGetStorage()
  },
  // 获取搜索缓存记录
  initGetStorage() {
    wx.getStorage({
      key: 'firstSearchKey',
      success: (res) => {
        this.setData({
          historyArray: res.data
        })
      }
    })
  },
  // 点击历史记录搜索
  searchHistory(e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      keyWord: key
    })
  },
  // 切换城市
  goChooseCity() {
    wx.navigateTo({
      url: '../chooseCity/chooseCity'
    })
  },
  // 打开默认排序
  openSort() {
    this.setData({
      filterStr: 'sort'
    }) 
  },
  // 选择排序方式
  chooseSort(e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      sortVal: key
    })
  },
  // 打开过滤
  openFilter() {
    this.setData({
      filterStr: 'filter'
    }) 
  },
  // 确认输入
  iptChange(e) {
    let keyWord = e.detail.value
    this.setData({
      keyWord: keyWord
    })
    this.getData()
    // let val = e.detail.value
    // this.setData({
    //   keyVal: val
    // })
    // if (val === '') {
    //   this.setData({
    //     sortVal: '',
    //     filterStr: ''
    //   })
    // }
  },
  // 获取简历数据
  getData () {
    wx.request({
      url: `${app.globalData.baseUrl}/Resume/resumeList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.userInfo.city_code,
        page: 1,
        page_size: 99999,
        keyword: this.data.keyWord
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.resume_list
        listData.forEach((el, index) => {
          el['mini_salary1'] = Math.round(el.mini_salary / 1000) + 'k'
          el['max_salary1'] = Math.round(el.max_salary / 1000) + 'k'
        })
        this.setData({
          dataList: listData
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