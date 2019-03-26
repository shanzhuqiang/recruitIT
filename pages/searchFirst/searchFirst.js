// pages/searchFirst/searchFirst.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    address: '杭州',
    typeStr: 'xiangmu',
    keyVal: '',
    filterStr: '',
    sortVal: '',
    sortList: [],
    filtertList: [],
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
  // 切换城市
  goChooseCity() {
    wx.navigateTo({
      url: '../chooseCity/chooseCity'
    })
  },
  // 打开默认排序
  openSort () {
    if (this.data.typeStr === "xiangmu") {
      this.setData({
        sortList: ["最新发布", "热门项目", "薪资最高", "离我最近", "智能排序"]
      }, () => {
        this.setData({
          filterStr: 'sort'
        })
      })
    } else if (this.data.typeStr === "gangwei") {
      this.setData({
        sortList: ["智能排序", "时间排序"]
      }, () => {
        this.setData({
          filterStr: 'sort'
        })
      })
    }
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
    let filtertListData
    if (this.data.typeStr === "xiangmu") {
      filtertListData = [
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
          title: '价格区间（元）',
          item: [
            ["最低价", "最高价"]
          ]
        },
        {
          title: '工作经验',
          item: [
            ["不限", "应届毕业生", "3年以内"],
            ["3-5年", "5-10年", "10年以上"]
          ]
        },
        {
          title: '工作周期',
          item: [
            ["不限", "长期兼职", "短期兼职"],
          ]
        }
      ]
    } else if (this.data.typeStr === "gangwei") {
      filtertListData = [
        {
          title: '工作经验',
          item: [
            ["不限", "应届毕业生", "3年以内"],
            ["3-5年", "5-10年", "10年以上"]
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
          title: '发布时间',
          item: [
            ["不限", "今天发布", "三天内"],
            ["一周内", "两周内", ""]
          ]
        },
        {
          title: '工作周期',
          item: [
            ["不限", "长期兼职", "短期兼职"],
          ]
        }
      ]
    }
    this.setData({
      filtertList: filtertListData
    }, () => {
      this.setData({
        filterStr: 'filter'
      })
    })
  },
  // 输入框输入内容
  iptChange (e) {
    let val = e.detail.value
    this.setData({
      keyVal: val
    })
    if (val === '') {
      this.setData({
        sortVal: '',
        filterStr: ''
      })
    }
  },
  // 改变搜索类型
  chooseType(e) {
    let key = e.currentTarget.dataset.id
    this.setData({
      typeStr: key
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