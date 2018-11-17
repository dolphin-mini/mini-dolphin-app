// pages/paymentMethod/paymentMethod.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentMethod: [
      {
        id: 'wx',
        imgL: '../../images/wx_logo.png',
        titleL: '微信支付',
        checked: true,
      },
      {
        id: 'ye',
        imgL: '../../images/account_money.png',
        titleL: '账户余额',
        detail: '￥5000',
        checked: false,
      }
    ],
    methods: 'wx',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // const pages = getCurrentPages();
    // console.log(pages)
    // const prev = pages.length -2;
    // pages[prev].route = 'pages/order/order';
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
  // 选择支付方式
  payMethodChange: function (e) {
    const method = e.currentTarget.dataset.id;
    const { paymentMethod } = this.data;
    let methods;
    paymentMethod.forEach((item) => {
      if(item.id === method) {
        item.checked = true;
        methods = method;
      } else {
        item.checked = false;
      }
    });
    this.setData({
      paymentMethod,
      methods,
    });
  },
  navBackToOrder: function () {
    wx.switchTab({
      url: '../order/order',
    });
  },
  navTowxpay: function () {
    // wx.requestPayment(
    //   {
    //     'timeStamp': '',
    //     'nonceStr': '',
    //     'package': '',
    //     'signType': 'MD5',
    //     'paySign': '',
    //     'success': function (res) { },
    //     'fail': function (res) { },
    //     'complete': function (res) { }
    //   })
  }
})