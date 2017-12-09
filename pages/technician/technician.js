// pages/technician/technician.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList('','');
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
    var current = getCurrentPages();
    var prePage = current[current.length - 2],
        list = this.data.list,
        selId = this.data.selId;
    list.forEach(function(v){
      if(v.id == selId){
        prePage.setData({
          technician: v.name,
          technicianID:v.id
        })
      }
    })
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
    this.getList(this.start, this.data.inputVal);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  start:'',
  name:'',
  getList: function (start, name){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Cosmetology/bespeakExpertAll',
      method:'GET',
      dataType:'JSON',
      data:{
        pro_id: config.pro_id,
        store: config.store,
        key: app.globalData.key,
        start: start,
        name: name
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        console.log(str);
        if(str.success == 1){
          that.start = str.hasMore?str.nextStart:'';
          that.setData({
            list:str.responseData
          })
        }
      }
    })
  },
  selTechnician:function(ev){
    var user_id = ev.target.dataset.id;
    console.log(user_id);
    console.log(this.data.selId)
    if(user_id == this.data.selId){
      this.setData({
        selId:''
      })
    }else{
      this.setData({
        selId:user_id
      })
    }
  },
  searchTechnician:function(ev){
    var val = ev.detail.value;
    this.setData({
      inputVal:val
    })
    this.getList(this.start,val);
  },
  clearInputValue:function(){
    this.setData({
      inputVal: ''
    })
  }
})