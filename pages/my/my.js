// pages/my/my.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    header:"../../images/wolf.jpg",
    scope_userInfo:false,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    if (app.globalData.userInfo && app.globalData.userInfo.header){

      this.setData({

        header: app.globalData.userInfo.header
      })
    }

    wx.getSetting({
      success: (res) => {

        console.log(res.authSetting)
        if (!res.authSetting['scope.userInfo']) {

          this.setData({
            scope_userInfo:false
          })
        
        }else{

          this.setData({
            scope_userInfo: true
          })
        }
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
  
  },

  changeUserInfo: function(e){

    this.setData({

      scope_userInfo: e.detail.value
    })

    wx.authorize({
      scope: 'scope.userInfo',
      success() {
       
      },
      fail(res){

        console.log(res)
      }
    })
  }
})