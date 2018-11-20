// pages/start/start.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //判断是否授权用户信息
    // 判断是否授权
    const _this = this;
    const { oilStationId } = app.globalData;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          //未授权跳转授权页面
          _this.timer = setTimeout(() => {
            wx.redirectTo({
              url: '../authorize/authorize',
            });
          }, 2000);
        } else {
          // 获取code 请求用户信息与微信信息
          utils.login().then((res) => {
            if (res.code) {
              app.globalData.code = res.code;
              const data = {
                code: res.code,
                oilStationId,
              };
              wx.getUserInfo({
                success (res) {
                  data.iv = res.iv;
                  data.encryptedData = res.encryptedData;
                  app.globalData.iv = res.iv;
                  app.globalData.encryptedData = res.encryptedData;
                  utils.request('http://192.168.3.29:8867/memberservice/decodeUserInfo', data, 'POST').then((res) => {
                    app.globalData.memberInfo = res.memberInfo;
                    app.globalData.weChatUserInfo = res.weChatUserInfo;
                    app.globalData.userInfoJSON = res.userInfoJSON;
                    app.globalData.userInfo = res.userInfo;
                    if (res && res.code === 1001) {
                        // 授权过并且未注册跳转注册页面
                      _this.timer = setTimeout(() => {
                        wx.redirectTo({
                          url: '../login/login',
                        });
                      }, 2000);
                    } else if (res && res.code === 1000) {
                      // 授权过并且注册过跳转首页
                      _this.timer = setTimeout(() => {
                        wx.switchTab({
                          url: '../index/index',
                        });
                      }, 300);
                    }
                  }).catch((err) => {
                    console.log(err)
                  });
                }
              });
            }
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onUnload() {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }
 
})