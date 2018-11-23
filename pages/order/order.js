// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1,2,3,4,,5,6,7,8,9],
    orderLIst: [
      {
        orderId: 218378127381,
        oilType: '98#',
        gunType: '2号枪',
        unitPrice: '7.44',
        pay: '200',
        integral: 30,
        createTime: '2018-20-02 12:32:33',
        status: '未支付'
      },
    ],
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
  onPullDownRefresh: function (e) {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log(e, '上拉刷新')
    //请求列表数据
  },
  pullDownRefresh: function (e) {
    console.log(e)
  },

  navToOrderDetail: function () {
    getCurrentPages().pop();
    wx.redirectTo({
      url: '../paymentMethod/paymentMethod',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})