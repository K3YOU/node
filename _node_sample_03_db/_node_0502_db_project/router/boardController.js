
// mysql 아래 명령어를 db상에서 반드시 실행해야한다.  
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
var mysql = require("mysql");
var conn_info = {
	host : "localhost",
	port : 3306,
	user : "root",
	password : "root",
	database : "_node_db_booshop"
};


//router
module.exports = function(app){

    app.get("/boardList", function(req, res){ 
        var log = req.session.log;

        if(log == null) {
            res.redirect("memberLogin");
        } else {
            var name = req.session.name;
    
            var curPageNum = req.query.curPageNum;      // 현재 페이지 번호
            if(curPageNum == null) {
                curPageNum = 1;
            }

            var boardListCount = 0;        // 전체 게시글 수

            var conn = mysql.createConnection(conn_info);
            var sql1 = "SELECT COUNT(*) FROM board";
            conn.query(sql1, function(error, rows) {
                var json = JSON.stringify(rows);
                var data = JSON.parse(json);
                boardListCount = data[0]["COUNT(*)"];
                
                var onePageBoardCount = 5;                  // 한 페이지에 보여줄 게시글 수
                var boardPageCount = parseInt(boardListCount / onePageBoardCount);    // 전체 페이지 수
                if(boardListCount % onePageBoardCount > 0) {
                    boardPageCount += 1;   
                }
                var curPageBeginBoardNum = (curPageNum - 1) * onePageBoardCount;    // 현재 페이지의 게시글 시작번호

                var onepagepaingNumber = 2;         // 한 페이지에 보여줄 페이징 번호
                var curPageBeginPagingNumber = 1;    // 현재 페이지의 페이징 시작번호
                if(curPageNum % onepagepaingNumber > 0) {
                    curPageBeginPagingNumber = parseInt(curPageNum / onepagepaingNumber) * onepagepaingNumber + 1;
                } else {
                    curPageBeginPagingNumber = (parseInt(curPageNum / onepagepaingNumber) - 1) * onepagepaingNumber + 1;
                }
        
                var curPageEndPagingNumber = curPageBeginPagingNumber + onepagepaingNumber - 1;        // 현재 페이지의 페이징 마침번호
                if(curPageEndPagingNumber > boardPageCount) {
                    curPageEndPagingNumber = boardPageCount;
                }
    
                var sql2 = "SELECT * FROM board ORDER BY boardNo DESC LIMIT ?, ?";
                var inputData = [curPageBeginBoardNum, onePageBoardCount];
                conn.query(sql2, inputData, function(error, rows) {
    
                    var count = 0;
                    if(rows != null) {
                        count = rows.length;
                    }
    
                    var renderData = {	
                        "log" : log,
                        "name" : name,
                        "count" : count,
                        "boardList" : rows,
                        "curPageNum" : curPageNum,
                        "boardPageCount" : boardPageCount,
                        "onepagepaingNumber" : onepagepaingNumber,
                        "curPageBeginPagingNumber" : curPageBeginPagingNumber,
                        "curPageEndPagingNumber" : curPageEndPagingNumber
                    };

                    conn.end();
                    res.render("board/boardList.ejs", renderData); 
                });
                
            });
        }
    });

    app.get("/boardInfo", function(req, res){
        var log = req.session.log;
        var name = req.session.name;
        var boardNo = req.query.boardNo;

        var conn = mysql.createConnection(conn_info);
        var sql1 = "UPDATE board SET boardReadCount = boardReadCount + 1 WHERE boardNo = ?";
        var inputData = [boardNo];
        conn.query(sql1, inputData, function(error) {
            var sql2 = "SELECT * FROM board WHERE boardNo = ?";
            inputData = [boardNo];

            conn.query(sql2, inputData, function(error, rows) {

                var check = false;
                if(rows[0]["boardMemberId"] == log) {
                    check = true;
                }
        
                var renderData = {	
                    "log" : log,
                    "name" : name,
                    "board" : rows[0],
                    "check" : check
                };

                conn.end();
                res.render("board/boardInfo.ejs", renderData); 

            });
    
        });
     });

    app.get("/boardModify", function(req, res){
        var log = req.session.log;
        var name = req.session.name;
        var boardNo = req.query.boardNo;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM board WHERE boardNo = ?";
        var inputData = [boardNo];

        conn.query(sql, inputData, function(error, rows) {
            var renderData = {	
                "log" : log,
                "name" : name,
                "board" : rows[0]
            };

            conn.end();
            res.render("board/boardModify.ejs", renderData); 
        });
     });

    app.get("/boardModifyPro", function(req, res){

        var boardNo = req.query.boardNo;

        var boardSubject = req.query.boardSubject;
        var boardContent = req.query.boardContent;

        var conn = mysql.createConnection(conn_info);
        var sql = "UPDATE board SET boardSubject = ?, boardContent = ? WHERE boardNo = ?";
        var inputData = [boardSubject, boardContent, boardNo];
        conn.query(sql, inputData, function(error) {
            conn.end();
            res.redirect("boardList");
        });
    }); 

    app.get("/boardDelete", function(req, res){
        var boardNo = req.query.boardNo;

        var conn = mysql.createConnection(conn_info);
        var sql = "DELETE FROM board WHERE boardNo = ?";
        var inputData = [boardNo];
        conn.query(sql, inputData, function(error) {
            conn.end();
            res.redirect("boardList");
        });
    });

    app.get("/boardWrite", function(req, res){
        var log = req.session.log;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT MAX(boardNo) FROM board";
        conn.query(sql, function(error, rows) {
            var json = JSON.stringify(rows);
            var data = JSON.parse(json);
            var boardNo = data[0]["MAX(boardNo)"] + 1;
            
            var renderData = {	
                "log" : log,
                "name" : name,
                "boardNo" : boardNo
            };

            conn.end();
            res.render("board/boardWrite.ejs", renderData); 
        });
    });    

    app.get("/boardWritePro", function(req, res){
        var log = req.session.log;

        var boardNo = req.query.boardNo;
        var boardMemberId = log;
        var boardSubject = req.query.boardSubject;
        var boardContent = req.query.boardContent;

        var conn = mysql.createConnection(conn_info);
        var sql = "INSERT INTO board VALUES(?, ?, ?, ?, ?)";
        var inputData = [boardNo, boardMemberId, boardSubject, boardContent, 0];
        conn.query(sql, inputData, function(error) {
            conn.end();
            res.redirect("boardList");
        });
    });  

}