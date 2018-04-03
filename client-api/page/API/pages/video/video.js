var sourceType = [ ['camera'], ['album'], ['camera', 'album'] ]
var camera = [ 'front', 'back', ['front', 'back'] ]
var duration = Array.apply(null, {length: 60}).map(function (n, i) {
  return i + 1
})

Page({
  data: {
    sourceTypeIndex: 2,
    sourceType: ['拍摄', '相册', '拍摄或相册'],

    cameraIndex: 2,
    camera: ['前置', '后置', '前置或后置'],

    durationIndex: 59,
    duration: duration.map(function (t) { return t + '秒'}),

    src: ''
  },
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  cameraChange: function (e) {
    this.setData({
      cameraIndex: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      durationIndex: e.detail.value
    })
  },
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: sourceType[this.data.sourceTypeIndex],
      camera: camera[this.data.cameraIndex],
      maxDuration: duration[this.data.durationIndex],
      compressed: true,
      success: function (res) {
        console.log('选取视频成功',res);
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  saveVideo: function() {
    var that = this
    console.log(that.data.src,'>>>');
    wx.saveVideoToPhotosAlbum({
      filePath: that.data.src,
      success: function(res) {
        console.log('视频文件保存成功', res);
      },
      fail: function(res) {
        console.log('视频文件保存失败', res);
      }
    })
  }
})
