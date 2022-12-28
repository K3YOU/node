// 서버 세팅 
var express = require("express");
var app = express();
var port = 3403;
var server = app.listen(port, function(){
	console.log("서버가 가동되었습니다" + port);
});

// ejs 세팅(views)
var ejs = require("ejs");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);

// img폴더 경로 셋팅
app.use(express.static('./img'));	

// session 세팅
var session = require("express-session");
app.use(session({
	secret : "abcdefg",
	resave : false,
	saveUninitialized : false
}));

// router
require("./router/memberController")(app);
require("./router/memberTestController")(app);
require("./router/gameController")(app);

app.get("/", function(req, res){
	res.redirect("main");
});

app.get("/main", function(req, res){
	res.render("main.ejs");
});
