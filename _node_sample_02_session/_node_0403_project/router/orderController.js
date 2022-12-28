module.exports = function(app){

     // 주문서 확인
     app.get("/orderBook", function(req, res){ 
        
        var log = req.session.log;
        var name = req.session.name;
        var cartDB = req.session.cartDB;
        var orderDB = req.session.orderDB;

       

        for(var i=0; i<cartDB.length; i++) {
            if(cartDB[i]["cartMemberId"] == log) {
                var order = {};
                order["orderNo"] = cartDB[i]["cartNo"];
                order["orderMemberId"] = cartDB[i]["cartMemberId"];
                order["orderBookName"] = cartDB[i]["cartBookName"];
                order["orderBuyCount"] = cartDB[i]["cartBuyCount"];
                order["orderBookImage"] = cartDB[i]["cartBookImage"];
                order["orderBuyBookPrice"] = cartDB[i]["cartBuyBookPrice"];

                orderDB.push(order);
            }
        }

        var count = 0;
        for(var i=0; i<orderDB.length; i++) { 
            if(orderDB[i]["orderMemberId"] == log) {
                count += 1;
            }
        }

        var index = 0;
        var i = 0;
        while(i < cartDB.length) {
            if(cartDB[i]["cartMemberId"] == log) {
                cartDB.splice(i, 1);
                index += 1;
            } else {
                i += 1;
            }
        }

        var renderData = {	
            "log" : log,
            "name" : name,
            "orderDB" : orderDB,
            "count" : count
        };

        res.render("order/orderList.ejs", renderData); 
        
    });

 
    // 주문 내역
    app.get("/orderList", function(req, res){ 
        
        var log = req.session.log;
        var name = req.session.name;
        var orderDB = req.session.orderDB;

        var count = 0;
        for(var i=0; i<orderDB.length; i++) { 
            if(orderDB[i]["orderMemberId"] == log) {
                count += 1;
            }
        }
    
        var renderData = {	
            "log" : log,
            "name" : name,
            "orderDB" : orderDB,
            "count" : count
        };

        res.render("order/orderList.ejs", renderData); 
    });    

};
