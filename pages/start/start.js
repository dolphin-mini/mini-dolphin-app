// pages/start/start.js
const app = getApp();
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
    const _this = this;
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          _this.timer = setTimeout(() => {
            wx.redirectTo({
              url: '../authorize/authorize',
            });
          }, 2000);
        } else {
          _this.timer = setTimeout(() => {
            wx.redirectTo({
              url: '../login/login',
            });
          }, 2000);
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
    clearTimeout(this.timer);
  }
 
})