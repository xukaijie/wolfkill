//app.js

import {

  getWolfList,
  setOpenId,
  wolfSigIn
} from './service/request.js';
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null
  }
})