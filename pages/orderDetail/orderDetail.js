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
    selectCoupon: '请选择',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const currentOilType = JSON.parse(options.currentOilType);
    const currentGunType = JSON.parse(options.currentGunType);
    const price = JSON.parse(options.price);
    console.log(options)
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
      memberInfo,
      oilStationId,
    } = app.globalData;
    const url = `${httpAjax}/discountservice/discount/select`;

    request(url,{
      member: memberInfo,
      oil: {
        oilStationId,
        amount: price,
        id: currentOilType.value,
        name: currentOilType.name,
        quantity: null,
        sellingPrice: currentOilType.settingPrice,
      },
      products: [],
    },'POST').then((res) => {
      if(res.code == 10000) {
        const discountInfo = res.data;
        let selectCoupon = '暂无优惠券';
        discountInfo.canUseDiscount.forEach((item, index) => {
          if(index == 0) {
            item.checked = true;
            selectCoupon = item.disCouponName;
          } else {
            item.checked = false;
          }
        });
        this.setData({
          discountInfo,
          selectCoupon,
        });
      }
    });
  },
  /**
   * 打开优惠信息列表
   */
  openPicker: function () {
    this.setData({
      visible: false,
    });
  },
  /**
   * 选择优惠券
   */
  checkDiscountCoupon: function (e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    const { discountInfo } = this.data;
    let selectCoupon = null;
    discountInfo.canUseDiscount.forEach((item) => {
      if(id == item.id) {
        item.checked = true;
        selectCoupon = item.disCouponName;
      } else {
        item.checked = false;
      }
    });
    this.setData({
      discountInfo,
      selectCoupon,
    });
  },

  /**
   * 提交订单
   */
  submitOrder: function () {
    const {
      currentGunType,
      currentOilType,
      currentUnitPrice,
      price,
    } = this.data;
    const {
      memberInfo,
      oilStationId,
    } = app.globalData;
    const url = `${httpAjax}/orderservice/blanketorder/ordersubmmit`;

    request(url,{
      member: memberInfo,
      oil: {
        oilStationId,
        amount: price,
        oilId: currentOilType.value,
        name: currentOilType.name,
        quantity: null,
        sellingPrice: currentOilType.settingPrice,
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