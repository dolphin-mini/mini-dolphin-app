// pages/newIndex/newIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    here: '西城小海豚', // 状态 定位中... 定位失败
    cardType: '金卡',
    userinfo: {
      name: '老谁家的小谁',
      mobilephone: 151282828282,
      avatar: 'http://xxxxxx',
      certification: '未认证',
      memberID: [[1,2,3],[4,5,6],[7,8,9],[0,1,2]],
    },
    oil: {
      type: ['92#', '95#', '101#', '0#', 'CNG'],
      gun: [0,1,2,3,4,5],
      priceCard: [100,200,300],
    }

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
})