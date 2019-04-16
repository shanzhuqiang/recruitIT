// pages/projectHall/projectHall.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    cityInfo: null,
    mask: false,
    page: 1,
    imgSrc: '',
    topFilterBtn: '',
    quyuData: [
      ["不限", "上城区", "下城区"],
      ["江干区", "拱墅区", "西湖区"],
      ["滨江区", "萧山区", "余杭区"],
      ["桐庐县", "淳安县", "建德市"],
      ["富阳市", "临安市", ""]
    ],
    quyuChoose: '不限',
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
    listData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cityInfo: app.globalData.cityInfo,
      imgSrc: app.globalData.imgSrc
    })
    this.getList()
  },
  miniSalaryChange(e) {
    this.setData({
      mini_salary: e.detail.value
    })
  },
  maxSalaryChange(e) {
    this.setData({
      max_salary: e.detail.value
    })
  },
  // 区域选择过滤内容按钮
  quyuChooseFilter(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      page: 1,
      mask: false,
      quyuChoose: id,
      mini_salary: '',
      max_salary: '',
      shaixuan1: '',
      shaixuan2: ''
    })
    this.getList()
  },
  // 价格确定
  confirmFilterjiage() {
    this.setData({
      page: 1,
      mask: false,
      quyuChoose: '不限',
      shaixuan1: '',
      shaixuan2: ''
    })
    this.getList()
  },
  // 筛选确定
  confirmFilter() {
    this.setData({
      page: 1,
      mask: false,
      quyuChoose: '不限',
      mini_salary: '',
      max_salary: ''
    })
    this.getList()
  },
  // 最新项目初始化
  getList() {
    console.log()
    this.setData({
      loading: true
    })
    wx.request({
      url: `${app.globalData.baseUrl}/Project/projectList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.cityInfo.city_code,
        district_code: this.data.quyuChoose,
        mini_salary: this.data.mini_salary,
        max_salary: this.data.max_salary,
        job_experience: this.data.shaixuan1,
        nature: this.data.shaixuan2,
        page_size: 10,
        page: this.data.page
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.project_list
        console.log(listData)
        if (listData.length > 0) {
          listData.forEach((el, index) => {
            el['mini_salary1'] = Math.round(el.mini_salary / 1000) + 'k'
            el['max_salary1'] = Math.round(el.max_salary / 1000) + 'k'
          })
          let newList = this.data.listData
          this.setData({
            listData: [...newList, ...listData],
            page: this.data.page + 1
          })
        }
        this.setData({
          loading: false
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
  // 选择过滤类型弹窗
  topFilter(e) {
    let id = e.currentTarget.dataset.id
    if (this.data.topFilterBtn === id && this.setData.mask) {
      this.setData({
        mask: false
      })
    } else {
      if (id === 'quyu') {
        this.setData({
          mask: true,
          topFilterBtn: 'quyu'
        })
      } else if (id === 'jiage') {
        this.setData({
          mask: true,
          topFilterBtn: 'jiage'
        })
      } else if (id === 'shaixuan') {
        this.setData({
          mask: true,
          topFilterBtn: 'shaixuan'
        })
      }
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})