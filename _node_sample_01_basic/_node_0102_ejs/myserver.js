// 서버 세팅 
var express = require("express");
var app = express();
var port = 6100;
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
app.get("/main", function(req, res){  // /main : main으로 들어와서 
    res.render("test_main.ejs"); // res.render => ejs 파일을 출력한다.  // render : ejs파일을 그린다 
});

app.get("/var01", function(req, res){ 
    res.render("test_var01.ejs"); 
});
app.get("/var01Pro", function(req, res){ 
    res.render("test_var01Pro.ejs"); 
});

app.get("/var02", function(req, res){ 
    res.render("test_var02.ejs"); 
});
app.get("/var02Pro", function(req, res){ 
    res.render("test_var02Pro.ejs"); 
});

app.get("/var03", function(req, res){ 
    res.render("test_var03.ejs"); 
});
app.get("/var03Pro", function(req, res){ 
    res.render("test_var03Pro.ejs"); 
});



