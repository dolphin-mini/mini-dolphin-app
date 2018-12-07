// pages/submitPhone/submitPhone.js\
const utils = require('../../utils/util.js');
const app = getApp();
const {
  httpAjax,
} = utils;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.detail) {
      this.setData({
        phone: options.detail,
      });
    }
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
   * 输入验证码
   */
  codeChange: function (e) {
    const phoneCode = e.detail.value;
    this.setData({
      phoneCode,
    });
  },
  /**
   * 提交
   */
  submitCode: function () {
    const {
      oilStationId,
      memberInfo,
    } = app.globalData;
   
    const {
      phone,
      phoneCode
    } = this.data;
    utils.request(`${httpAjax}/memberservice/updatephone`, {
      oilStationId,
      phone,
      phoneCode,
      memberId: memberInfo.id,
    }, 'POST').then((res) => {
      if(res.code === 10000) {
        app.globalData.memberInfo = res.data;
      }
    });
  }
})