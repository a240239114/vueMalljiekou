var express = require("express");
var app = express();
var fs = require('fs');

//处理提交的json数据
app.use(express.json())

//引入路由
var newslist = require("./routes/newslist");
var good = require("./routes/good");
var image = require("./routes/image");
var comment = require("./routes/comment");

//公开资源
app.use('/public/',express.static('./public/'))

//body-parser的配置
var bodyParser = require('body-parser')
//对post请求体的处理
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

//解决跨域
var cors = require ('cors')
app.use(cors())

//设置一级路由
app.use("/newslist", newslist);
app.use("/good", good);
app.use("/image", image);
app.use("/comment", comment);

//设置页面路径
app.get('/',(req,res)=>{
   fs.readFile('./views/index.html',(err,data)=>{
       res.send(data.toString());
   });
})

module.exports = app;
