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
    res.render("_0400_main_total.ejs"); // res.render() 는 ejs 파일을 출력한다. 
});

//---------------------------------------------------

// radioTest
app.get("/radioTest", function(req, res){ 
    res.render("_0401_radioTest.ejs"); 
});

app.get("/radioTestPro", function(req, res){ 
    var renderData = {
        "grade" : req.query.grade,   
    };
    res.render("_0401_radioTestPro.ejs" , renderData); 
});

// selectTest
app.get("/selectTest", function(req, res){  
    res.render("_0402_selectTest.ejs"); 
});

app.get("/selectTestPro", function(req, res){   
    var renderData = {
        "subject" : req.query.subject,
        
    };
    res.render("_0402_selectTestPro.ejs" , renderData); 
});

// checkboxTest
app.get("/checkboxTest", function(req, res){ 
    res.render("_0403_checkboxTest.ejs"); 
});

app.get("/checkboxTestPro", function(req, res){ 
    var renderData = {
        "hobbies" : req.query.hobbies, 
    };
    res.render("_0403_checkboxTestPro.ejs" , renderData); 
});


// textareaTest
app.get("/textareaTest", function(req, res){ 
    res.render("_0404_textareaTest.ejs"); 
});

app.get("/textareaTestPro", function(req, res){ 
    var renderData = {
        "memo" : req.query.memo,    
    };
    res.render("_0404_textareaTestPro.ejs" , renderData); 
});

// totalFormTest
app.get("/totalFormTest", function(req, res){ 
    res.render("_0405_totalFormTest.ejs"); 
});

app.get("/totalFormTestPro", function(req, res){ 
    var renderData = {
        "num" : req.query.num,    
        "name" : req.query.name,   
        "grade" : req.query.grade,   
        "subject" : req.query.subject,   
        "hobbies" : req.query.hobbies,   
        "memo" : req.query.memo,   
    };
    res.render("_0405_totalFormTestPro.ejs" , renderData); 
});
