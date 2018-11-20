// pages/authorize/authorize.js
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  getUserInfoAuthorize: function () {
    const { code, oilStationId } = app.globalData;
    wx.getUserInfo({
      success (res) {
        // 获取code 请求用户信息与微信信息
        const data = {
          code,
          oilStationId,
          iv: res.iv,
          encryptedData: res.encryptedData,
        }
        utils.request('http://192.168.3.29:8867/memberservice/decodeUserInfo', data, 'POST').then((res) => {
          if (res && res.code === 1001) {
            app.globalData.memberInfo = res.memberInfo;
            app.globalData.weChatUserInfo = res.weChatUserInfo;
            app.globalData.iv = res.iv;
            app.globalData.encryptedData = res.encryptedData;
            app.globalData.userInfoJSON = res.userInfoJSON;
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
            }, 2000);
          }
        }).catch((err) => {
          console.log(err)
        });
        
      },
      fail () {
        console.log('授权失败，请重新授权')
      }
    });
  } 
  
})