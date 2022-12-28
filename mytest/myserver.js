// 서버 세팅 
var express = require("express"); // express 변수생성
var app = express();              // app 에 express변수 저장
var port = 80;				  // 포트번호 생성 
var server = app.listen(port, function(){
	console.log("서버가 가동되었습니다" + port);
});
