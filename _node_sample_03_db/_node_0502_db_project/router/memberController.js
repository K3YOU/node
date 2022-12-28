
// mysql 아래 명령어를 db상에서 반드시 실행해야한다.  
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
var mysql = require("mysql");
var conn_info = {
	host : "localhost",
	port : 3306,
	user : "root",
	password : "root",
	database : "_node_db_booshop",
    multipleStatements: true    // 여러 쿼리를 ;를 기준으로 한번에 보낼 수 있게 해줌.
};


//router
module.exports = function(app){

    app.get("/memberJoin", function(req, res){ 
        var log = req.session.log;

        var renderData = {
            "log" : log
        };
        res.render("member/memberJoin.ejs", renderData);
    });

    app.get("/memberJoinPro", function(req, res){ 
        var log = req.session.log;

        var memberId = req.query.memberId;
        var memberPw = req.query.memberPw;
        var memberName = req.query.memberName;
        var memberEmail = req.query.memberEmail;

        var conn = mysql.createConnection(conn_info);

        var sql1 = "SELECT MAX(memberNo) FROM member";
        
        conn.query(sql1, function(error, rows) {
            var json = JSON.stringify(rows);
            var data = JSON.parse(json);
            var memberNo = data[0]["MAX(memberNo)"] + 1;
            
            var sql2 = "INSERT INTO member VALUES(?, ?, ?, ?, ?)";
            var inputData = [memberNo, memberId, memberPw, memberName, memberEmail];
            conn.query(sql2, inputData, function(error) {
                conn.end();
                res.redirect("memberLogin"); 
            });
            
        });
    });

    app.get("/memberLogin", function(req, res){ 
        var log = req.session.log;
    
        var renderData = {	
            "log" : log
        };

        res.render("member/memberLogin.ejs", renderData); 
    });    

    app.get("/memberLoginPro", function(req, res){ 
        var log = req.session.log;

        var memberId = req.query.memberId;
        var memberPw = req.query.memberPw;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT memberName FROM member WHERE memberId = ? AND memberPw = ?";
        var inputData = [memberId, memberPw];
        conn.query(sql, inputData, function(error, rows) {
            
            var location = "";
            if(rows[0] == null) {
                location = "memberLogin";
            } else {
                var memberName = rows[0].memberName;
                
                req.session.log = memberId;
                req.session.name = memberName;
                location = "bookMain";
            }
            conn.end();
            res.redirect(location);
        });
    });  

    app.get("/memberLogout", function(req, res){ 

        req.session.log = null;
        req.session.name = null;
    
        res.redirect("bookMain"); 
    });  

    app.get("/memberDelete", function(req, res){ 
        var log = req.session.log;

        var conn = mysql.createConnection(conn_info);

        var sqls = "";
        var sql1 = "DELETE FROM orderBook WHERE orderMemberId = ?;";
        var inputData = [log];
        sqls += mysql.format(sql1, inputData);

        var sql2 = "DELETE FROM cart WHERE cartMemberId = ?;";
        inputData = [log];
        sqls += mysql.format(sql2, inputData);

        var sql3 = "DELETE FROM member WHERE memberId = ?;";
        inputData = [log];
        sqls += mysql.format(sql3, inputData);

        console.log(sqls);

        conn.query(sqls, function(error) {
            req.session.log = null;

            conn.end();
            res.redirect("bookMain"); 
        });
       
    }); 

}