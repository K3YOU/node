// carNo 최대값 구하기
function getMaxCountNo(cartDB) {
    var maxNo = 0;
    for(var i=0; i<cartDB.length; i++) {
        if(maxNo < cartDB[i]["cartNo"]) {
            maxNo = cartDB[i]["cartNo"];
        }
    }
    return maxNo;
}

// 내 장바구니 총 결제 금액 구하기
function getMyCartTotal(cartDB, log) {
    var total = 0;
    for(var i=0; i<cartDB.length; i++) {
        if(cartDB[i]["cartMemberId"] == log) {
            total += cartDB[i]["cartBuyBookPrice"] * cartDB[i]["cartBuyCount"];
        }
    }
    return total;
}

module.exports = function(app){
     // 장바구니 등록 페이지
    app.get("/addCart", function(req, res){ 
        
        var log = req.session.log;

        if(log == null) {
            res.redirect("memberLogin");
        } else {

            var cartDB = req.session.cartDB;

            var cartNo = Number(getMaxCountNo(cartDB)) + 1;
            var cartMemberId = log;
            var cartBookName = req.query.bookName;
            var cartBuyCount = Number(req.query.buyCount);
            var cartBookImage = req.query.bookImage;
            var cartBuyBookPrice = Number(req.query.buyPrice);

            var cart = {"cartNo" : cartNo, "cartMemberId" : cartMemberId, "cartBookName" : cartBookName, "cartBuyCount" : cartBuyCount, "cartBookImage" : cartBookImage, "cartBuyBookPrice" : cartBuyBookPrice};

            cartDB.push(cart);

            res.redirect("cartInfo");
        }
        
    });

    // 장바구니 확인 페이지
    app.get("/cartInfo", function(req, res){
        var log = req.session.log;
        var cartDB = req.session.cartDB;
        var name = req.session.name;


        if(log == null) {
            res.redirect("memberLogin");
        } else {

            var total = getMyCartTotal(cartDB, log);
            var renderData = {	
                "log" : log,
                "name" : name,
                "cartDB" : cartDB,
                "total" : total
            };
            res.render("cart/cartInfo.ejs", renderData); 
        }
    });

    // 장바구니 삭제
    app.get("/deleteCart", function(req, res){
        var cartDB = req.session.cartDB;

        var cartNo = req.query.cartNo;
        var index = 0;
        for(var i=0; i<cartDB.length; i++) {
            if(cartDB[i]["cartNo"] == cartNo) {
                index = i;
                break;
            }
        }
        cartDB.splice(index, 1);

        res.redirect("cartInfo"); 
    });

};