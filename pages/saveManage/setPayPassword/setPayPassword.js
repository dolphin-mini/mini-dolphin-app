// pages/saveManage/setPassword/setPassword.js
const utils = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false,
    onceAgainFocus: false,
    password: '',
    len: 0,
    onceAgain: false,
    againLen: 0,
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
   * 获取焦点
   */
  getFocus: function () {
    this.setData({
      isFocus: true,
    });
  },
  getAgainFocus: function () {
    this.setData({
      againFocus: true,
    });
  },
  /**
   * 失去焦点
   */
  loseFocus: function () {
    this.setData({
      isFocus: false,
    });
  },
  passwordChange: function (e) {
    const password = e.detail.value;
    const len = password.length;
    this.setData({
      password,
      len,
    },() => {
      if(len > 5) {
        this.setData({
          onceAgainFocus: true,
          onceAgain: true,
        })
      }
    });
  },
  passwordChangeOnceAgain: function (e) {
    const passwordAgain = e.detail.value;
    const againLen = passwordAgain.length;
    this.setData({
      againLen,
    },()=>{
      const {
        password,
        len,
      } = this.data;
      if(len === againLen) {
        if(password === passwordAgain) {
          utils.request().then((res) => {
            
          });
        } else {
          wx.showToast({
            title: '两次密码不一致,请重新输入',
            icon: 'none'
          });
          this.setData({
            isFocus: false,
            onceAgainFocus: false,
            len: 0,
            againLen: 0,
            onceAgain: false,
          });
        }
      }
    });
  }
 
})