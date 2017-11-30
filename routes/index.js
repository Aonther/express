var express = require('express');
var router = express.Router();
var fs = require('fs');

var PATH ='./public/data/';

/* GET home page. */
router.get('/', function(req, res, next) {

  var user = req.cookies.user? "<a href='/'>后台管理系统</a>" + 
  "<span class='header_user'>" + 
  req.cookies.user + 
  "</span>" + 
  '<span style="float:right" class="LogOut"> ' + 
  ' <a href="javascript:;">登出</a></span>':"<a href='/'>后台管理系统</a><span class='header_user'>" + 
  "你还未登入" + 
  "</span>" + 
  '<span style="float:right"><a href="/register">注册</a></span>' +
  '<span style="float:right;margin-right:20px;" ><a href="/login">登入</a></span>';
  console.log(user)
  res.render('index', {
    title: '首页',
    user: user
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: '注册' });
});
router.get('/tuijian', function(req, res, next) {
  if(!req.cookies.user){
    return res.render('login',{});
  }
  res.render('tuijian', { });
});

router.get('/edit', function(req, res, next) {
  if(!req.cookies.user){
    return res.render('login',{});
  }
  var type = req.query.type;
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
        data: obj // 模板中的数据从这里传过去
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
