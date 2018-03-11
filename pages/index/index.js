//index.js
//获取应用实例

var app = getApp();
console.log(app);
import {

  getWolfList,
  setOpenId,
  wolfSigIn,
  getAdminList,

  deleteWolf
} from '../../service/request.js';

import {

  reLogin
} from '../../common/common.js';

Page({
  data: {
    
    wolfList:[],
    page:1,
    sigIn:"报名",
    isLoad:false,
    isAdmin:false,

    modalHidden:true
  },
  onLoad: function () {
    reLogin(()=>{

      this._getWolfList();
      this.checkAdmin();
    },()=>{

      this._getWolfList();
    })
  },
  
  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this._getWolfList(1);
    this.checkAdmin();
  },

  onShow:function(){
    if (this.data.isLoad === true){
        this._getWolfList();
        this.checkAdmin();
    }

    this.data.isLoad = true;
  },

  checkAdmin:function(){

      getAdminList()
      .then((data)=>{

        if (app.globalData.userInfo && app.globalData.userInfo.openId){
          var openId = app.globalData.userInfo.openId;

          var list = data.data.map((d)=>{

            return d.openId
          })

          var index = list.indexOf(openId)
          if (index !== -1){

            app.globalData.isAdmin = true;
            if (data.data[index].isSuperAdmin == true){

              app.globalData.isSuperAdmin = true;
            }

            this.setData({

              isAdmin:true
            })
          }else{

            this.setData({

              isAdmin: false
            })
          }
        }else{

          this.setData({

            isAdmin: false
          })
        }
      })
  },

  onShareAppMessage:function(){

    return {

      title:"活动已创建，快来报名吧",
      desc: '最具人气的小程序开发联盟!',
      path:"/pages/index/index"
    }

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

        var _enter = d.enterList.map((e)=>{

            return e.openId;
        })
        if (_enter.indexOf(openId) !== -1){
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
        content: '您未进行用户信息授权,请到个人中心进行授权',
        icon: "none"
      })
      return;
    }

    if (e.currentTarget.dataset.name === "已报名")
    return;


    this.setData({
      modalHidden:false,
      currentWolfId:e.currentTarget.id
    })


    return;
  },

  enterWolf:function(e){
    var wolfId = e.currentTarget.dataset.wolfid;
    wx.navigateTo({
      url: '../wolfDetail/wolfDetail?wolfId='+wolfId

    })
  },


  _sureBtn:function(e){

    var wolfId = this.data.currentWolfId;
    var openId = app.globalData.userInfo.openId;

    wolfSigIn({
      wolfId: wolfId,
      openId: openId,
      remark:e.detail.remark

    })
      .then(() => {
        wx.showToast({
          title: '报名成功',
        })

        this._getWolfList();
      })
  },


  deletWolf:function(e){

    var wolfId = e.currentTarget.dataset.wolfid;

    wx.showModal({
      title: '确认',
      content: '确认删除？',
      success:(e)=>{

        if (e.confirm){
          deleteWolf({wolfId:wolfId})
          .then(()=>{

            wx.showToast({
              title: '删除成功',
            })

            this._getWolfList();
          })
        }
      }
    
    })
  }
})
