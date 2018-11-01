// pages/invoiceTitle/invoiceTitle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected: false,
    isActive: null,
    isHiddenModal: true,
    titleType: null,
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
   * 更改发票抬头
   */
  changeTitle: function (e) {
    let { id } = e.target.dataset;
    console.log(id)
    const { isActive } = this.data;
    if(id === isActive) {
      id = null;
    }
    this.setData({
      isActive: id,
    });
  },
  /**
   * 关闭弹窗
   */
  closeModal: function () {
    const { isActive, titleType } = this.data;
    this.setData({
      isHiddenModal: true,
      isActive: titleType,
    });
  },
  /**
   * 打开弹窗
   */
  openModal: function () {
    const { titleType } = this.data;
    this.setData({
      isHiddenModal: false,
      isActive: titleType,
    });
  },
  /**
   * 保存modal
   */
  saveModal: function () {
    const { isActive } = this.data;
    this.setData({
      isHiddenModal: true,
      titleType: isActive,
    })
  },
  /**
   * 扫一扫
   */
  openScanCode: function () {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  }
})