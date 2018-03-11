// components/sigInModal/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, 
  },

  /**
   * 组件的初始数据
   */
  data: {

    remark:""
  },

  /**
   * 组件的方法列表
   */
  methods: {


    bindReplaceInput: function(e){

      this.setData({

        remark:e.detail.value
      })
    },

    sigIn:function(e){

      this.triggerEvent("sureBtn", {remark:this.data.remark});
      this.setData({
        modalHidden:true
      })
    }
  }
})
