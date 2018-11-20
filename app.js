//app.js
const utils = require('./utils/util.js');
const user = require('./services/user.js');
App({
  onLaunch: function () {
   
  },
  globalData: {
    code: null, // 微信code
    oilStationId: '123456', // 油站id
    iv: null,
    encryptedData: null,
    userInfoAuthorization: undefined, //是否授权用户信息
    registerStatus: undefined, //1001未注册，1000已注册
    memberInfo: null,
    weChatUserInfo: null,

    userInfo: {
      nickName: 'Hi,游客',
      userName: '点击登录',
      avatarUrl: 'https://platform-wxmall.oss-cn-beijing.aliyuncs.com/upload/20180727/150547696d798c.png'
    },
    token: '',
    longitude: null,
    latitude: null
  }
})