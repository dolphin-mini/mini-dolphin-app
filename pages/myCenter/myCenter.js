// pages/myCenter/myCenter.js
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
    isHiddenModal: true,
    IDCard: null,
    region: ['广东省', '广州市', '海珠区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const url = `${httpAjax}/memberservice/wechatuserinfovo`,
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
    this.getMemberInfo();
    this.getWxUserInfo();
  },
  /**
   * 获取用户信息
   */
  getWxUserInfo: function () {
    const url = `${httpAjax}/memberservice/wechatuserinfovo`;
    const {
      openId,
      unionId,
      oilStationId,
    } = app.globalData;
    const data = {
      oilStationId,
      unionId,
      openId,
    };

    utils.request(url, data, 'GET').then((res) => {
      if (res.code == 10000) {
        app.globalData.wxUserInfo = res.data;
        this.setData({
          wxUserInfo: res.data,
        });
      }
    });
  },
  /**
   * 获取会员信息接口
   */
  getMemberInfo: function () {
    const url = `${httpAjax}/memberservice/membervo`;
    const {
      openId,
      unionId,
      oilStationId,
    } = app.globalData;
    const data = {
      oilStationId: '1234a',
      unionId,
      // openId,
    };

    utils.request(url, data, 'GET').then((res) => {
      if (res.code == 10000) {
        this.createQRCode('canvas', res.data.id, 50, 50);
        this.createQRCode('bigCanvas', res.data.id, 200, 200);
        app.globalData.memberInfo = res.data;
        const memberCardNum = '123567321678';
        const memberNum = [];
        const index = [0, 3, 6, 9];
        index.forEach((item) => {
          const arr = [];
          [0, 1, 2].forEach((key) => {
            arr.push(memberCardNum.substr(item, 3)[key])
          });
          memberNum.push(arr);
        })
        this.setData({
          memberInfo: res.data,
          memberNum,
        });
      }
    });
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

    utils.request(`${httpAjax}/memberservice/userinfo/asd/asd`,{
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
    });
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