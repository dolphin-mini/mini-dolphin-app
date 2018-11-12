// components/detailInput/detailInput.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses:["label-class","input-class"],
  properties: {
    disabled: {
      type: Boolean,
      value: true,
    },
    label: {
      type: String,
      value: '测试',
    },
    value:{
      type: String||Number,
      value: 'xxx',
    },
    placeholder: {
      type: String,
      value: ''
    },
    containerClass: {
      type: String,
      value: '',
    },
    inputWrapClass: {
      type: String,
      value: '',
    },
    labelWrapClass: {
      type: String,
      value: '',
    },
    labelStyle: {
      type: String,
      value: '',
    },
    inputStyle: {
      type: String,
      value: '',
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

  }
})
