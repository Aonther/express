var express = require('express');
var router = express.Router();
var fs = require('fs');

var PATH ='./public/data/';
var mongoose = require('mongoose');
var model = require('../models/models');
var Demo = model.Demo;
mongoose.connect('mongodb://localhost/express_demo');


/* GET home page. */
router.get('/', function(req, res, next) {

  var user = req.cookies.user? "<a href='/'>后台管理系统</a>" + 
  "<span class='header_user'>欢迎你," + 
  req.cookies.user + 
  "</span>" + 
  '<span style="float:right" class="LogOut"> ' + 
  ' <a href="javascript:;">登出</a></span>':"<a href='/'>后台管理系统</a><span class='header_user'>" + 
  "你还未登入" + 
  "</span>" + 
  '<span style="float:right"><a href="/register">注册</a></span>' +
  '<span style="float:right;margin-right:20px;" ><a href="/login">登入</a></span>';

  res.render('index', {
    title: '首页',
    user: user
  });
});


// 跳转到添加数据页面
router.get('/add', function(req, res, next) {
  var user = req.cookies.user;
  Demo.find(function(err, docs) {
      res.render('add', {
          title: 'Express+MongoDb示例',
          demos: docs,
          user: user
        });
  });
});


// 查询对应修改记录，并跳转到修改页面
router.get('/update', function(req, res, next) {
  
  var id = req.query.id;
  var user = req.cookies.user;
  
  if (id && id != '') {
      Demo.findById(id, function(err, docs) {
          res.render('update', {
              title: '修改数据',
              demo: docs,
              user: user
          });
      });
  }
  
});


// 修改数据
router.post('/update', function(req, res, next) {
  
  var demo = {
      uid: req.body.uid,
      title: req.body.title,
      content: req.body.content
  };

  var id = req.body.id;

  if (id && id != '') {
      Demo.findByIdAndUpdate(id, demo, function(err, docs) {
          res.redirect('xlsx');
      });
  }
  
});

// 登入
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});

// 注册
router.get('/register', function(req, res, next) {
  res.render('register', { title: '注册' });
});

// 模块配置
router.get('/tuijian', function(req, res, next) {
  if(!req.cookies.user){
    return res.render('login',{});
  }
  var user = req.cookies.user;
  res.render('tuijian', {user:user});
});



// xlsx表格
router.get('/xlsx', function(req, res, next) {
  
  if(!req.cookies.user){
    return res.render('login',{});
  }
  var user = req.cookies.user;

  Demo.find(function(err, doc) {
    res.render('xlsx', {
        title: 'Express+MongoDb示例',
        demos: doc,
        user: user
      });
  });
});

// 修改
router.get('/edit', function(req, res, next) {
  if(!req.cookies.user){
    return res.render('login',{});
  }
  var type = req.query.type;
  var user = req.cookies.user;
  if(type){
    var obj = {};
    switch(type){
      case 'sanwen':
            obj = {};
            break;
      case 'it':
        obj = {};
        break;
      case 'manager':
        obj = {};
        break;
      case 'cookies':
        obj = {};
        break;
      default :
            return res.send({
              status:0,
              info:'参数错误'
            });
      break;
    }
    fs.readFile(PATH + type + '.json', (err, data) => {
      if (err) {
        return res.send({
          status:0,
          info: 'fail.....'
        });
      }
      var obj = JSON.parse(data.toString());
      return res.render('edit', {
        data: obj, // 模板中的数据从这里传过去
        user: user
      });
    });
  }else {
    return res.send({
      status:0,
      info: '参数错误'
    });
  }
});

module.exports = router;
