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

//---------------------------------------------------

// radioTest
app.get("/radio", function(req, res){ 
    res.render("radio.ejs"); 
});

app.get("/radioPro", function(req, res){ 
    var renderData = {
        "grade" : req.query.grade,   
    };
    res.render("radioPro.ejs" , renderData); 
});

// selectTest
app.get("/select", function(req, res){  
    res.render("select.ejs"); 
});

app.get("/selectPro", function(req, res){   
    var renderData = {
        "subject" : req.query.subject,
        
    };
    res.render("selectPro.ejs" , renderData); 
});

// checkboxTest
app.get("/checkbox", function(req, res){ 
    res.render("checkbox.ejs"); 
});

app.get("/checkboxPro", function(req, res){ 
    var renderData = {
        "hobbies" : req.query.hobbies, 
    };
    res.render("checkboxPro.ejs" , renderData); 
});


// textareaTest
app.get("/textarea", function(req, res){ 
    res.render("textarea.ejs"); 
});

app.get("/textareaPro", function(req, res){ 
    var renderData = {
        "memo" : req.query.memo,    
    };
    res.render("textareaPro.ejs" , renderData); 
});

// totalFormTest
app.get("/total", function(req, res){ 
    res.render("total.ejs"); 
});

app.get("/totalPro", function(req, res){ 
    var renderData = {
        "num" : req.query.num,    
        "name" : req.query.name,   
        "grade" : req.query.grade,   
        "subject" : req.query.subject,   
        "hobbie" : req.query.hobbie,   
        "memo" : req.query.memo,   
    };
    res.render("totalPro.ejs" , renderData); 
});
