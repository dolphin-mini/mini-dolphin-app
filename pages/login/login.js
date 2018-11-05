// pages/login/login.js
const utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isGettingCode: false,
    times: 60,
    isRead: false,
    mobilePhone: null, //手机号
    secorityCode: null, // 验证码
    countries:[
      {
        id: 86,
        key: "中国"
      },
      {
      id: 39,
      key: "日本"
      },
      {
        id: 50,
        key: "交首付款"
      }
    ],
    prefixPhone: 0, // 手机号前缀
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
    if(this.timer) {
      clearInterval(this.timer);
    }
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
   * 国家切换
   */
  bindCountryChange: function (e) {
    const val = e.detail.value;
    console.log(val);
    this.setData({
      prefixPhone: val,
    })
  },
  /**
   * 获取验证码
   */
  getSecurityCode: function () {
    const { mobilePhone } = this.data;
    if(!mobilePhone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return
    }
    const _this = this;
    const url = '';
    const data = {};
    const method = "POST";
    utils.request(url, data, method).then((res)=>{
      this.setData({
        isGettingCode: true,
        times: (_this.data.times - 1),
      }, () => {
        this.timer = setInterval(() => {
          if (this.data.times === 0) {
            this.setData({
              isGettingCode: false,
              times: 60,
            });
            clearInterval(this.timer);
            this.timer = null;
            return
          }
          this.setData({
            isGettingCode: true,
            times: (this.data.times - 1),
          });
        }, 1000);
      });
      wx.showToast({
        title: '您已成功获取验证码，请注意查收',
        icon: 'none',
      });
    },(res)=>{

    });
  },
  /**
   * 输入验证码
   */
  secorityCodeChange: function (e) {
    const code = e.detail.value;
    this.setData({
      secorityCode: code,
    });
  },
  /**
   * 是否阅读协议
   */
  isReadChange: function () {
    // console.log(this.data.isRead)
    this.setData({
      isRead: !this.data.isRead,
    });
    const { mobilePhone, secorityCode, isRead} = this.data;
    console.log(mobilePhone, secorityCode, isRead)
  },
  /**
   * 输入手机号
   */
  phoneChange: function (e) {
    const num = e.detail.value;
    this.setData({
      mobilePhone: num, 
    });
  },
  /**
   * 输入验证码
   */
  secorityCodeChange: function (e) {
    const code = e.detail.value;
    this.setData({
      secorityCode: code,
    });
  },
  /**
   * 立即验证
   */
  login: function () {
    const { mobilePhone, prefixPhone, secorityCode } = this.data;
    wx.redirectTo({
      url: '../newIndex/newIndex',
    })
    const config = {
      url: "http://sdfds",
      method: "post",
      data: {
        mobilePhone,
        prefixPhone,
        secorityCode
      }
    };
    utils.request(config).catch((error)=>{
      console.log(error.errMsg)
    });
  }
})