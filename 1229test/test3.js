// 서버 세팅 
var express = require("express");
var app = express();
var port = 3105;
var server = app.listen(port, function(){
	console.log("서버가 가동되었습니다" + port);
});

// ejs 세팅(views)
var ejs = require("ejs");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);


// 라우터 세팅
app.get("/", function(req, res){ 
    res.redirect("main"); // res.redirect() 는 라우터상에서 이동한다.
});

// res.render 하나당 ejs파일을 하나씩 추가한다. 
app.get("/main", function(req, res){ 
    res.render("_0300_main_array.ejs"); // res.render() 는 ejs 파일을 출력한다. 
});


app.get("/array01", function(req, res){
    res.render("_0301_array_test.ejs");
});
app.get("/array01Pro", function(req, res){
    res.render("_0301_array_testPro.ejs");
});

app.get("/array02", function(req, res){
    res.render("_0302_array_test.ejs");
});
app.get("/array02Pro", function(req, res){
    res.render("_0302_array_testPro.ejs");
});

app.get("/array03", function(req, res){
    res.render("_0303_array_test.ejs");
});
app.get("/array03Pro", function(req, res){
    res.render("_0303_array_testPro.ejs");
});

