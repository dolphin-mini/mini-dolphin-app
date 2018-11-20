// pages/newIndex/newIndex.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    visible: true,
    getUserInfo: false,
    here: '西城小海豚', // 状态 定位中... 定位失败
    cardType: '金卡',
    userInfo: {},
    oilTypeData:[], 
    oil: {
      type: [{
        name: '92#',
        value: 1,
        gun: [1,2,3]
        }, {
          name:'95#',
          value: 2,
          gun: [1, 2, 3,4,5]
        },
        {
          name:'101#',
          value:3,
          gun: [ 1, 2, 3]
        }, 
        {
          name:'0#',
          value:4,
          gun: [ 1, 2, 3]
        }, 
        {
          name:'CNG',
          value:5,
          gun: [0, 1, 2, 3]
        }],
        
      priceCard: [100,200,300],
    },
    currentOilType: { // 选中油品类型
      name: '101#',
      value: 3,
      gun: [1, 2, 3]
    },
    currentGunType: null, // 选中油枪类型
    price: '',
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
    const {
      userInfo,
      weChatUserInfo,
      memberInfo,
    } = app.globalData;
    this.setData({
      userInfo: {
        nickName: userInfo.name,
        avatarUrl: weChatUserInfo ? weChatUserInfo.headimgurl : '',
        mobilephone: memberInfo ? memberInfo.phone : '',
        certification: '未认证',
        memberID: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0, 1, 2]],
      }
    })
    this.initGun();
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
   * 获取微信用户的信息
   */

  initGun: function () {
    const { oil } = this.data;
    const url = 'http://192.168.3.39:8090/oilsservice/oilsinfo/1';
    utils.request(url, {}).then((res) => {
      const oilType =  [];
      res.data.forEach((item, i) => {
       
          oilType.push({
            type: item,
            key: i,
            checked: false,
          });
        
      });
      this.setData({
        oilTypeData: oilType,
      });
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
    const cur = e.currentTarget.dataset.value;
    const {oil} = this.data;
    const gunTypeData = [];
    let currentOilType = [];
    utils.request(`http://192.168.3.39:8080/oilgunbyoilsbyid/1`,{}).then((res) => {
      if(res.code === 10000) {
        res.data.forEach((item, i) => {
          currentOilType.push({
            type: item,
            key: i,
            checked: false,
          });
        });
      }
    });




    const oilType = oil.type;
    oilType.forEach((item, i) => {
      if(item.value === cur) {
        item.checked = true;
        currentOilType = item;
      } else {
        item.checked = false;
      }
    });
    this.setData({
      oil,
      currentOilType: null,
    });
  },
  /**
   * 油枪切换
   */
  changeGun: function (e) {
    const num = e.currentTarget.dataset.gun;
    this.setData({
      currentGunType: num,
    });
  },
  /**
   * 输入金额
   */
  changePrice: function (e) {
    console.log(e)
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
    })
  },
  navToOrderDetail: function () {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
  }
})