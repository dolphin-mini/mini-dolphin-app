// pages/newIndex/newIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    here: '西城小海豚', // 状态 定位中... 定位失败
    cardType: '金卡',
    userinfo: {
      name: '老谁家的小谁',
      mobilephone: 151282828282,
      avatar: 'http://xxxxxx',
      certification: '未认证',
      memberID: [[1,2,3],[4,5,6],[7,8,9],[0,1,2]],
    },
    oil: {
      type: [{
        name: '92#',
        value: 1,
        gun: [1,2,3]
        }, {
          name:'95#',
          value: 2,
          checked: true,
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
    currentOilType: {
      name: '101#',
      value: 3,
      gun: [1, 2, 3]
    },
    currentGun: 1,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  initGun: function () {
    const { oil } = this.data;
    oil.type.forEach((item) => {
      if (item.checked) {
        this.setData({
          currentOilType: item,
        });
      }
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
   * 油号切换
   */
  oilTypeChange: function (e) {
    const cur = e.currentTarget.dataset.value;
    const {oil} = this.data;
    let currentOilType = [];
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
      currentOilType,
    });
  },
  /**
   * 油枪切换
   */
  changeGun: function (e) {
    console.log(e);
    const num = e.currentTarget.dataset.gun;
    this.setData({
      currentGun: num,
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
  navToOrderDetail: function () {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
  }
})