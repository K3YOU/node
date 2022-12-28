// 서버 세팅 
var express = require("express");
var app = express();
var port = 3301;
var server = app.listen(port, function(){
	console.log("서버가 가동되었습니다" + port);
});

// ejs 세팅(views)
var ejs = require("ejs");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);


// session 세팅
var session = require("express-session");
app.use(session({
	secret : "abcdefg", // 아무내용으로 해놓으면된다. 
	resave : false, // 매requst 마다 session 을 다시 저장하는 옵션 (true로 하면 호율이 나빠진다. )
	saveUninitialized : false // 빈세션이 계속 저장될수있다. false 로 해놓으면된다. (true로 하면 호율이 나빠진다. )
}));

/*
    [세션]
        [1] 리퀘스트와 달리 데이터가 항상유지된다. 
        [2] 브라우저를 종료하면 세션의 데이터는 자동삭제된다. 
        [3] npm install express-session
        [4] 사용법 ==> req.session.변수명 = 값 
*/

// 라우터 세팅
app.get("/", function(req, res){ 
    // session 디비 세팅 (난중에 database 로 변경된다.)
    socreDB = [65,45,88]; // 임의로 데이터 3개를 저장후 시작했다.
    req.session.scoreDB = socreDB // db 배열
   
    res.redirect("scoreListAll"); // res.redirect() 는 라우터이동.
});

app.get("/scoreListAll", function(req, res){  

    var renderData = {
        "scoreDB" : req.session.scoreDB,
    };
    res.render("_0101_scoreListAll.ejs"  , renderData );
});


app.get("/scoreAddRandomPro", function(req, res){  
    var scoreDB = req.session.scoreDB
    var ran = Math.floor(Math.random() * 101)
    scoreDB.push(ran)
    
    // 변경된 내용이 있으면 다시 저장한다. 
    req.session.scoreDB = scoreDB

    // Pro 요청은 ejs 파일이 필요없기때문에 redirect 로 원래 페이지로 보낸다.
    res.redirect("scoreListAll");
});

app.get("/scoreListPass", function(req, res){  
    var renderData = {
        "scoreDB" : req.session.scoreDB,
    };

    res.render("_0102_scoreListPass.ejs" , renderData);
});

app.get("/scoreUpdateForm", function(req, res){  
    var index = req.query.index
    var renderData = {
        "scoreDB" : req.session.scoreDB,
        "index" : index
    };

    res.render("_0103_scoreUpdateForm.ejs" , renderData);
});

app.get("/scoreUpdatePro", function(req, res){  
    var updateNumber = req.query.updateNumber
    var index = req.query.index
    var scoreDB = req.session.scoreDB;
    scoreDB[index] = updateNumber

    req.session.scoreDB = scoreDB
    res.redirect("scoreListAll");
});

app.get("/scoreDeletePro", function(req, res){  
    var index = req.query.index
    var scoreDB = req.session.scoreDB;
    scoreDB.splice(index , 1)

    req.session.scoreDB = scoreDB;
    res.redirect("scoreListAll");
});

app.get("/scoreDeleteAllPro", function(req, res){  
    var scoreDB = req.session.scoreDB;
    scoreDB = []

    req.session.scoreDB = scoreDB;
    res.redirect("scoreListAll");
});
