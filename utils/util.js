const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 封装loading
 */
const loading = (title="加载中", duration=10000, icon="loading") => {
  wx.showToast({
    title,
    icon,
    duration,
  });
}
  /**
   * 封装hideLoading
   */
const hideLoading = () => {
    wx.hideToast();
  }
/**
 * 请求
 */
const request = (config) => {
  const DEFAUTL_CONFIG = {
    root: "",
    utl: "",
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    data: {},
    loading: false,
  };
  config = Object.assign({}, DEFAUTL_CONFIG, config);
  return new Promise(function(resolve, reject){
    if(config.loading) {
      loading()
    }
    wx.request({
      url: config.root + config.url,
      method: config.method,
      data: config.data,
      header: config.header,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      },
      complete() {
        hideLoading()
      }
    });
  });
}

module.exports = {
  formatTime: formatTime,
  loading: loading,
  hideLoading: hideLoading,
  request: request,
}
