//index.js
//获取应用实例

var app = getApp();
import {

  getWolfList,
  setOpenId,
  wolfSigIn
} from '../../service/request.js';


Page({
  data: {
    
    wolfList:[],
    page:1,
    sigIn:"报名",
    isLoad:false
  },
  onLoad: function () {
    wx.login({
      success: res => {
        var code = res.code;
        wx.getUserInfo({
          success: userInfo => {
            var nickName = JSON.parse(userInfo.rawData).nickName;
            var header = JSON.parse(userInfo.rawData).avatarUrl;
            setOpenId({
              code: code,
              nickName: nickName,
              header: header
            })
              .then((data) => {
                app.globalData.userInfo = {
                  openId: data.data,
                  nickName: nickName,
                  header: header
                }

                this._getWolfList();
              })

          },
          fail:res=>{

            this._getWolfList();
          }
        })

      },
      fail: res => {

        this._getWolfList();
      }
    })
  },
  
  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this._getWolfList(1)
  },

  onShow:function(){
    if (this.data.isLoad === true)
        this._getWolfList();

    this.data.isLoad = true;
  },

  _getWolfList: function (page = this.data.page){
    getWolfList({page:page})
    .then((data)=>{

      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      var list = data.data;
      for (var k = 0;k<list.length;k++){

        var d = list[k];
        d.sigInName="报名";
        d.sigInClass="sigIn"
        if (app.globalData.userInfo && app.globalData.userInfo.openId)
          var openId = app.globalData.userInfo.openId;
        else
          continue;

  
        if (d.enterList.indexOf(openId) !== -1){
          d.sigInName = "已报名";
          d.sigInClass="sigInAlready"
        }
    
      }

      console.log(data.data);
        this.setData({
          wolfList:list
        })
    })
    .catch(()=>{

      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },


  createOne:function(){
    wx.navigateTo({
      url: '../createWolf/index',
    })
  },

  sigIn:function(e){
    if (!app.globalData.userInfo || !app.globalData.userInfo.openId) {

      wx.showModal({
        title: '提示',
        content: '您未进行用户信息授权,请到个人中心进行相关授权',
        icon: "none"
      })
      return;
    }

    if (e.currentTarget.dataset.name === "已报名")
    return;

    var wolfId = e.currentTarget.id;
    var openId = app.globalData.userInfo.openId;

    wolfSigIn({
      wolfId: wolfId,
      openId: openId

    })
    .then(()=>{
      wx.showToast({
        title: '报名成功',
      })

      this._getWolfList();
    })
    
  },

  enterWolf:function(e){
    var wolfId = e.currentTarget.dataset.wolfid;
    wx.navigateTo({
      url: '../wolfDetail/wolfDetail?wolfId='+wolfId

    })
  }
})
