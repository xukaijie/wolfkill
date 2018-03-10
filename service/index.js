const apiHost = 'https://www.xkjtencent.cn';// 开发环境

const COMMON = { // 各模块经常复用的模块
  GET: {
    GET_WOLF_DETAIL: `${apiHost}/api/wolf/v1/wolfDetail`,
    GET_WOLF_LIST: `${apiHost}/api/wolf/v1/getWolfList`,
    GET_USER_INFO: `${apiHost}/api/wolf/v1/userInfo`,
    GET_ADMIN_LIST: `${apiHost}/api/wolf/v1/adminList`,
  },

  POST: {

    SET_OPEN_ID: `${apiHost}/api/wolf/v1/openId`,

    WOLF_SIG_IN: `${apiHost}/api/wolf/v1/sigIn`,

    CREATE_WOLF: `${apiHost}/api/wolf/v1/createWolf`,
  
    SET_OPEN_ID: `${apiHost}/api/wolf/v1/openId`,
  }
    
}

module.exports = {
  COMMON
}