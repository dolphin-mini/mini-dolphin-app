// pages/newIndex/newIndex.js
const app = getApp();
const utils = require('../../utils/util.js');
const QRCode = require('../../utils/QRCord.js');

const {
  httpAjax,
} = utils;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    lookatQRCode: false,
    visible: true,
    getUserInfo: false,
    here: '西城小海豚', // 状态 定位中... 定位失败
    cardType: '金卡',
    wxUserInfo: {},
    memberInfo: {},
    oilTypeData:[], 
    oilGunData: [],
    currentOilType: {}, // 选中油品
    currentGunType: {}, // 选中油枪类型
    currentUnitPrice: null, //当前商品单价
    price: '', // 消费金额
    priceCard: [100,200,300]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserPosition();
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getWxUserInfo();
    this.getMemberInfo();
    this.initOilType();
  },
  /**
   * 生成二维码
   */
  createQRCode: function (ele, text, w, h) {
    new QRCode(ele, {
      // usingIn: this,
      text,
      width: w,
      height: h,
      colorDark: "#000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  /**
   * 点击放大二维码
   */
  lookatQRCode: function () {
    this.setData({
      lookatQRCode: true,
    });
  },
  hideQRCode: function () {
    this.setData({
      lookatQRCode: false,
    });
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
      if(res.code == 10000) {
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
      oilStationId:'1234a',
      unionId,
      // openId,
    };

    utils.request(url, data, 'GET').then((res) => {
      if (res.code == 10000) {
        this.createQRCode( 'canvas',res.data.id, 50,50);
        this.createQRCode('bigCanvas',res.data.id, 200, 200);
        app.globalData.memberInfo = res.data;
        const memberCardNum = '123567321678';
        const memberNum = [];
        const index = [0,3,6,9];
        index.forEach((item) => {
          const arr = [];
          [0,1,2].forEach((key) => {
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
  /**
   * 初始化油品类型(根据油站查油品)
   */
  initOilType: function () {
    const { oil } = this.data;
    const {
      oilStationId,
    } = app.globalData;
    const url = `${httpAjax}/basicsresourceservice/oils/list`;
  
    utils.request(url, {
      oilStationId,
    }).then((res) => {
      if(res.code == 10000) {
        const oilType = res.data;
        oilType.forEach((item, i) => {
          item.checked = false;
        });
        this.setData({
          oilTypeData: oilType,
        });
      }
    });
  },

  modalCancel: function () {
    this.setData({
      visible: false,
    });
  },

  modalOk: function () {
    this.setData({
      visible: false,
    });
  },

  /**
   * 打开地图
   */
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 28
        })
      }
    })
  },

  /**
   * 获取当前位置
   */
  getUserPosition: function () {
    console.log('start')
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
  },

  /**
   * 油品类型切换
   */
  oilTypeChange: function (e) {
    const cur = e.currentTarget.dataset.id;
    const curName = e.currentTarget.dataset.name;
    const gunTypeData = [];
    const url = `${httpAjax}/basicsresourceservice/oilgun/list`;
    const {
      oilTypeData,
    } = this.data;
    let currentUnitPrice = null;

    oilTypeData.forEach((item) => {
      if(item.id == cur) {
        item.checked = true;
        currentUnitPrice = item.sellingPrice;
      } else {
        item.checked = false;
      }
    });

    utils.request(url, {
      oilsId:`${cur}@7`,
    },'GET').then((res) => {
      if(res.code == 10000) {
        const oilGunData = res.data;
        oilGunData.forEach((item) => {
          item.checked = false;
        });
        this.setData({
          oilGunData,
        });
      } else {
        this.setData({
          oilGunData: [],
        });
      }
    });
    this.setData({
      oilTypeData,
      currentUnitPrice,
      currentOilType: {
        name: curName,
        value: cur,
        settingPrice: currentUnitPrice,
      },
      currentGunType: null,
    });
  },
  /**
   * 油枪切换
   */
  changeGun: function (e) {
    const value = e.currentTarget.dataset.gun;
    const name = e.currentTarget.dataset.name;
    this.setData({
      currentGunType: {
        name,
        value,
      },
    });
  },
  /**
   * 输入金额
   */
  changePrice: function (e) {
    if(e.type == 'tap') {
      const num = e.currentTarget.dataset.money;
      this.setData({
        price: num,
      });
    } else {
      const val = e.detail.value;
      this.setData({
        price: val,
      });
    }
  },
  navToOrder: function () {
    wx.navigateTo({
      url: '../order/order',
    });
  },
  navToOrderDetail: function () {
    const {
      currentOilType,
      currentGunType,
      price,
    } = this.data;

    wx.navigateTo({
      url: `../orderDetail/orderDetail?currentOilType=${JSON.stringify(currentOilType)}&currentGunType=${JSON.stringify(currentGunType)}&price=${price}`,
    });
  }
})