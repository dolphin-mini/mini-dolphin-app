// pages/myCenter/myCenter.js
const utils = require('../../utils/util.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHiddenModal: true,
    IDCard: null,
    region: ['广东省', '广州市', '海珠区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const url = 'http://192.168.3.20:8867/memberservice/wechatuserinfovo',
          method = 'GET',
          data = {
            openId: '123',
          };
    utils.request(url, data, method).then((res) => {
      console.log(res)
    });
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
  modify: function () {
    wx.navigateTo({
      url: '../modifyPhone/modifyPhone',
    });
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
    const {
      IDCard
    } = this.data;
    const {
      userInfo
    } = app.globalData;

    utils.request('http://192.168.3.29:8867/memberservice/userinfo/asd/asd',{
      id: userInfo.id,
      cardNum: IDCard,
    },'GET').then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      });
    });
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
  /**
   * 提交修改信息
   */
  formSubmit: function (e) {
    const formData = e.detail.value;
    const {
      userInfo,
    } = app.globalData;
    formData.userAddress += ' ' + formData.detailAddress;
    delete formData.detailAddress;
    console.log(arguments)
    utils.request('http://192.168.3.29:8867/memberservice/userinfo',{
      id: userInfo.id,
      ...formData
    },'PUT').then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      });
    });
  }
})