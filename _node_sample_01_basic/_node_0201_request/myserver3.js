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
    res.render("_0300_main_url.ejs"); // res.render() 는 ejs 파일을 출력한다. 
});

//---------------------------------------------------
// aTag
app.get("/aTagTest", function(req, res){ 
    
    res.render("_0301_aTagTest.ejs"); 
});

app.get("/aTagTest1Pro", function(req, res){ 
    //console.log(req.query.x)
    var renderData = {
        "x" : req.query.x,
    };
    res.render("_0301_aTagTest1Pro.ejs" , renderData); 
});

app.get("/aTagTest2Pro", function(req, res){ 
    //console.log(req.query.x)
    //console.log(req.query.y)
    //console.log(req.query.z)
    var renderData = {
        "x" : req.query.x,
        "y" : req.query.y,
        "z" : req.query.z
    };
    res.render("_0301_aTagTest2Pro.ejs" , renderData); 
});

app.get("/quizSelect", function(req, res){ 
    
    res.render("_0302_quizSelect.ejs"); 
});

app.get("/quizSelectPro", function(req, res){ 
     //console.log(req.query.ran)
    //console.log(req.query.select)
    var renderData = {
        "ran" : req.query.ran,
        "select" : req.query.select,
    };
    res.render("_0302_quizSelectPro.ejs" , renderData); 
});

app.get("/quizOperator", function(req, res){ 
    
    res.render("_0303_quizOperator.ejs"); 
});

app.get("/quizOperatorPro", function(req, res){ 
    //console.log(req.query.num1)
    //console.log(req.query.num2)
    //console.log(req.query.result)
    //console.log(req.query.op)
    //console.log(req.query.select)
    var renderData = {
        "num1" : req.query.num1,
        "num2" : req.query.num2,
        "result" : req.query.result,
        "op" : req.query.op,
        "select" : req.query.select,
    };
    res.render("_0303_quizOperatorPro.ejs" , renderData); 
});
