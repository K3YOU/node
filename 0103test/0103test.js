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

// hiddenTest
app.get("/hidden", function(req, res){ 
    
    res.render("hidden.ejs"); 
});

app.get("/hiddenPro", function(req, res){ 
    //console.log(req.query.num1)
    //console.log(req.query.num2)
    var renderData = {
        "number1" : req.query.number1,
        "number2" : req.query.number2
    };
    res.render("hiddenPro.ejs" , renderData); 
});

// quizUpDown
app.get("/updown", function(req, res){ 
    
    res.render("updown.ejs"); 
});

app.get("/updownPro", function(req, res){ 
    //console.log(req.query.ran)
    //console.log(req.query.result)
    var renderData = {
        "ran" : req.query.ran,
        "result" : req.query.result
    };
    res.render("updownPro.ejs" , renderData); 
});

// quiz99
app.get("/quiz99", function(req, res){ 
    
    res.render("quiz99.ejs"); 
});

app.get("/quiz99Pro", function(req, res){ 
    //console.log(req.query.ran)
    //console.log(req.query.result)
    var renderData = {
        "num1" : req.query.num1,
        "num2" : req.query.num2,
        "result" : req.query.result
    };
    res.render("quiz99Pro.ejs" , renderData); 
});
