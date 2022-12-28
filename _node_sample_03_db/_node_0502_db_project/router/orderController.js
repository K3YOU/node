
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

    app.get("/orderBook", function(req, res){ 
        var log = req.session.log;

        var conn = mysql.createConnection(conn_info);

        var sql1 = "SELECT * FROM cart WHERE cartMemberId = ?";
        var inputData = [log];
        conn.query(sql1, inputData, function(error, rows) {

            var orderList = rows;
            
            var sql2 = "SELECT MAX(orderNo) FROM orderBook";
            conn.query(sql2, function(error, rows) {
                var json = JSON.stringify(rows);
                var data = JSON.parse(json);
                var orderNo = data[0]["MAX(orderNo)"] + 1;

                // 다중 쿼리문
                var sqls = "";
                var sql3 = "INSERT INTO orderBook VALUES(?, ?, ?, ?, ?, ?);";
                for(var i=0; i<orderList.length; i++) {
                    inputData = [orderNo, orderList[i]["cartMemberId"], orderList[i]["cartBookName"], orderList[i]["cartBuyCount"], orderList[i]["cartBookImage"], orderList[i]["cartBuyBookPrice"]];
                    sqls += mysql.format(sql3, inputData);
                }

                var sql4 = "DELETE FROM cart WHERE cartMemberId = ?;";
                inputData = [log];
                sqls += mysql.format(sql4, inputData);
                
                console.log(sqls);

                conn.query(sqls, function(error) {
                    conn.end();
                    res.redirect("orderList");
                });
            });
        }); 

         
    });

    app.get("/orderList", function(req, res){ 
        var log = req.session.log;
        var name = req.session.name;

        var conn = mysql.createConnection(conn_info);
        var sql = "SELECT * FROM orderBook WHERE orderMemberId = ?";
        var inputData = [log];
        conn.query(sql, inputData, function(error, rows) {

            var count = 0;
            if(rows != null) {
                count = rows.length;
            }

            var renderData = {	
                "log" : log,
                "name" : name,
                "orderList" : rows,
                "count" : count
            };
    
            conn.end();
            res.render("order/orderList.ejs", renderData); 
        });
    
    });   



}