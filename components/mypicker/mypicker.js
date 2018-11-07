// components/mypicker/mypicker.js
Component({

  /**
  * 组件的属性列表
  */
  properties: {
    pickerType: {
      type: String,
      value: 'type1',
    },
    title: {
      type: String,
      value: '优惠信息',
    },
    isShow: {
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    column: String,
    value: {
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: [0, 0, 0], // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function(newVal, oldVal) { // 属性被改变时执行的函数（可选）
        console.log(newVal, oldVal)
        this.setData({
          value: newVal
        })
      }
    },
    list: { //格式[{name:"",data:[{name:"",data:[]}]}]
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: [
        {
          title: '全商品减5元',
          id: '1',
          checked: true,
        },
        {
          title: '不适用优惠券',
          id: '0',
          checked: false,
        },
      ], // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function(newVal, oldVal) { // 属性被改变时执行的函数（可选）
        let inx = this.data.value
        console.log(newVal)
        console.log(oldVal)
        console.log(this.data.column)
        if (this.data.column == "2") {
          this.setData({
            secondClo: newVal[inx[0]].data
          })
        }
        if (this.data.column == "3") {
          this.setData({
            secondClo: newVal[inx[0]].data,
            thirdClo: newVal[inx[0]].data[inx[1]].data
          })
        }
      }
    }
  },



  /**
  
  * 组件的初始数据
  
  */

  data: {

    isShow: true,

    secondClo: [],

    thirdClo: []



  },



  /**
  
  * 组件的方法列表
  
  */

  methods: {

    bindChange: function(e) {

      const newVal = e.detail.value

      const oldVal = this.data.value

      let data = this.data.list

      if (this.data.column == "2") {

        if (oldVal[0] != newVal[0]) {

          this.setData({

            secondClo: data[newVal[0]].data

          })

        }

      }

      if (this.data.column == "3") {

        if (oldVal[0] != newVal[0]) {

          this.setData({

            secondClo: data[newVal[0]].data,

            thirdClo: data[newVal[0]].data[0].data

          })

        }

        if (oldVal[1] != newVal[1]) {

          this.setData({

            thirdClo: data[newVal[0]].data[newVal[1]].data

          })

        }

      }

      this.setData({

        value: e.detail.value

      })

    },

    //隐藏picker

    hidePicker() {

      this.setData({

        isShow: false

      })

    },

    /*
    
    * 内部私有方法建议以下划线开头
    
    * triggerEvent 用于触发事件
    
    */

    _successEvent() {

      console.log("addas")

      //触发成功回调

      this.setData({

        isShow: false

      })

      var myEventDetail = this.data.value

      console.log(this.data.value)

      this.triggerEvent('myevent', myEventDetail)

    }

  }

})