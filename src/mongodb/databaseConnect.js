/**
 *  Mongoose plug-in
 * @type {*|Mongoose}
 */
const mongoose = require('mongoose');
//生成id
const id = mongoose.Types.ObjectId;
//数据库地址
const DB_URL = 'mongodb://localhost:27017/oos';
// 链接数据库
mongoose.connect(DB_URL, {useNewUrlParser: true});

//Mongoose里，一切都始于Schema
const Schema = mongoose.Schema;

//设计文档结构
/**
 * login 登陆
 * username type:String
 * password type:String
 */

let loginSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

/**
 * home 首页
 * array []
 * homeId:String
 * src:String
 * title:String
 * url:String
 */

let homeSchema = new Schema({
  src: {type: String},
  title: {type: String},
  url: {type: String}
});

/**
 * applicationManagement 应用管理
 *
 */

let applicationManagementSchema = new Schema({
  applicationId: {type: Number},
  name: {type: String},
  
});

/**
 * model 模型
 * @type {Model}
 * Models 是从 Schema 编译来的构造函数。 它们的实例就代表着可以从数据库保存和读取的 documents。 从数据库创建和读取 document 的所有操作都是通过 model 进行的。
 */
//Login 登陆
let Login = mongoose.model('Logins', loginSchema);
//home 首页
let home = mongoose.model('homes', homeSchema);
module.exports = {
  Login,
  home,
};
