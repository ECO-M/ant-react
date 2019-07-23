import axios from 'axios';
import {baseUrl} from '../http/ip';

const sendRequest = (apiName, method, data) => {
  if (!apiName) {
    return;
  }
  // //验证token部分
  if (localStorage.getItem('token')) {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    };
  }
  //定义请求参数配置
  let config = {
    url: baseUrl + apiName || '',
    method: method || 'get',
    params: data || '',
    data: data || {},
  };
  
  //关于data的处理,如果后台按照序列化的标准接受就采用qs模块去处理post请求参数
  if (!data) {
    delete config.params;
    delete config.data;
  } else {
    if (method === 'get' || method === 'GET' || method === "delete" || method === "DELETE") {
      delete config.data
    } else if (method === 'post' || method === 'POST' || method === 'put' || method === 'PUT') {
      delete config.params
    }
  }
  
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      if (res.data.status === 200) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    }).catch(err => {
      //错误提示
      console.log(err);
    })
  })
};

export default sendRequest;

