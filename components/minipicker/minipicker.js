// components/minipicker/minipicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '优惠信息',
    },
    mask: {
      type: Boolean,
      value: true,
    },
    showClose: {
      type: Boolean,
      value: true,
    },
    closeTitle: {
      type: String,
      value: '关闭',
    },
    visible: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hidePicker () {
      console.log(this.data)
      
      this.setData({
        visible: true,
      });
    },
    showPicker () {

    }
  }
})
