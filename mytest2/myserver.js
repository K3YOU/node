// 서버 세팅 
var express = require("express"); // express 변수생성
var app = express();              // app 에 express변수 저장
var port = 3102;				  // 포트번호 생성 
var server = app.listen(port, function(){
	console.log("서버가 가동되었습니다" + port);
});

// ejs 세팅(views)
var ejs = require("ejs");    // ejs 변수생성
app.set("views", __dirname);  // 경로설정 
app.set("view engine", "ejs");  // ejs세팅1  
app.engine("ejs", ejs.renderFile); // ejs세팅2  




// 라우터 세팅
// res.render 하나당 ejs파일을 하나씩 추가한다. 
app.get("/x", function(req, res){ 
    res.render("test02.ejs"); // res.render => ejs 파일을 출력한다. 
});

