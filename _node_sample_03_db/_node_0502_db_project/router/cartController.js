
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

    app.get("/addCart", function(req, res){ 
        var log = req.session.log;

        if(log == null) {
            res.redirect("memberLogin");
        } else {

            var conn = mysql.createConnection(conn_info);
            var sql1 = "SELECT MAX(cartNo) FROM cart";
            conn.query(sql1, function(error, rows) {
                var json = JSON.stringify(rows);
                var data = JSON.parse(json);
                var cartNo = data[0]["MAX(cartNo)"] + 1;
                
                var cartMemberId = log;
                var cartBookName = req.query.bookName;
                var cartBuyCount = Number(req.query.buyCount);
                var cartBookImage = req.query.bookImage;
                var cartBuyBookPrice = Number(req.query.buyPrice);
                
                var sql2 = "INSERT INTO cart VALUES(?, ?, ?, ?, ?, ?)";
                var inputData = [cartNo, cartMemberId, cartBookName, cartBuyCount, cartBookImage, cartBuyBookPrice];
                conn.query(sql2, inputData, function(error) {
                    conn.end();
                    res.redirect("cartInfo");
                });

            });
        }
    });

    app.get("/cartInfo", function(req, res){
        var log = req.session.log;
        var name = req.session.name;

        if(log == null) {
            res.redirect("memberLogin");
        } else {
            var conn = mysql.createConnection(conn_info);
            var sql1 = "SELECT SUM(cartBuyCount * cartBuyBookPrice) FROM cart WHERE cartMemberId = ?";
            var inputData = [log];
            conn.query(sql1, inputData, function(error, rows) {
                var json = JSON.stringify(rows);
                var data = JSON.parse(json);
                var total = data[0]["SUM(cartBuyCount * cartBuyBookPrice)"];

                sql2 = "SELECT * FROM cart WHERE cartMemberId = ? ORDER BY cartNo ASC";
                inputData = [log];
                conn.query(sql2, inputData, function(error, rows) {
                    var renderData = {	
                        "log" : log,
                        "name" : name,
                        "total" : total,
                        "cartList" : rows
                    };
    
                    conn.end();
                    res.render("cart/cartInfo.ejs", renderData); 
                });
            });
            
        }
    });


    app.get("/deleteCart", function(req, res){
        var cartNo = req.query.cartNo;

        var conn = mysql.createConnection(conn_info);
        var sql = "DELETE FROM cart WHERE cartNo = ?";
        var inputData = [cartNo];
        conn.query(sql, inputData, function(error) {
            conn.end();
            res.redirect("cartInfo");
        });
    });


}