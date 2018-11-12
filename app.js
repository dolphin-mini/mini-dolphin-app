//app.js
const utils = require('./utils/util.js');
const user = require('./services/user.js');
App({
  onLaunch: function () {
    // 获取code
    utils.login().then((res)=>{
        if(res.code) {
          console.log('%c%s','color:green','获取code');
          const url = "";
          const data = {};
          const method = 'POST';
          utils.request(url, data, method).then((res) => {
            if(res) {
              this.globalData.openId = 'xxx';
              this.globalData.secorityKey = 'xxx';
            }
          }).catch((err) => {
            console.log(err)
          });
        } else {
          console.log('%c%s', 'color:green',res.errMsg);
        }
    });



    //获取用户的登录信息
    // user.checkLogin().then(res => {
    //   console.log('%c%s', "color:green", 'app login');
    //   this.globalData.userInfo = wx.getStorageSync('userInfo');
    //   this.globalData.token = wx.getStorageSync('token');
    // }).catch(() => {
    //   console.log('%c%s', "color:#ff0000", 'app login false')
    //   wx.removeStorageSync('userInfo');
    //   wx.removeStorageSync('token');
    //   utils.login().then(res => {
    //   });
    // });
  },
  globalData: {
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