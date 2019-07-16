// pages/releaseGangwei/releaseGangwei.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    reward: '',
    jingyanArray: [
      {
        id: '0',
        name: '不限'
      },
      {
        id: '1',
        name: '应届毕业生'
      },
      {
        id: '2',
        name: '3年以内'
      },
      {
        id: '3',
        name: '3-5年'
      }, {
        id: '4',
        name: '5-10年'
      }, {
        id: '5',
        name: '10年以上'
      }
    ],
    jingyan: '',
    zhouqiArray: [
      {
        id: '3',
        name: '不限'
      },
      {
        id: '2',
        name: '长期兼职'
      },
      {
        id: '1',
        name: '短期兼职'
      }],
    zhouqi: '',
    moneyArray: [
      {
        id: '1',
        name: '不限'
      },
      {
        id: '2',
        name: '2K以下'
      },
      {
        id: '3',
        name: '2K-5K'
      },
      {
        id: '4',
        name: '5K-10K'
      },
      {
        id: '5',
        name: '10K-15K'
      },
      {
        id: '6',
        name: '15K-25K'
      },
      {
        id: '7',
        name: '25K-50K'
      },
      {
        id: '8',
        name: '50K以上'
      }
    ],
    money: '',
    gangweiTextareaMaskBox: false,
    instruction: '',
    yaoqiuTextareaMaskBox: false,
    requirement: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgSrc: app.globalData.imgSrc
    })
  },
  // 项目名称
  nameChange (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 赏金
  rewardChange(e) {
    this.setData({
      reward: e.detail.value
    })
  },
  // 项目职责
  goProjectZhize() {
    this.setData({
      gangweiTextareaMaskBox: true
    })
  },
  // 关闭岗位职责
  choseGangwei() {
    this.setData({
      gangweiTextareaMaskBox: false
    })
  },
  // 任职要求
  goRenzhiyaoqiu() {
    this.setData({
      yaoqiuTextareaMaskBox: true
    })
  },
  // 关闭任职要求
  choseYaoqiu() {
    this.setData({
      yaoqiuTextareaMaskBox: false
    })
  },
  // 岗位职责输入框输入内容
  gangweiChange(e) {
    this.setData({
      instruction: e.detail.value
    })
  },
  // 任职要求输入框输入内容
  zhizeChange(e) {
    this.setData({
      requirement: e.detail.value
    })
  },
  // 经验要求
  jingyanChange(e) {
    this.setData({
      jingyan: this.data.jingyanArray[e.detail.value]
    })
  },
  // 工作周期
  zhouqiChange(e) {
    this.setData({
      zhouqi: this.data.zhouqiArray[e.detail.value]
    })
  },
  // 月薪
  moneyChange(e) {
    this.setData({
      money: this.data.moneyArray[e.detail.value]
    })
  },
  // 发布
  saveRelease() {
    let name = this.data.name
    let reward = this.data.reward
    let job_experience = this.data.jingyan.id
    let nature = this.data.zhouqi.id
    let salary_range = this.data.money.id
    let instruction = this.data.instruction
    let requirement = this.data.requirement
    console.log(job_experience)
    if (name == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入项目名称',
      })
    } else if (reward == '' || reward < 100) {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '赏金最少为100',
      })
    }  else if (job_experience === '' || typeof (job_experience) == 'undefined') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择经验要求',
      })
    } else if (nature === '' || typeof (nature) == 'undefined') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择工作周期',
      })
    } else if (salary_range === '' || typeof (salary_range) == 'undefined') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请选择月薪',
      })
    } else if (instruction == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入项目职责',
      })
    } else if (requirement == '') {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入任职要求',
      })
    } else {
      wx.showLoading({
        mask: true,
        title: '提交中...',
      })
      wx.request({
        url: `${app.globalData.baseUrl}/Project/publish.html`,
        data: {
          sess_key: app.globalData.sess_key,
          name: name,
          job_experience: job_experience,
          nature: nature,
          reward: reward,
          salary_range: salary_range,
          instruction: instruction,
          requirement: requirement
        },
        method: 'POST',
        success: (res) => {
          wx.hideLoading()
          if (res.data.error_code == 0) {
            wx.showToast({
              title: '发布成功',
              mask: true,
              icon: 'success',
              success() {
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500)
              }
            })
          } else if (res.data.error_code == 3) {
            wx.showModal({
              title: '提示',
              content: '未认证公司，前往认证',
              success: (res) => {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../editCompany/editCompany'
                  })
                } else if (res.cancel) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: '提示',
              content: res.data.msg,
            })
          }
        },
        fail: (res) => {
          wx.showToast({
            icon: 'none',
            title: '网络请求失败',
          })
        }
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

  }
})