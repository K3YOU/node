// 서버 세팅 
var express = require("express");
var app = express();
var port = 3401;
var server = app.listen(port, function(){
	console.log("서버가 가동되었습니다" + port);
});

// ejs 세팅(views)
var ejs = require("ejs");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);
//---------------------------------------------------------------------------------------
// img폴더 경로 셋팅
app.use(express.static('./img'));			
//---------------------------------------------------------------------------------------
// session 세팅
var session = require("express-session");
app.use(session({							// session에는 옵션3가지를 설정해야줘야 한다. 
	secret : "abcdefg",						// secret에는 아무 내용이나 작성해주고,
	resave : false,							// 나머지는 false로 설정한다.
	saveUninitialized : false				// 나머지는 false로 설정한다.
}));
//---------------------------------------------------------------------------------------
// 라우터 폴더 연결
require("./router/memberController")(app);
require("./router/tttController")(app);
//---------------------------------------------------------------------------------------


function getMemberSample() {
	memberDB = [
		{"memberNo" : 1001 , "memberName" : "홍길동" , "memberGrade" : 1, "memberSubject" : "HTML",   "memberHobby" : "운동,독서", 		"memberMemo" : "반갑습니다1."},
		{"memberNo" : 1002 , "memberName" : "김말자" , "memberGrade" : 2, "memberSubject" : "CSS", 	  "memberHobby" : "공부", 			"memberMemo" : "반갑습니다2."},
		{"memberNo" : 1003 , "memberName" : "박홍성" , "memberGrade" : 3, "memberSubject" : "CSS", "memberHobby" : "운동,쇼핑", 		"memberMemo" : "반갑습니다3."},
		{"memberNo" : 1004 , "memberName" : "채민정" , "memberGrade" : 4, "memberSubject" : "JS", 	  "memberHobby" : "", 			    "memberMemo" : "반갑습니다4."},
		{"memberNo" : 1005 , "memberName" : "민소희" , "memberGrade" : 2, "memberSubject" : "CSS", 	  "memberHobby" : "운동,독서,공부",  "memberMemo" : "반갑습니다5."}
	];

	return memberDB;
}


// 라우터 세팅
app.get("/", function(req, res){ 
 	//---------------------------------------------------------------------------
	var memberDB = getMemberSample(); // 너무 길어서 함수화 
	req.session.memberDB = memberDB;

    //---------------------------------------------------------------------------
	tttArr = [0,0,0,0,0,0,0,0,0]; // 틱택토 버튼개수
    req.session.tttArr = tttArr; // 틱택토 버튼개수
    req.session.tttTurn = 1;        // 1 이면 p1턴 , 2 이면 p2턴
    req.session.tttGameover = false; // gameover = true 이면 게임종료
    req.session.tttWin = 0; // 0 이면 게임중 1이면 p1승 , 2이면p2승 , 3이면 무승부

	 //---------------------------------------------------------------------------
	
	
	res.redirect("main"); 
});


app.get("/main", function(req, res){ 
    res.render("_0101_main.ejs"); 
});



