
// mysql 아래 명령어를 db상에서 반드시 실행해야한다.  
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
var mysql = require("mysql");
var conn_info = {
	host : "localhost",
	port : 3306,
	user : "root",
	password : "root",
	database : "_node_db_test",
    multipleStatements: true    // 여러 쿼리를 ;를 기준으로 한번에 보낼 수 있게 해줌.
};

//router
module.exports = function(app){

    app.get("/updownGameReady", function(req, res){
        req.session.com = parseInt(Math.random() * 100) + 1
        req.session.gameCount = 1;
        req.session.gameScore = 100;
        req.session.gameOver = false;
        req.session.gameMsg = "숫자를 입력하세요 ";
        res.redirect("updownGamePlay");
    });

    app.get("/updownGamePlay", function(req, res){
        var renderData = {
            "com" : req.session.com,
            "gameCount" : req.session.gameCount ,
            "gameScore" :  req.session.gameScore ,
            "gameOver" :  req.session.gameOver ,
            "gameMsg" :  req.session.gameMsg ,
        };  
        res.render("game/updownGamePlay.ejs" , renderData);
    });
    
    app.get("/updownGamePlayPro", function(req, res){
        var me = req.query.me;
        if(me == req.session.com){
            req.session.gameMsg = me + ' : 정답';
            res.redirect("updownGameOver");

        }else{
            req.session.gameCount += 1;
            req.session.gameScore -= 10;
            if (me > req.session.com){
                req.session.gameMsg = me + ': UP';
            }else{
                req.session.gameMsg = me + ': DOWN';
            }

            if (req.session.gameCount > 10){
                req.session.gameMsg = me + ': 꽝';
                res.redirect("updownGameOver");
            }else{
                res.redirect("updownGamePlay");
            }
        }    
    });

    app.get("/updownGameOver", function(req, res){
        var renderData = {
            "com" : req.session.com,
            "gameCount" : req.session.gameCount ,
            "gameScore" :  req.session.gameScore ,
            "gameMsg" :  req.session.gameMsg ,
        };  
        res.render("game/updownGameOver.ejs" , renderData);

    });


    app.get("/updownGameOverPro", function(req, res){
    
        var playerName = req.query.playerName;
        var gameScore = req.session.gameScore;
        var conn = mysql.createConnection(conn_info);

        var sql1 = "SELECT MAX(scoreNo) FROM scoreBoard";
        
        // 첫번째 연결 
        conn.query(sql1, function(error, rows) {

            var json = JSON.stringify(rows); 
            var data = JSON.parse(json);

            var scoreNo = data[0]["MAX(scoreNo)"] + 1;
            
            var sql2 = "INSERT INTO scoreBoard VALUES(?, ?, ?)";
            var inputData = [scoreNo, gameScore, playerName];
            
            // 두번째 연결 
            conn.query(sql2, inputData, function(error) {
                console.log(error);
                conn.end();
                res.redirect("scoreBoardList");
            });
            
        });
    });

    app.get("/scoreBoardList", function(req, res){
      
        var conn = mysql.createConnection(conn_info);

        var sql = "SELECT * FROM scoreBoard ORDER BY scorePoint DESC limit 0, 5";

        conn.query(sql ,  function(error , rows) {        
            var renderData = {               
                "scoreDB" : rows
            };
            conn.end();
            res.render("game/scoreBoardList.ejs", renderData);
        });

    });

};