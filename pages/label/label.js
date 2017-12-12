// pages/label/label.js
var app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel:'background:#DCC187;border-color:#DCC187;color:#fff;'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    // console.log(app.globalData.labels)
    this.setData({
      labels:app.globalData.labels
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
  
  },
  getData:function(){
    var that = this;
    wx.request({
      url: app.globalData.url + 'Member/labelList',
      method: 'GET',
      dataType: 'JSON',
      data:{
        key : app.globalData.key,
        pro_id : config.pro_id,
        store : config.store
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        // console.log(str)
        var lis = str.responseData,len,
            labels = app.globalData.labels;
            // console.log(labels)
            len = labels == undefined || labels[0] == undefined?0:labels.length;
        // lis.forEach(function(v){
        //   v.sel = 0;
        // })
        for(var i=0; i<lis.length; i++){
          lis[i].sel = 0;
          for (var j = 0; j < len; j++){
            if(lis[i].id == labels[j].id){
              lis[i].sel = 1;
            }
          }
        }

        if(str.success == 1){
          that.setData({
            list: lis,
            num: len
          })
        }
      }
    })
  },
  selLabel:function(ev){
    var lis = this.data.list,
        num = parseInt(this.data.num);
    
    // console.log(ev)
    lis.forEach(function(v){
      if(v.id == ev.target.dataset.id){
        if(!v.sel){
          if (num >= 9) {
            wx.showModal({
              title: '提示',
              content: '标签已达上限',
            })
            return;
          }
          num++;
        }else{
          num--;
        }
        v.sel = !v.sel;
      }
    });
    this.setData({
      list:lis,
      num: num
    })
  },
  postDatas:function(){
    var that = this;
    var lis = that.data.list,
        labels = app.globalData.labels,
        ids=[];
    labels = labels == undefined?[]:labels;
    lis = JSON.stringify(lis) == '{}'?[]:lis;
    console.log('labels')
    console.log(labels)
    console.log(lis);
    lis.forEach(function(v){
      if(v.sel){
        labels.push(v);
        ids.push(v.id);
      }
    })
    wx.request({
      url: app.globalData.url + 'Member/labelAdd',
      method:'POST',
      dataType:'JSON',
      data:{
        key:app.globalData.key,
        store:config.store,
        pro_id:config.pro_id,
        label_id:ids
      },
      success:(res)=>{
        var str = JSON.parse(res.data);
        if(str.success == 1){
          app.globalData.register = true;
          if(app.globalData.labels){
            wx.navigateBack({
              data:1
            })
          }else{
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        }
      }
    })

  }
})