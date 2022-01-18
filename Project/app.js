
/**
 * Module dependencies.
 */
 var express = require('express');
 var routes = require('./routes');
 var todo = require('./routes/todo');
 var path = require('path');
 var stylus = require('stylus');
 var logger = require('morgan');
 var methodOverride = require('method-override');
 var bodyParser = require('body-parser');
 var errorHandler = require('errorhandler');
 var cookieParser = require('cookie-parser');
 
 var app = express();

 app.set('views', __dirname + '/views');	// 템플릿
 app.set('view engine', 'ejs');		// 템플릿 엔진

 //미들웨어 연결
 //app.use(favicon());				      // 파비콘
 app.use(logger('dev'));			    // 로그 기록
 app.use(bodyParser.json());      // 요청 본문 파싱
 app.use(bodyParser.urlencoded({ extended: false }));		
 app.use(methodOverride());		    // 구식 브라우저 메소드 지원
 app.use(cookieParser());
 
 // 정적 리소스 처리
 app.use(stylus.middleware(__dirname + '/public'));
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
 app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')));
 app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
 app.use(express.static(path.join(__dirname, '/stylesheets')));
 app.use(express.static(path.join(__dirname, '/javascripts')));
 // error handling middleware should be loaded after the loading the routes
 if ('development' == app.get('env')) {
  app.use(errorHandler());
 }

 app.get('/', routes.index);
 app.get('/list', todo.list);
 app.post('/add', todo.add);
 app.post('/complete', todo.complete);
 app.post('/del', todo.del);
 app.post('/cancel',todo.cancel);
 
 const port = process.env.PORT || 3000
 app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
 })

