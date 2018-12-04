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
    accountInfo: {},
    integralInfo: {},
    userInfo: {},
    sexData: [{
      name: '女',
      value: 0,
    }, {
      name: '男',
      value: 1,
    }],
    sexIndex: null,
    born: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const url = `${httpAjax}/memberservice/wechatuserinfovo`,
    //       method = 'GET',
    //       data = {
    //         openId: '123',
    //       };
    // utils.request(url, data, method).then((res) => {
    //   console.log(res)
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  }, 
  onShow: function () {
    this.getWxChartUserrInfo();
    this.getAccountInfo();
    this.getAccumulateInfo();
    this.getIntegralInfo();
  },
  /**
   * 获取用户信息
   */
  getWxChartUserrInfo: function () {
    const {
      unionId,
    } = app.globalData;
    const url = `${httpAjax}/memberservice/finduserbyunionid/${unionId}`;
 
    utils.request(url, {}, 'GET').then((res) => {
      if (res.code == 10000) {
        if(res.data.userAddress) {
          res.data.userAddress = res.data.userAddress.split(' ');
        }
        this.setData({
          userInfo: res.data,
          sexIndex: res.data.userSex,
          born: res.data.userBirthday,
        });
      }
    });
  },
  /**
   * 获取账户信息
   */
  getAccountInfo: function () {
    const {id} = app.globalData.memberInfo;
    const url = `${httpAjax}/accoutservice/vipaccount/bymemberid/${id}`;
    utils.request(url,{},'GET').then((res) => {
      if(res.code == 10000) {
        this.setData({
          accountInfo: res.data,
        });
      }
    });
  },
  /**
   * 获取累计数据
   */
  getAccumulateInfo: function () {
    const { id } = app.globalData.memberInfo;
    const url = `${httpAjax}/favorablestatisticsservice/discountinfo/bymemberid/${id}`;

    utils.request(url, {}, 'GET').then((res) => {
      if (res.code == 10000) {
        this.setData({
          accumulateInfo: res.data,
        });
      }
    });
  },
  /**
   * 获取积分数据
   */
  getIntegralInfo: function () {
    const { id } = app.globalData.memberInfo;
    const url = `${httpAjax}/integralservice/integral/bymemberid/${id}`;
    utils.request(url,{},'GET').then((res) => {
      if(res.code == 10000) {
        this.setData({
          integralInfo: res.data
        })
      }
    });
  },
  /**
   * 修改性别
   */
  bindSexChange: function (e) {
    console.log(e)
    this.setData({
      sexIndex: e.detail.value
    });
  },
  /**
   * 修改出生日期
   */
  bindDateChange: function (e) {
    const born = e.detail.value;
    this.setData({
      born,
    });
  },
  /**
   * 修改手机号
   */
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
    const id = e.detail.value;
    this.setData({
      IDCard: id,
    });
  },
  /**
   * 身份认证
   */
  authentication: function () {
    const {
      IDCard,
      userInfo,
    } = this.data;

    utils.request(`${httpAjax}/memberservice/userinfo/${IDCard}/${userInfo.id}`,{
     
    },'PUT').then((res) => {
      if(res.code == 10000) {
        wx.showToast({
          title: '身份验证成功',
          icon: 'none'
        });
      } else {
        wx.showToast({
          title: '身份校验失败',
          icon: 'none'
        });
      }
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
   * 保存用户信息
   */
  formSubmit: function (e) {
    const formData = e.detail.value;
    const {
      userInfo,
    } = this.data;
    formData.userSex = formData.userSex == '男' ? 1 : 0; 
    utils.request(`${httpAjax}/memberservice/userinfo/${userInfo.id}`,{
      ...formData
    },'PUT').then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      });
    });
  }
})