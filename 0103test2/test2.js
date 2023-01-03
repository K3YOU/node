// 서버 세팅 
var express = require("express");
var app = express();
var port = 3201;
var server = app.listen(port, function(){
	console.log("서버가 가동되었습니다" + port);
});

// ejs 세팅(views)
var ejs = require("ejs");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);


// 라우터 세팅
app.get("/", function(req, res){ 
    res.redirect("main"); // res.redirect() 는 라우터이동.
});

// res.render 하나당 ejs파일을 하나씩 추가한다. 
app.get("/main", function(req, res){ 
    res.render("main.ejs"); // res.render() 는 ejs 파일을 출력한다. 
});

//------------------------------------------------

// fraud
app.get("/fraud", function(req, res){ 
    
    res.render("fraud.ejs"); 
});

app.get("/fraudPro", function(req, res){ 
    //console.log(req.query.num1)
    //console.log(req.query.num2)
    var renderData = {
        select :req.query.select,
        ran :req.query.ran
    };
    res.render("fraudPro.ejs" , renderData); 
});

// tags
app.get("/tags", function(req, res){ 
    
    res.render("tags.ejs"); 
});

app.get("/tagsPro", function(req, res){ 
    //console.log(req.query.ran)
    //console.log(req.query.result)
    var renderData = {
        x :req.query.x,
        y :req.query.y,
        z :req.query.z

    };
    res.render("tagsPro.ejs" , renderData); 
});

// operate
app.get("/operate", function(req, res){ 
    
    res.render("operate.ejs"); 
});

app.get("/operatePro", function(req, res){ 
    //console.log(req.query.ran)
    //console.log(req.query.result)
    var renderData = {
    select :req.query.select,
    ran1 :req.query.ran1,
    ran2 :req.query.ran2,
    ran3 :req.query.ran3,
    op :req.query.op,
    result :req.query.result



    };
    res.render("operatePro.ejs" , renderData); 
});
