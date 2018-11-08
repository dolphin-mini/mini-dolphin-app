// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
    isHidden: true,
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
   * 输入金额
   */
  moneyChange: function (e) {
    console.log(e)
    this.setData({
      money: e.detail.value,
    });
  },

  /**
   * 立即充值弹窗
   */
  openModal: function () {
    this.setData({
      isHidden: false,
    });
    // wx.showModal({
    //   content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
    //   showCancel: false,
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     }
    //   }
    // });
  },
  closeModal: function () {
    this.setData({
      isHidden: true,
    });
    wx.navigateTo({
      url: '../rechargeDetail/rechargeDetail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})