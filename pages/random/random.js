
Page({

  data: {
    theFood: '',
    eatArray: [],
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    let saveData = wx.getStorageSync('eatArray'),
      eatArray = JSON.parse(saveData);
    this.setData({
      eatArray: eatArray
    })
  },
  onShareAppMessage: function () {

  },
  // 我写的
  randomFood () {
    if (this.data.eatArray.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '木有数据哦',
      });
      return;
    }
    let foods = this.data.eatArray,
      foodsLen = foods.length,
      foodIndex = Math.round(Math.random() * (foodsLen - 1));
    // console.log(foods)
    // console.log(foodIndex)
    this.setData({
      theFood: foods[foodIndex]
    })
  },
  deleteAll () {
    let _this = this;
    if (this.data.eatArray.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '木有数据哦',
      });
      return;
    }
    wx.showModal({
      title: 'Warning',
      content: '你真的不喜欢嘛 ?',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('eatArray', '[]');
          wx.showToast({
            icon: 'success',
            title: '成功了',
          });
          _this.setData({
            theFood: ''
          })
        } else if (res.cancel) {
          
        }
      }
    })
    
  }
})