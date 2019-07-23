//express
const express = require('express');
const api = express();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
/**
 * databaseConnect.js
 * module.exports
 * {Login}
 */
const databaseConnect = require('../src/mongodb/databaseConnect');
//login
const Login = databaseConnect.Login;
//home
const home = databaseConnect.home;

//开发的时候使用的
api.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
});

let jsonParser = bodyParser.json();
// let urlencodedParser = bodyParser.urlencoded({extended: false});

api.use("/*", (req, res, next) => {
  let login = req.baseUrl.replace('/', "");
  if (login === 'login') {
    next();
  } else {
    let token = req.headers.authorization; // 从Authorization中获取token
    let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
    jwt.verify(token, secretOrPrivateKey, (err, decode) => {
      err ? res.send(10010, {msg: '请重新登陆'}) : next();
    });
  }
});

/**
 * @connector login
 */
api.post('/login', jsonParser, (req, res) => {
  //查询
  //前端返回的密码s
  //code => token
  let code, password = req.body.password;
  Login.find({username: req.body.username}, (err, doc) => {
    if (err) {
      console.log('查询失败');
    } else {
      //密码判断
      if (password !== doc[0].password) {
        res.json("用户名或密码错误");
      } else {
        // 要生成token的主题信息
        let content = {username: req.body.username};
        // 这是加密的jwt（密钥）
        let secretOrPrivateKey = "jwt";
        let token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: 60 * 60 * 2 // xx天过期
        });
        res.json({status: 200, msg: '登陆成功', token: token, user_name: req.body.username});
      }
    }
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    console.log('查询成功');
  });
});

api.get('/home', (req, res) => {
  home.find({}).exec((err, doc) => {
    if (err) {
      console.log('查询失败');
    } else {
      res.json({status: 200, msg: '', data: doc});
    }
  })
});

api.listen(8081);
