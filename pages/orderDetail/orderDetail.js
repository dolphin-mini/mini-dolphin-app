// pages/orderDetail/orderDetail.js
const app = getApp();
const utils = require('../../utils/util.js');
const {
  httpAjax,
  request,
} = utils;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const currentOilType = JSON.parse(options.currentOilType);
    const currentGunType = JSON.parse(options.currentGunType);
    const price = JSON.parse(options.price);

    this.setData({
      currentOilType,
      currentGunType,
      price,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDiscountInfo();
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
   * 获取优惠信息
   */
  getDiscountInfo: function () {
    const {
      currentGunType,
      currentOilType,
      currentUnitPrice,
      price,
    } = this.data;
    const {
      memberInfo
    } = app.globalData;
    const url = `${httpAjax}/discountservice/discount/select`;

    request(url,{
      member: {
        "memberCompanyGroupId": "1111",
        "memberCompanyId": "111",
        "memberGroupId": "111",
        "memberId": "111",
        "memberRankId": "111"
      },
      oil: {
        oilId: currentOilType,
        quantity: null,
        totalAmount: price,
        unitPrice: currentUnitPrice,
      },
    },'POST').then((res) => {

    });
  },

  openPicker: function () {
    this.setData({
      visible: false,
    });
  },
  submitOrder: function () {
    const {
      currentGunType,
      currentOilType,
      currentUnitPrice,
      price,
    } = this.data;
    const {
      memberInfo
    } = app.globalData;
    const url = `${httpAjax}/orderservice/blanketorder/ordersubmmit`;

    request(url,{
      member: {
        "memberCompanyGroupId": "1111",
        "memberCompanyId": "111",
        "memberGroupId": "111",
        "memberId": "111",
        "memberRankId": "111"
      },
      oil: {
        oilId: currentOilType,
        quantity: null,
        totalAmount: price,
        unitPrice: currentUnitPrice,
      },
      disCouponIds:[1],
      isJoinDiscount : 1,
    },'POST').then((res) => {
      wx.redirectTo({
        url: '../paymentMethod/paymentMethod',
      });
    });
  }
})