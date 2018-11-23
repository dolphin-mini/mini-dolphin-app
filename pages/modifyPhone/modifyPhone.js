// pages/modifyPhone/modifyPhone.js
const { COUNTRY_JSON } = require('../../utils/countryJSON.js');
const utils = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    COUNTRY_JSON,
    countryIndex: 0,
    phone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data)
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
   * 更换国家
   */
  countryChange: function (e) {
    const countryIndex = e.detail.value;
    this.setData({
      countryIndex,
    });
  },
 /**
  * 输入手机号
  */
  phoneChange: function (e) {
    console.log(e)
    const phone = e.detail.value;
    this.setData({
      phone,
    });
  },
  /**
   * 下一步
   */
  nextStep: function () {
    const {
      oilStationId,
    } = app.globalData;
    const {
      phone,
    } = this.data;
    utils.request('http://192.168.3.29:8867/memberservice/sendMessage',{
      oilStationId,
      phone,
    },'POST').then((res) => {
      if(res.code === 10000) {
        wx.navigateTo({
          url: `../submitPhone/submitPhone?detail=${phone}`,
        });
      }
    });
  }
})