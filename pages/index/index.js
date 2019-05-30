//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    eatArray: [],
    whatToEat: ''
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow () {
    try {
      let saveData = wx.getStorageSync('eatArray');
      eatArray = JSON.parse(saveData);
      this.setData({
        eatArray: eatArray
      })
    } catch (e) {
      this.setData({
        eatArray: []
      })
    }
  },
  // 我写的
  getInputValue (e) {
    let theValue = e.detail.value;
    this.setData({
      whatToEat: theValue
    })
    // console.log(e.detail.value)
  },
  add () {
    if (!this.data.whatToEat) { return; }
    let _this = this,
      newEatArray = [...this.data.eatArray, this.data.whatToEat];
    this.setData({
      eatArray: newEatArray
    })
    this.setData({
      eatArray: newEatArray,
      whatToEat: ''
    });
    let SavedData = JSON.stringify(this.data.eatArray);
    wx.setStorageSync("eatArray",SavedData);
  }
})
