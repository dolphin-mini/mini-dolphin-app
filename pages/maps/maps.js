// pages/maps/maps.js
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
  onReady: function (e) {
    const _this = this;
   
    _this.mapCtx = wx.createMapContext('oilMap');
    _this.mapCtx.moveToLocation()
   
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取当前定位
   */
  getCurrentPosition: function () {
    wx.getLocation({
      success: function(res) {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
      },
    })
  }
})