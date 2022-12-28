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
    res.render("_0200_main_hidden.ejs"); // res.render() 는 ejs 파일을 출력한다. 
});

//------------------------------------------------

// hiddenTest
app.get("/hiddenTest", function(req, res){ 
    
    res.render("_0201_hiddenTest.ejs"); 
});

app.get("/hiddenTestPro", function(req, res){ 
    //console.log(req.query.num1)
    //console.log(req.query.num2)
    var renderData = {
        "num1" : req.query.num1,
        "num2" : req.query.num2
    };
    res.render("_0201_hiddenTestPro.ejs" , renderData); 
});

// quizUpDown
app.get("/quizUpDown", function(req, res){ 
    
    res.render("_0202_quizUpDown.ejs"); 
});

app.get("/quizUpDownPro", function(req, res){ 
    //console.log(req.query.ran)
    //console.log(req.query.result)
    var renderData = {
        "ran" : req.query.ran,
        "result" : req.query.result
    };
    res.render("_0202_quizUpDownPro.ejs" , renderData); 
});

// quiz99
app.get("/quiz99", function(req, res){ 
    
    res.render("_0203_quiz99.ejs"); 
});

app.get("/quiz99Pro", function(req, res){ 
    //console.log(req.query.ran)
    //console.log(req.query.result)
    var renderData = {
        "num1" : req.query.num1,
        "num2" : req.query.num2,
        "result" : req.query.result
    };
    res.render("_0203_quiz99Pro.ejs" , renderData); 
});
