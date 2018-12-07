// pages/order/order.js
const utils = require('../../utils/util.js');
const app = getApp();
const {
  request,
  httpAjax,
} = utils;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1,2,3,4,,5,6,7,8,9],
    orderLIst: [
      {
        orderId: 218378127381,
        oilType: '98#',
        gunType: '2号枪',
        unitPrice: '7.44',
        pay: '200',
        integral: 30,
        createTime: '2018-20-02 12:32:33',
        status: '未支付'
      },
    ],
    blankSta: "all",
    pageNum: 1,
    pageSize: 15,
    orderList: [],
    orderState: ['进行中','待支付','完成','取消','退款'],
    mock: {
      orderList: [
        {
          id: '1',
          name: 'xx',
          alias:'zz',
          tags: '',
          creator: 'xxv',
          createdTime: '123',
          lastModifier: '432',
          lastModifiedTime: '22334',
          oilStationId: 'xxxx',
          squadId: '2132',
          staffId:'',
          memberId:'xx',
          oilMoney: '11',
          proMoney:'33',
          orderSum: 'ss',
          prodIsCounts: '22',
          orderdIsCounts: '22',
          copeWith: '23',
          blankSta: '33',
          paymentInfo: '33',
          orderGenerationTime: '1028-09-09',
          orderCompletionTime: '2012-02-19',
        }
      ]
    }
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
    this.queryOrderListData();
  },
  /**
   * 切换订单类型
   */
  changeOrderType: function (e) {
    const type = e.currentTarget.dataset.blanksta;
    this.setData({
      blankSta: type,
      pageNum: 1,
    },() => {
      this.queryOrderListData();
    });
  },

  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    const url = `${httpAjax}/orderservice/blanketorder/detailspage`;
    const {
      pageNum,
      pageSize,
      orderList,
      blankSta,
    } = this.data;
    const data = {
      pageNum: pageNum + 1,
      pageSize,
    };
    if (blankSta != 'all') {
      data.blankSta = `${blankSta}@1`;
    }
    request(url, data, 'GET').then((res) => {
      if (res.code == 10000) {
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        this.setData({
          orderList: orderList,
          pageNum: pageNum + 1,
        });
      }
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const url = `${httpAjax}/orderservice/blanketorder/detailspage`;
    const {
      pageSize,
      blankSta,
    } = this.data;
    const data = {
      pageNum: 1,
      pageSize,
    };
    if (blankSta != 'all') {
      data.blankSta = `${blankSta}@1`;
    }
    request(url, data, 'GET').then((res) => {
      if (res.code == 10000) {
        const orderList = [];
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        this.setData({
          pageNum: 1,
          orderList: orderList,
        });
      }
      wx.stopPullDownRefresh();
    });
  },
  
  /**
   * 初始化订单列表
   */
  queryOrderListData: function () {
    const url = `${httpAjax}/orderservice/blanketorder/detailspage`;
    const {
      pageSize,
      blankSta
    } = this.data;
    const data = {
      pageNum: 1,
      pageSize,
    };
    if (blankSta != 'all') {
      data.blankSta = `${blankSta}@1`;
    }
    
    request(url, data, 'GET').then((res) => {
      if(res.code == 10000) {
        const orderList = [];
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        orderList.push(res.data[0]);
        this.setData({
          orderList: orderList,
        });
      }
    });
  },

  /**
   * 订单详情跳转
   */
  navToOrderDetail: function () {
    // getCurrentPages().pop();
    wx.navigateTo({
      url: '../paymentMethod/paymentMethod',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})