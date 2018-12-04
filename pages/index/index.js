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
    positionState: false,
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
    const memberInfo = app.globalData.memberInfo;
    const memberNum = [];
    const index = [0, 3, 6, 9];
    index.forEach((item) => {
      const arr = [];
      [0, 1, 2].forEach((key) => {
        arr.push(memberInfo.memberNum.substr(item, 3)[key])
      });
      memberNum.push(arr);
    });
    this.setData({
      memberInfo,
      memberNum,
    });
    this.checkAuthorizeLocation();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const {
      memberInfo
    } = this.data;
    this.initOilType();
    this.createQRCode('canvas', memberInfo.id, 50, 50);
    this.createQRCode('bigCanvas', memberInfo.id, 200, 200);
  },
  /**
   * 检测用户是否授权获取地理位置信息
   */
  checkAuthorizeLocation: function () {
    const that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
            success: function (res) {
              if (res.cancel) {
                that.setData({
                  isshowCIty: false
                })
                wx.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      that.setData({
                        isshowCIty: true
                      })
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用getLocationt的API
                      getLocation(that);
                    } else {
                      that.setData({
                        isshowCIty: false
                      })
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //初始化进入
          that.getLocation();
        }
        else { //授权后默认加载
          that.getLocation();
        }
      }
    })
  },
  /**
   * 获取地理信息
   */
  getLocation: function () {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 经纬度
        var latitude = res.latitude
        var longitude = res.longitude
        var aK = that.data.aK
        that.setData({
          isshowCIty: true
        })
      },
      fail: function () {
        that.setData({
          isshowCIty: false
        });
        wx.showToast({
          title: '授权失败',
          icon: 'success',
          duration: 1000
        })
      }
    })
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
   * 点击放大与隐藏二维码
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
      oilStationId,
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
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     wx.openLocation({
    //       latitude,
    //       longitude,
    //       scale: 28
    //     })
    //   }
    // })
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
    // 请求油枪数据
    utils.request(url, {
      oilsId: cur,
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
    const name = e.currentTarget.dataset.name;
    this.setData({
      currentGunType: {
        name,
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