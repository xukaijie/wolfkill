

import {COMMON} from './index.js';

var { getJson, postJson } = require('./utils.js');

const getWolfList = (params = {}) => {
  return getJson(COMMON.GET.GET_WOLF_LIST, params);
}

const wolfSigIn = (params)=>{

  return postJson(COMMON.POST.WOLF_SIG_IN, params);
}


const createWolf = (params) =>{

  return postJson(COMMON.POST.CREATE_WOLF, params);
}

const setOpenId = (params)=>{

  return postJson(COMMON.POST.SET_OPEN_ID, params);
}

const wolfDetail = (params)=>{
  return getJson(COMMON.GET.GET_WOLF_DETAIL, params);
}

const getAdminList = (params)=>{
  return getJson(COMMON.GET.GET_ADMIN_LIST, params);

}
module.exports = {
  
  getWolfList,
  wolfSigIn,
  createWolf,
  setOpenId,
  wolfDetail,
  getAdminList
}

