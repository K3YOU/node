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
	secret : "abcdefg",
	resave : false, 
	saveUninitialized : false 
}));


// 라우터 세팅
app.get("/", function(req, res){ 
    // session 디비 세팅 (난중에 database 로 변경된다.)
    gameDB = [0,0,0,0,0,0,0,0,0]; // 틱택토 버튼개수
    req.session.gameDB = gameDB; // 틱택토 버튼개수
    req.session.turn = 1;        // 1 이면 p1턴 , 2 이면 p2턴
    req.session.gameover = false; // gameover = true 이면 게임종료
    req.session.win = 0; // 0 이면 게임중 1이면 p1승 , 2이면p2승 , 3이면 무승부
    res.redirect("tttGame"); // res.redirect() 는 라우터이동.
});


app.get("/tttGame", function(req, res){  

    var renderData = {
        "gameDB" : req.session.gameDB,  
        "turn" : req.session.turn,
        "gameover" : req.session.gameover,
        "win" : req.session.win,  
    };
    res.render("_0201_tttGame.ejs"  , renderData );
});

app.get("/tttGamePro", function(req, res){  

    var index = req.query.index;
    var gameDB = req.session.gameDB;
    var gameover = req.session.gameover;
    var win = req.session.win;
    var turn = req.session.turn;

    if (turn == 1){
        gameDB[index] = 1;
        turn = 2;
    }else if (turn == 2){
        gameDB[index] = 2;
        turn = 1;
    }

    // 종료 판정 
    // 가로 판정
    for(var i = 0; i < 9; i+=3){
        if (gameDB[i] == 1  && gameDB[i + 1] == 1 && gameDB[i + 2] == 1){
            gameover = true;
            win = 1;
        }
        if (gameDB[i] == 2  && gameDB[i + 1] == 2 && gameDB[i + 2] == 2){
            gameover = true;
            win = 2;
        }   
    }

    // 세로 판정
    for (var i = 0; i < 3; i++){
        if(gameDB[i] == 1 && gameDB[i + 3] == 1 && gameDB[i + 6] == 1){
            gameover = true;
            win = 1;
        }

        if(gameDB[i] == 2 && gameDB[i + 3] == 2 && gameDB[i + 6] == 2){
            gameover = true;
            win = 2;
        }
    }

    // 대각선1
    if (gameDB[0] == 1 && gameDB[4] == 1 && gameDB[8] == 1){
        gameover = true;
        win = 1;
    }
    if (gameDB[0] == 2 && gameDB[4] == 2 && gameDB[8] == 2){
        gameover = true;
        win = 2;
    }
    // 대각선2
    if (gameDB[2] == 2 && gameDB[4] == 1 && gameDB[6] == 1){
        gameover = true;
        win = 1;
    }
    if (gameDB[2] == 2 && gameDB[4] == 2 && gameDB[6] == 2){
        gameover = true;
        win = 2;
    }

    // 무승부
    var count = 0
    for(var i = 0; i < 9; i++){
        if (gameDB[i] != 0){
            count += 1
        }
    }
    if (count == 9){
        gameover = true;
    }

    if (gameover == true && win == 0){
        win = 3;
    }

    console.log(gameDB );
    console.log(turn );
    console.log(gameover );
    console.log(win );

    req.session.gameDB = gameDB; 
    req.session.turn = turn;        
    req.session.gameover = gameover; 
    req.session.win = win; 
   
    res.redirect("tttGame");
});


