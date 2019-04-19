// pages/searchFirst/searchFirst.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    userInfo: null,
    typeStr: 'xiangmu',
    keyWord: '',
    filterStr: '',
    xiangmuMask: false,
    quyuData: [],
    quyuChoose: '',
    xiangmuSort: '',
    xiangmuFiltertList: [],
    mini_salary: '',
    max_salary: '',
    xmJingyanData: [
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
    xmJingyanChoose: '',
    xmZhouqiChoose: '',
    gangweiMask: false,
    gangweiSort: '',
    gwJingyanChoose: '',
    xueliData: [
      [
        {
          id: 1,
          name: "不限"
        },
        {
          id: 5,
          name: "大专"
        },
        {
          id: 6,
          name: "本科"
        }
      ],
      [
        {
          id: 7,
          name: "硕士"
        }
      ]
    ],
    timeData: [
      [{
        id: '1',
        name: '不限'
      }, {
          id: '2',
          name: '今天发布'
        }, {
          id: '3',
          name: '三日内'
        }],
      [{
        id: '4',
        name: '一周内'
      }, {
        id: '5',
        name: '两周内'
      }, {
        id: '',
        name: null
      }]
    ],
    gwXueliChoose: '1',
    gwTimeChoose: '1',
    gwZhouqiChoose: '',
    projectList: [],
    quartersList: [],
    historyArray: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      imgSrc: app.globalData.imgSrc
    })
    // 获取城市下的区
    this.getArea()
    // 获取搜索缓存记录
    this.initGetStorage()
  },
  // 获取搜索缓存记录
  initGetStorage () {
    wx.getStorage({
      key: 'firstSearchKey',
      success: (res) => {
        this.setData({
          historyArray: res.data
        })
      }
    })
  },
  // 项目筛选确认
  xiangmuConfirm () {
    this.setData({
      xiangmuMask: false
    })
    this.searchProjectList()
  },
  // 项目工作经验
  xmJingyanChooseFilter (e) {
    this.setData({
      xmJingyanChoose: e.currentTarget.dataset.id
    })
  },
  // 项目工作周期
  xmZhouqiChooseFilter(e) {
    this.setData({
      xmZhouqiChoose: e.currentTarget.dataset.id
    })
  },
  // 项目最低价输入
  miniSalaryChange(e) {
    this.setData({
      mini_salary: e.detail.value
    })
  },
  // 项目最高价输入
  maxSalaryChange(e) {
    this.setData({
      max_salary: e.detail.value
    })
  },
  // 项目排序
  xiangmuSortChoose (e) {
    this.setData({
      xiangmuSort: e.currentTarget.dataset.id,
      xiangmuMask: false
    })
    this.searchProjectList()
  },
  // 项目区域选择
  quyuChooseFilter (e) {
    this.setData({
      quyuChoose: e.currentTarget.dataset.id
    })
  },
  // 岗位筛选确认
  gangweiConfirm () {
    this.setData({
      gangweiMask: false
    })
    this.searchWorkList()
  },
  // 岗位排序
  gangweiSortChoose(e) {
    this.setData({
      gangweiSort: e.currentTarget.dataset.id,
      gangweiMask: false
    })
    this.searchWorkList()
  },
  // 岗位经验
  gwJingyanChooseFilter (e) {
    this.setData({
      gwJingyanChoose: e.currentTarget.dataset.id
    })
  },
  // 岗位学历
  gwXueliChooseFilter(e) {
    this.setData({
      gwXueliChoose: e.currentTarget.dataset.id
    })
  },
  // 岗位发布时间
  gwTimeChooseFilter (e) {
    this.setData({
      gwTimeChoose: e.currentTarget.dataset.id
    })
  },
  // 岗位发布周期
  gwZhouqiChooseFilter (e) {
    this.setData({
      gwZhouqiChoose: e.currentTarget.dataset.id
    })
  },
  // 打开默认排序
  openSort (e) {
    let key = e.currentTarget.dataset.id
    if (this.data.typeStr === "xiangmu") {
      if (this.data.filterStr === key && this.data.xiangmuMask) {
        this.setData({
          xiangmuMask: false
        })
      } else {
        this.setData({
          xiangmuMask: true,
          filterStr: 'sort'
        })
      }
    } else if (this.data.typeStr === "gangwei") {
      if (this.data.filterStr === key && this.data.gangweiMask) {
        this.setData({
          gangweiMask: false
        })
      } else {
        this.setData({
          gangweiMask: true,
          filterStr: 'sort'
        })
      }
    }
  },
  // 打开过滤
  openFilter(e) {
    let key = e.currentTarget.dataset.id
    let filtertListData
    if (this.data.typeStr === "xiangmu") {
      if (this.data.filterStr === key && this.data.xiangmuMask) {
        this.setData({
          xiangmuMask: false
        })
      } else {
        this.setData({
          xiangmuMask: true,
          filterStr: 'filter'
        })
      }
    } else if (this.data.typeStr === "gangwei") {
      if (this.data.filterStr === key && this.data.gangweiMask) {
        this.setData({
          gangweiMask: false
        })
      } else {
        this.setData({
          gangweiMask: true,
          filterStr: 'filter'
        })
      }
    }
  },
  // 输入框内容改变
  clearList (e) {
    if (e.detail.value === '') {
      this.setData({
        filterStr: '',
        projectList: [],
        quartersList: [],
        xiangmuMask: false,
        gangweiMask: false
      })
    }
  },
  // 点击历史记录搜索
  searchHistory(e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      keyWord: key
    })
    if (this.data.typeStr === 'xiangmu') {
      this.setData({
        filterStr: '',
        xiangmuSort: '',
        quyuChoose: '',
        mini_salary: '',
        max_salary: '',
        xmJingyanChoose: '',
        xmZhouqiChoose: '',
        xiangmuMask: false
      })
      this.searchProjectList()
    } else {
      this.setData({
        filterStr: '',
        gangweiSort: '',
        gwJingyanChoose: '',
        gwXueliChoose: '1',
        gwTimeChoose: '1',
        gwZhouqiChoose: '',
        gangweiMask: false
      })
      this.searchWorkList()
    }
  },
  // 输入框确认
  iptChange (e) {
    let keyWord = e.detail.value
    this.setData({
      keyWord: keyWord
    })
    if (this.data.typeStr === 'xiangmu') {
      this.setData({
        filterStr: '',
        xiangmuSort: '',
        quyuChoose: '',
        mini_salary: '',
        max_salary: '',
        xmJingyanChoose: '',
        xmZhouqiChoose: '',
        xiangmuMask: false
      })
      this.searchProjectList()
    } else {
      this.setData({
        filterStr: '',
        gangweiSort: '',
        gwJingyanChoose: '',
        gwXueliChoose: '1',
        gwTimeChoose: '1',
        gwZhouqiChoose: '',
        gangweiMask: false
      })
      this.searchWorkList()
    }
    // 存入本地缓存
    let newHistoryArray = []
    let historyArray = this.data.historyArray
    if (historyArray.length > 4) {
      newHistoryArray = [keyWord, ...historyArray.slice(0, 4)]
    } else {
      newHistoryArray = [keyWord, ...historyArray]
    }
    this.setData({
      historyArray: newHistoryArray
    })
    wx.setStorage({
      key: 'firstSearchKey',
      data: newHistoryArray
    })
  },
  // 搜索项目
  searchProjectList() {
    wx.request({
      url: `${app.globalData.baseUrl}/Project/projectList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.userInfo.city_code,
        district_code: this.data.quyuChoose,
        mini_salary: this.data.mini_salary,
        max_salary: this.data.max_salary,
        job_experience: this.data.xmJingyanChoose,
        nature: this.data.xmZhouqiChoose,
        page: 1,
        page_size: 99999,
        keyword: this.data.keyWord,
        sort: this.data.xiangmuSort
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.project_list
        listData.forEach((el, index) => {
          el['mini_salary1'] = Math.round(el.mini_salary / 1000) + 'k'
          el['max_salary1'] = Math.round(el.max_salary / 1000) + 'k'
        })
        this.setData({
          projectList: listData
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
  // 搜索岗位
  searchWorkList() {
    wx.request({
      url: `${app.globalData.baseUrl}/Work/workList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.userInfo.city_code,
        sort: this.data.gangweiSort,
        nature: this.data.gwZhouqiChoose, 
        create_time: this.data.gwTimeChoose,
        education: this.data.gwXueliChoose,
        job_experience: this.data.gwJingyanChoose,
        page: 1,
        page_size: 99999,
        keyword: this.data.keyWord
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.job_list
        listData.forEach((el, index) => {
          el['mini_salary1'] = Math.round(el.mini_salary / 1000) + 'k'
          el['max_salary1'] = Math.round(el.max_salary / 1000) + 'k'
        })
        this.setData({
          quartersList: listData
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
  // 获取区域
  getArea() {
    wx.request({
      url: `${app.globalData.baseUrl}/Addr/prov2CityList.html`,
      data: {
        sess_key: app.globalData.sess_key,
        city_code: this.data.userInfo.city_code
      },
      method: 'POST',
      success: (res) => {
        let listData = res.data.bizobj.data.area_list
        console.log(listData)
        listData.unshift({
          city_code: '',
          city_name: '不限'
        })
        let hangyeData = []
        let length = parseInt(listData.length / 3)
        let n = 0;
        for (let i = 1; i <= length; i++) {
          var star = (i - 1) * 3;
          hangyeData[n++] = listData.slice(star, star + 3);
        }
        let y = listData.length - length * 3;
        if (y > 0) {
          let newArr = listData.slice(length * 3)
          if (newArr.length === 2) {
            newArr.push({
              id: '',
              name: null
            })
          }
          hangyeData[n++] = newArr
        }
        this.setData({
          quyuData: hangyeData
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
  // 切换城市
  goChooseCity() {
    wx.navigateTo({
      url: '../chooseCity/chooseCity'
    })
  },
  // 改变搜索类型
  chooseType(e) {
    this.setData({
      typeStr: e.currentTarget.dataset.id
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