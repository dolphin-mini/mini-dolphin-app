// pages/authorize/authorize.js
const app = getApp();
console.log(app)
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
    wx.getUserInfo({
      success (res) {
        app.globalData.wxUserInfo = res.userInfo;
        wx.redirectTo({
          url: '../login/login',
        });
      },
      fail () {
        console.log('授权失败，请重新授权')
      }
    });
  } 
  
})