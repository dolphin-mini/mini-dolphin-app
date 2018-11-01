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
    }
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

  }
})
