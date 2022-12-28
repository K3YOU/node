

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

    app.get("/memberTestCheckListAll", function(req, res){

        var conn = mysql.createConnection(conn_info); 
        var sql = " SELECT * FROM member ";   
        conn.query(sql, function(error, rows) { 
            var renderData = {
                "memberDB" : rows
            };
            conn.end(); 
            res.render("memberTest/memberTestCheckListAll.ejs", renderData); 
        }); 

    });

    app.get("/memberTestRandomAddForm", function(req, res){
        res.render("memberTest/memberTestRandomAddForm.ejs"); 
       
    });

    app.get("/memberTestRandomAddPro", function(req, res){

        var randomCount = req.query.randomCount;
        var conn = mysql.createConnection(conn_info);
        var sql1 = "SELECT MAX(memberNo) FROM member";
        conn.query(sql1, function(error, rows) {
            var json = JSON.stringify(rows); 
            var data = JSON.parse(json);
            var memberNo = data[0]["MAX(memberNo)"] + 1;        
            var inputData = [];
            /*
                [다중쿼리]
                    여러데이터를 한번에 저장할경우는 쿼리문을 전부
                    이어서 하나로 만들면된다. 
                    mysql.format(쿼리 , 배열) 함수를 이용해서 하나로 합쳐준다. 
                [다중쿼리 주의점]
                    반드시 쿼리 마지막에 ; 을 붙여줘야한다. 
                    다중쿼리가 아닐때는 붙이면 안된다. 
            */
            var sqls = "";
            var sql2 = "INSERT INTO member VALUES(?, ?, ?, ?, ?);";
            for(var i =0; i < randomCount; i++){
                // [랜덤데이터 생성] ---------------------------------------------
                var nextMemberNo = memberNo + i;
                var memberId = "sampleId" + nextMemberNo;
                var memberPw = "samplePw" + nextMemberNo;
                var memberName = "이만수" + nextMemberNo;
                var memberEmail = "sampleEmail" + nextMemberNo + "@naver.com";
                //----------------------------------------------------------------
                inputData = [nextMemberNo , memberId , memberPw , memberName, memberEmail]

                sqls += mysql.format(sql2 , inputData);            
            }
            
            conn.query(sqls , function(error){
                //console.log(error);
                conn.end(); 
                res.redirect("memberTestCheckListAll");
            });
        });
    });

    app.get("/memberTestDeleteAllPro", function(req, res){
        var conn = mysql.createConnection(conn_info);
        var sql1 = " DELETE FROM member ";
        conn.query(sql1, function(error, rows) {
            conn.end(); 
            res.redirect("memberTestCheckListAll");       
        });
    });

    app.get("/memberTestCheckDeletePro", function(req, res){

        var checkDelete = req.query.checkDelete;
        console.log(checkDelete);
        if(checkDelete == undefined){
            res.redirect("memberTestCheckListAll");       
        }else{
            /*
                [다중쿼리]
                    다중쿼리는 반드시 ; 를 구분자로 연결해줘야한다.
            */
            var conn = mysql.createConnection(conn_info);
            var sql1 = " DELETE FROM member WHERE memberNo = ?;";
            var sqls = "";
            for(var i =0; i < checkDelete.length; i++){     
                inputData = [checkDelete[i]]
                sqls += mysql.format(sql1 , inputData);            
            }
            console.log(sqls);
            conn.query(sqls, function(error) {
                conn.end(); 
                res.redirect("memberTestCheckListAll");       
            });
        }    
    });
};