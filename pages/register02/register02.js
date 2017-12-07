// pages/register02/register02.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:new Date(),
    sexs:["男","女"]
  },
  inp:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.c_code = options.c_code;
    this.inp.phone = options.phone;
    this.type = options.type;
    this.setData({
      phone:options.phone
    })
  },
  sexs:function(ev){ 
    this.setData({
      sex: this.data.sexs[ev.detail.value],
      selsex: 1 + parseFloat(ev.detail.value)
    })
  },
  dateValue:function(ev){
    var det = ev.detail.value;
    this.setData({
      dateVal: det
    })
  },
  inputValue:function(ev){
    console.log(ev);
    this.inp[ev.target.dataset.val] = ev.detail.value;
  },
  confirm:function(){
    var that = this;
    var dat = {
      realname : that.inp.realname,
      sex: that.data.selsex,
      phone : that.inp.phone,
      birth : that.data.dateVal,
      key : app.globalData.key,
      pro_id : config.pro_id,
      store : config.store,
      c_code: that.c_code,
      type: that.type
    };
    if(dat.realname == '' || dat.realname == undefined){
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
      });
      return;
    }
    // else if(!/^1[34578]\d{9}$/.test(dat.phone)){
    //   wx.showModal({
    //     title: '提示',
    //     content: '手机号码格式有误!',
    //     success:()=>{}
    //   })
    //   return;
    // } 
    else if (dat.sex == '' || dat.sex == undefined){
      wx.showModal({
        title: '提示',
        content: '请输入性别',
      });
      return;
    } else if (dat.birth == '' || dat.birth == undefined) {
      wx.showModal({
        title: '提示',
        content: '请输入您的出生日期',
      });
      return;
    };
    wx.request({
      url: app.globalData.url + 'Member/createMember',
      method:'POST',
      dataType:'JSON',
      data:dat,
      success:(res)=>{
        var str = JSON.parse(res.data);
        if(str.success == 1){
          wx.redirectTo({
            url: '../label/label',
          })
        }
      }
    })
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
  
  }
})