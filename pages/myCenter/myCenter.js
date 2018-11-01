// pages/myCenter/myCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHiddenModal: true,
    IDCard: null,
    region: ['广东省', '广州市', '海珠区']
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
   * 打开弹层
   */
  openModal: function () {
    this.setData({
      isHiddenModal: false,
    });
  },
  /**
   * 关闭弹层
   */
  cancelModal: function () {
    this.setData({
      isHiddenModal: true,
    });
  },
  /**
   * 输入身份ID
   */
  IDcardChange: function (e) {
    const id = e.target.detail;
    this.setData({
      IDCard: id,
    });
  },
  /**
   * 身份认证
   */
  authentication: function () {
    this.setData({
      isHiddenModal: true,
    });
  },
  /**
   * 家庭地址变化
   */
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(arguments)
  }
})