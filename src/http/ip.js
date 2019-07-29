/**
 * @param {baseUrl} 数据请求全局接口
 * @param {imgUrl}  图片上传全局接口
 * @param {fileUrl}  文件上传全局接口
 * @param {websocketUrl}  websocket全局接口
 */

// fileUrl, websocketUrl
let baseUrl, imgUrl;

/**
 * development (开发环境)
 * production  (生产环境)
 */
if (process.env.NODE_ENV === 'development') {
  //本地服务器 开发环境ip地址
  baseUrl = "http://10.10.0.201:8081";
  // baseUrl = "http://192.168.2.186:8081";
  imgUrl = "";
} else {
  baseUrl = "";
  imgUrl = "";
}

export {
  baseUrl,
  imgUrl
}


