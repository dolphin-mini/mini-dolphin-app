// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgsrc: {
      type: String
    },
    text: {
      type: String
    },
    btntext: {
      type: String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    src: "../../images/recharge/recharge_logo.png",
    value: "充值成功"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submitbtn: function () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('orderComplete', myEventDetail, myEventOption)
    }
  }
})
