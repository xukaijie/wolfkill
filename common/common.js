
var app=getApp();

import {

  setOpenId
}from '../service/request.js'


function reLogin(successCallback,failCallback){
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
                  if (successCallback){

                    successCallback();
                  }
                 
                })
                .catch(()=>{
                  if (failCallback) {

                    failCallback();
                  }

                })

            },
            fail: res => {
            
              if (failCallback){

                failCallback();
              }
            }
          })

        },
        fail: res => {
         
          if (failCallback) {

            failCallback();
          }
        }
      })
}

module.exports = {
  reLogin
}

