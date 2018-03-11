// pages/my/my.js

var app = getApp();


import {

  reLogin
} from '../../common/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    header:"../../images/wolf.jpg",
    isSuperAdmin:false,
    scopeUserInfo:true
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
  
      this.initData();
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
  },

  clickAuth:function(){

    wx.navigateTo({
      url: '../authPage/index',
    })
  },

  userInfoHandler:function(param){

    reLogin();
  },

  initData:function(){

    if (app.globalData.userInfo && app.globalData.userInfo.header) {

      this.setData({

        isSuperAdmin: app.globalData.isSuperAdmin,
        header: app.globalData.userInfo.header,
        scopeUserInfo: true
      })
    } else {

      this.setData({

        isSuperAdmin: app.globalData.isSuperAdmin,
        scopeUserInfo: false
      })
    }
  }
})