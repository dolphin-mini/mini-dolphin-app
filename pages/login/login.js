// pages/login/login.js
const utils = require('../../utils/util.js');
const {
  httpAjax
} = utils;

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isGettingCode: false,
    times: 60,
    isRead: false,
    mobilePhone: 17610351811, //手机号
    secorityCode: null, // 验证码
    countries: [{
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
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 国家切换
   */
  bindCountryChange: function(e) {
    const val = e.detail.value;
    console.log(val);
    this.setData({
      prefixPhone: val,
    })
  },
  /**
   * 获取验证码
   */
  getSecurityCode: function() {
    const {
      mobilePhone,
    } = this.data;
    const {
      userInfo,
      oilStationId
    } = app.globalData;
    const phoneRegExp = /^1[34578]\d{9}$/;
    if (!mobilePhone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return
    }
    if (!phoneRegExp.test(mobilePhone)) {
      wx.showToast({
        title: '手机号格式不正确,请重填！',
        icon: 'none'
      });
      return
    }
    const _this = this;
    const url = `${httpAjax}/memberservice/authcode/sendmessage`;
    const data = {
      phone: mobilePhone,
      oilStationId,
    };
    this.setData({
      isGettingCode: true,
    });
    this.timer = setInterval(() => {
      const {
        times
      } = this.data;
      if (times === 0) {
        this.setData({
          isGettingCode: false,
          times: 60,
        });
        clearInterval(this.timer);
        this.timer = null;
        return
      }
      this.setData({
        times: (times - 1),
      });
    }, 1000);
    utils.request(url, data, 'POST').then((res) => {
      if(res.code === 10000) {
        wx.showToast({
          title: '您已成功获取验证码，请注意查收',
          icon: 'none',
        });
      } else {
        wx.showToast({
          title: 'res.message',
          icon: 'none',
        });
        clearInterval(_this.timer);
        this.setData({
          isGettingCode: false,
          times: 60,
        });
      }
    }, (res) => {
      clearInterval(_this.timer);
      this.setData({
        isGettingCode: false,
        timers: 60,
      });
    });
  },
  /**
   * 是否阅读协议
   */
  isReadChange: function() {
    this.setData({
      isRead: !this.data.isRead,
    });
    // const {
    //   mobilePhone,
    //   secorityCode,
    //   isRead
    // } = this.data;
  },
  /**
   * 输入手机号
   */
  phoneChange: function(e) {
    const num = e.detail.value;
    this.setData({
      mobilePhone: num,
    });
  },
  /**
   * 输入验证码
   */
  secorityCodeChange: function(e) {
    const code = e.detail.value;
    this.setData({
      secorityCode: code,
    });
  },
  /**
   * 立即验证
   */
  login: function() {
    const {
      mobilePhone,
      prefixPhone,
      secorityCode
    } = this.data;
    const {
      code,
      weChatUserInfo,
      oilStationId,
    } = app.globalData;
    
    const url = `${httpAjax}/mini-dolphin-member-server/memberservice/memberinfo/registeruser`,
      method = "POST",
      data = {
          phone: mobilePhone,
          phoneCode: secorityCode,
          oilStationId,
          weChatUserInfo: weChatUserInfo,
      };
    utils.request(url, data, 'POST').then((res) => {
      if(res.code === 10000) {
        app.globalData.memberInfo = res.data;
        wx.switchTab({
          url: '../index/index',
        });
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
        });
      }
    });
  },
})