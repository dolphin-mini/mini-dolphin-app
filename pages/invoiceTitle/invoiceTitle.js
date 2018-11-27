// pages/invoiceTitle/invoiceTitle.js
const utils = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: false,
    swiperStartPoint: null,
    isSelected: true,
    isActive: 'company',
    isHiddenModal: true,
    titleType: 'company',
    invoiceInfo: [
      {
        id: 1,
        duty: '12837xx891273',
        address: '山东xxxx',
        checked: true,
        swiper: false,
      },
      {
        id: 2,
        duty: '2131289371289',
        address: 'xxxxxx',
        checked: false,
        swiper: false,
      },
      {
        id: 2,
        duty: '2131289371289',
        address: 'xxxxxx',
        checked: false,
        swiper: false,
      },
      {
        id: 2,
        duty: '2131289371289',
        address: 'xxxxxx',
        checked: false,
        swiper: false,
      },
      {
        id: 2,
        duty: '2131289371289',
        address: 'xxxxxx',
        checked: false,
        swiper: false,
      },
      {
        id: 2,
        duty: '2131289371289',
        address: 'xxxxxx',
        checked: false,
        swiper: false,
      },
    ]
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
   * 切换抬头类型
   */
  invoiceTitleChange: function (e) {
    let { id } = e.currentTarget.dataset;
    const {invoiceInfo} = this.data;
    invoiceInfo.forEach((item) => {
      if(item.id === id) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    this.setData({
      invoiceInfo,
    });
  },
  /**
   * 更改发票抬头
   */
  changeTitle: function (e) {
    let { id } = e.target.dataset;
    console.log(id)
    const { isActive } = this.data;
    if(id === isActive) {
      id = null;
    }
    this.setData({
      isActive: id,
      titleType: id,
    });
  },
  /**
   * 关闭弹窗
   */
  closeModal: function () {
    const { isActive, titleType } = this.data;
    this.setData({
      isHiddenModal: true,
      isActive: titleType,
    });
  },
  /**
   * 打开弹窗
   */
  openModal: function () {
    const { titleType } = this.data;
    this.setData({
      isHiddenModal: false,
      isActive: titleType,
    });
  },
  /**
   * 初始化发票抬头列表
   */
  initInvoiceList: function () {
    const {
      userInfo,
    } = app.globalData;
    utils.request('http://192.168.3.29:8867/memberservice/invoicetitleinfo/list',{
      userId: userInfo.id,
    },'GET').then((res) => {
      if(res === 10000) {
        res.data.forEach((item) => {
          item.checkd = false;
        });
      }
    });
  },
  /**
   * 新增公司发票抬头
   */
  formSubmitCompany: function (e) {
    console.log(e)
    const invoiceInfo = e.detail.value;
    const { isActive } = this.data;
    utils.request('http://192.168.3.29:8867/memberservice/invoicetitleinfo',{
      ...invoiceInfo,
      status: 1,
    },'POST').then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none',
      });
    });

    this.setData({
      isHiddenModal: true,
      titleType: isActive,
    });
  },
  /**
   * 新增个人发票抬头
   */
  formSubmitPerson: function (e) {
    utils.request('http://192.168.3.29:8867/memberservice/invoicetitleinfo', {
      status: 2,
    }, 'POST').then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none',
      });
    });
    this.setData({
      isHiddenModal: true,
      titleType: isActive,
    });
  },
  /**
   * 删除发票抬头
   */
  removeInvoiceTitle: function (e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    utils.request(`http://192.168.3.29:8867/memberservice/invoicetitleinfo/${id}`,{},'GET').then((res) => {
      if(res.code) {
        this.initInvoiceList();
      }
    });
  },
  /**
   * 扫一扫
   */
  openScanCode: function () {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    });
    // var _this = this;
    // wx.requestPayment({
    //   'timeStamp': '',
    //   'nonceStr': '',
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success': function (res) {
    //     console.log(res)
    //   },
    //   'fail': function (res) {
    //     console.log(res)
    //   }
    // })
  },
  swiperStart: function (e){
    this.setData({
      swiperStartPoint: e.touches[0],
    });
  },
  swiperMove: function (e) {
    const {
      swiperStartPoint,
      invoiceInfo,
    } = this.data;
    const endX = e.touches[0].clientX;
    const  listId = e.currentTarget.dataset.id;
    if(swiperStartPoint.clientX -endX > 5) {
      invoiceInfo.forEach((item) => {
        if(listId === item.id) {
          item.swiper = true;
        } else {
          item.swiper = false;
        }
      });
      this.setData({
        invoiceInfo,
      });      
    }
  },
  clearSwiper: function (e) {
    const {
      invoiceInfo,
    } = this.data;
    invoiceInfo.forEach((item) => {
      item.swiper = false;
    })
    this.setData({
      invoiceInfo,
    });
  },
  /**
   * 提交请求
   */
  submitInvoice: function () {
    wx.navigateTo({
      url: '../invoiceDetail/invoiceDetail',
    });
  }
})