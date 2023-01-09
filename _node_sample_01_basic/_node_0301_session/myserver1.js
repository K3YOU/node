// 서버 세팅 
var express = require("express");
var app = express();
var port = 3302;
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 첫 페이지 불러오기 
app.get("/scoreListAll", function(req, res){  
 
    var renderData = { //랜더데이터
        "scoreDB" : req.session.scoreDB,
    };
    res.render("_0101_scoreListAll.ejs"  , renderData ); //ejs
});


//랜덤으로 값 추가하기
app.get("/scoreAddRandomPro", function(req, res){  
    var scoreDB = req.session.scoreDB
    var ran = Math.floor(Math.random() * 101)
    scoreDB.push(ran)
    
    // 변경된 내용이 있으면 다시 저장한다. 
    req.session.scoreDB = scoreDB

    // Pro 요청은 ejs 파일이 필요없기때문에 redirect 로 원래 페이지로 보낸다.
    res.redirect("scoreListAll"); // 첫 페이지 불러오기로 다시 돌아간다
});


app.get("/scoreListPass", function(req, res){  
    var renderData = {
        "scoreDB" : req.session.scoreDB,
    };

    res.render("_0102_scoreListPass.ejs" , renderData);
});


// '변경되기 전' but 새로운 숫자를 입력하는 창을 만들기 위한 페이지 -> /scoreupdateForm으로 들어오면 ejs를 그려라
app.get("/scoreUpdateForm", function(req, res){  
    // var index = req.query.index
    var renderData = {
        "scoreDB" : req.session.scoreDB,
        "index" :  req.query.index
    };

    res.render("_0103_scoreUpdateForm.ejs" , renderData);
});

// 변경을 여기서 하고 새로운 페이지에 변경한 숫자를 보여주는게 아니라 원래 페이지에서 변경된 숫자를 보여줄 경우
app.get("/scoreUpdatePro", function(req, res){  
    var updateNumber = req.query.updateNumber // 변경된 값
    var index = req.query.index_2  //변경된 위치(=i) //index_2자리에 이름명이 들어가야함. pro에서도 index를 사용하므로 정의를 해주고 index_2에서 사용함
    var scoreDB = req.session.scoreDB; 
    scoreDB[index] = updateNumber //socreDB[i] = 새로운 숫지

    req.session.scoreDB = scoreDB // 디비 위치랑 숫자 바껴졌음
    res.redirect("scoreListAll");  // 원래 페이지에 변경된 숫자를 보여줄 때
});

app.get("/scoreDeletePro", function(req, res){  
    // req.session.scoreDB.splice(req.query.index ,1);

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
