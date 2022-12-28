
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

    app.get("/bookMain", function(req, res){
        var log = req.session.log;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM book ORDER BY bookSold DESC LIMIT 0, 6";
        conn.query(sql, function(error, rows) {
            var renderData = {
                "log" : log,
                "name" : name,
                "bookList" : rows
            };
            conn.end();
            res.render("book/bookMain.ejs", renderData);
        });

    });

    app.get("/bookInfo", function(req, res){
        var log = req.session.log;
        var name = req.session.name;
        var bookNo = req.query.bookNo;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM book WHERE bookNo = ?";
        var inputData = [bookNo];
        conn.query(sql, inputData, function(error, rows) {
            var renderData = {
                "log" : log,
                "name" : name,
                "book" : rows[0]
            };
            conn.end();
            res.render("book/bookInfo.ejs", renderData);
        });

    });

    app.get("/bookAllList", function(req, res){ 
        var log = req.session.log;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM book ORDER BY bookNo ASC";
        conn.query(sql, function(error, rows) {
            var renderData = {
                "log" : log,
                "name" : name,
                "bookList" : rows
            };
            conn.end();
            res.render("book/bookAllList.ejs", renderData); 
        });
    });   

    app.get("/bookBestList", function(req, res){ 
        var log = req.session.log;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM book ORDER BY bookSold DESC LIMIT 0, 20";
        conn.query(sql, function(error, rows) {
            var renderData = {
                "log" : log,
                "name" : name,
                "bookList" : rows
            };
            conn.end();
            res.render("book/bookBestList.ejs", renderData); 
        });
    });   

    app.get("/bookOSList", function(req, res){ 
        var log = req.session.log;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM book WHERE bookCategory = 'DB/OS' ORDER BY bookNo ASC";
        conn.query(sql, function(error, rows) {
            var renderData = {
                "log" : log,
                "name" : name,
                "bookList" : rows
            };
            conn.end();
            res.render("book/bookOSList.ejs", renderData);
        });
    });     

    app.get("/bookProgramList", function(req, res){ 
        var log = req.session.log;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM book WHERE bookCategory = '프로그래밍' ORDER BY bookNo ASC";
        conn.query(sql, function(error, rows) {
            var renderData = {
                "log" : log,
                "name" : name,
                "bookList" : rows
            };
            conn.end();
            res.render("book/bookOSList.ejs", renderData);
        });
    });

    app.get("/bookComputerList", function(req, res){ 
        var log = req.session.log;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM book WHERE bookCategory = '컴퓨터공학' ORDER BY bookNo ASC";
        conn.query(sql, function(error, rows) {
            var renderData = {
                "log" : log,
                "name" : name,
                "bookList" : rows
            };
            conn.end();
            res.render("book/bookComputerList.ejs", renderData); 
        });
    });

    app.get("/bookSearch", function(req, res){ 
        var log = req.session.log;
        var search = req.query.search;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM book WHERE bookName LIKE ?";
        var inputData = ["%" + search + "%"];
        console.log(sql);
        conn.query(sql, inputData, function(error, rows) {
            var renderData = {
                "log" : log,
                "name" : name,
                "bookList" : rows,
                "search" : search
            };
            conn.end();
            res.render("book/bookSearchList.ejs", renderData); 
        });
    }); 

}