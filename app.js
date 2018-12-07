//app.js
const utils = require('./utils/util.js');
const user = require('./services/user.js');
App({
  onLaunch: function () {
   
  },
  globalData: {
    code: null, // 微信code
    oilStationId: 'LwoYv4qBSsC_0xPsYIPskA', // 油站id
    memberInfo: null, // 会员用户信息
    weChatUserInfo: null, // 系统微信用户信息
    openId: '1234a',
    unionId: '1234a',
    iv: null,
    encryptedData: null,
    userInfoAuthorization: undefined, //是否授权用户信息
    registerStatus: undefined, //1001未注册，1000已注册
    token: '',
    longitude: null,
    latitude: null
  }
})