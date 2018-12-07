// pages/recharge/recharge.js
const utils = require('../../utils/util.js');
const app = getApp();
const { httpAjax } = utils;

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
  /**
   * 确认充值调用支付接口
   */
  closeModal: function () {
    this.setData({
      isHidden: true,
    });

    const {
      money,
    } = this.data;

    const {
      memberInfo,
      oilStationId,
    } = app.globalData;

    const url = `${httpAjax}/mini-dolphin-recharge-server/payinfoservice/payinfo`;
    const data = {
      memberId: memberInfo.id,
      name: memberInfo.name,
      oilStationId,
      rechargeMoney: money,
    };
    utils.request(url,data,'POST').then((res) => {
      if(res.code == 10000) {
        const OrderId = 'sPB-pvPnQn-WEVYIUpUcHQ';
        const { openId } = app.globalData;
        const url = `${httpAjax}/payservice/pay/smallprogram/${OrderId}/${openId}`;
        utils.request(url, {}, 'POST').then((res) => {
          const info = JSON.parse(res);
          wx.requestPayment(
            {
              'signType': 'MD5',
              'nonceStr': info.nonceStr,
              'package': info.package,
              'paySign': info.paySign,
              'timeStamp': info.timeStamp,
              'success': function (res) {
                wx.navigateTo({
                  url: '../rechargeDetail/rechargeDetail',
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              },
              'fail': function (res) {
                debugger
              },
              'complete': function (res) {
              }
            });
          });
        }
      });
    
    
  },
  

})