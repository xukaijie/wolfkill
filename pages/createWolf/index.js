// pages/createWolf/index.js

var app = getApp();

import {

  createWolf
} from '../../service/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    nowDate: "",
    nowTime:"",

    activeDate:"",
    activeTime:"",

    location:"", // 活动地点


    limitArray:[15,14,13,12,11,10,9],
    limit:"",

    newRole:"", // 新增角色　
    remark:"" // 备注
  },


  getNowDate: function(){

    var myDate = new Date();

    return myDate.getYear() + '-' + myDate.getMonth() + '-' + myDate.getDay();

  },

  getNowTime:function (){
    var myDate = new Date();
    return myDate.getTime();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var nowDate = this.getNowDate();
    var nowTime = this.getNowTime();

    this.setData({
      nowDate: nowDate,
      nowTime: nowTime
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


  bindDateChange: function(e){

    this.setData({
      activeDate:e.detail.value
    })
  },

  bindTimeChange: function(e){

    this.setData({
      activeTime: e.detail.value
    })
  },


  bindReplaceInput: function(e){

    this.setData({
      location: e.detail.value
    })
  },

  bindReplaceRemark: function (e) {

    this.setData({
      remark: e.detail.value
    })
  },

  bindReplaceRole:function(e){

    this.setData({
      newRole: e.detail.value
    })
  },

  bindLimitChange: function (e) {

    var index = e.detail.value
    this.setData({
      limit: this.data.limitArray[index]
    })
  },


  createActive:function(){

    if (!this.data.activeDate || !this.data.activeTime || !this.data.location || !this.data.limit){

      wx.showModal({
        title: '提示',
        content: '请完善信息',
        icon:"none"
      })
      return;
    }

    if (!app.globalData.userInfo || !app.globalData.userInfo.openId){

      wx.showModal({
        title: '提示',
        content: '您未进行用户信息授权,请到个人中心进行相关授权',
        icon: "none"
      })
      return;
    }

    var param = {

      activeTime: this.data.activeDate + ' ' + this.data.activeTime,
      limit: this.data.limit,
      location: this.data.location,
      remark: this.data.remark,
      founder: app.globalData.userInfo.openId,
      newRole: this.data.newRole
    }

    createWolf(param)
      .then(() => {
          wx.showToast({
            title: '创建成功',
          })

          wx.switchTab({
            url: '../index/index',
          })
      })

    return;
  }
})