

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

const deleteWolf = (params) => {

  return postJson(COMMON.POST.DELETE_WOLF, params);
}


const authList = (params) => {
  return getJson(COMMON.GET.GET_AUTH_LIST, params);

}

const setAuth = (params) =>{

  return postJson(COMMON.POST.SET_AUTH_LIST,params)
}

module.exports = {
  
  getWolfList,
  wolfSigIn,
  createWolf,
  setOpenId,
  wolfDetail,
  getAdminList,
  deleteWolf,
  authList,
  setAuth
}

