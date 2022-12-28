// 판매량이 높은 순으로 내림차순 정렬하기
function sortBookByBookSold(bookDB) {
  
    for(var i=0; i<bookDB.length; i++) {
        var maxNo = bookDB[i]["bookSold"];
        var maxIndex = i;

        for(var j=i; j<bookDB.length; j++) {
            if(maxNo < bookDB[j]["bookSold"]) {
                maxNo = bookDB[j]["bookSold"];
                maxIndex = j;
            }
        }

        var temp = bookDB[i];
        bookDB[i] = bookDB[maxIndex];
        bookDB[maxIndex] = temp;
    }
}

// 번호 순으로 오름차순 정렬하기
function sortBookByBookNo(bookDB) {
  
    for(var i=0; i<bookDB.length; i++) {
        var minNo = bookDB[i]["bookNo"];
        var minIndex = i;

        for(var j=i; j<bookDB.length; j++) {
            if(minNo > bookDB[j]["bookNo"]) {
                minNo = bookDB[j]["bookNo"];
                minIndex = j;
            }
        }

        var temp = bookDB[i];
        bookDB[i] = bookDB[minIndex];
        bookDB[minIndex] = temp;
    }
}

// 카테고리가 DB/OS인 책정보 가져오기
function getBookListByOSCategory(bookDB) {
    var OSCategoryBookList = [];
    for(var i=0; i<bookDB.length; i++) {
        if(bookDB[i]["bookCategory"] == "DB/OS") {
            OSCategoryBookList.push(bookDB[i]);
        }
    }
    return OSCategoryBookList;
}

// 카테고리가 프로그래밍인 책정보 가져오기
function getBookListByProgramCategory(bookDB) {
    var programCategoryBookList = [];
    for(var i=0; i<bookDB.length; i++) {
        if(bookDB[i]["bookCategory"] == "프로그래밍") {
            programCategoryBookList.push(bookDB[i]);
        }
    }
    return programCategoryBookList;
}

// 카테고리가 컴퓨터공학인 책정보 가져오기
function getBookListByComputerCategory(bookDB) {
    var computerCategoryBookList = [];
    for(var i=0; i<bookDB.length; i++) {
        if(bookDB[i]["bookCategory"] == "컴퓨터공학") {
            computerCategoryBookList.push(bookDB[i]);
        }
    }
    return computerCategoryBookList;
}

// 책번호로 index 가져오기
function getBookIndex(bookDB, bookNo) {
    var index = 0;

    for(var i=0; i<bookDB.length; i++) {
        if(bookDB[i]["bookNo"] == bookNo) {
            index = i;
            break;
        }
    }

    return index;
}

// 책 검색하기
function getSearchBookList(bookDB, bookName) {

    var searchBookList = [];

    var index = -1;
    for(var i=0; i<bookDB.length; i++) {
        if(bookDB[i]["bookName"].indexOf(bookName) >= 0) {
            searchBookList.push(bookDB[i]);
        }
    }
    return searchBookList;
}

module.exports = function(app){

    // main페이지
    app.get("/mainBook", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        sortBookByBookSold(bookDB);

        var renderData = {	
            "log" : log,
            "name" : name,
            "bookDB" : bookDB
        };
        res.render("book/bookMain.ejs", renderData); 
    });

    // 책 상세 페이지
    app.get("/bookInfo", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        var bookNo = req.query.bookNo;
        var index = getBookIndex(bookDB, bookNo);
    
        var renderData = {	
            "log" : log,
            "name" : name,
            "bookDB" : bookDB,
            "index" : index
        };
        res.render("book/bookInfo.ejs", renderData); 
    });
    
    // 전체 도서 페이지
    app.get("/bookAllList", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        sortBookByBookNo(bookDB);

        var renderData = {	
            "log" : log,
            "name" : name,
            "bookDB" : bookDB
        };
        res.render("book/bookAllList.ejs", renderData); 
    });   

    // 베스트 도서 페이지
    app.get("/bookBestList", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        sortBookByBookSold(bookDB);

        var renderData = {	
            "log" : log,
            "name" : name,
            "bookDB" : bookDB
        };
        res.render("book/bookBestList.ejs", renderData); 
    });   

    // DB/OS 카테고리 도서 페이지
    app.get("/bookOSList", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        var bookOSDB = getBookListByOSCategory(bookDB);

        var renderData = {	
            "log" : log,
            "name" : name,
            "bookDB" : bookOSDB
        };
        res.render("book/bookOSList.ejs", renderData); 
    }); 

    // 프로그래밍 카테고리 도서 페이지
    app.get("/bookProgramList", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        var bookProgramDB = getBookListByProgramCategory(bookDB);

        var renderData = {	
            "log" : log,
            "name" : name,
            "bookDB" : bookProgramDB
        };
        res.render("book/bookProgramList.ejs", renderData); 
    }); 
    
    // 컴퓨터공학 카테고리 도서 페이지
    app.get("/bookComputerList", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        var bookComputerDB = getBookListByComputerCategory(bookDB);

        var renderData = {	
            "log" : log,
            "name" : name,
            "bookDB" : bookComputerDB
        };
        res.render("book/bookComputerList.ejs", renderData); 
    }); 

    // 검색 페이지
    app.get("/bookSearch", function(req, res){ 
        var log = req.session.log;
        var bookDB = req.session.bookDB;
        var name = req.session.name;

        var bookName = req.query.bookName;
        var searchBookList = getSearchBookList(bookDB, bookName);

        var renderData = {	
            "log" : log,
            "name" : name,
            "bookName" : bookName,
            "bookDB" : searchBookList
        };

        res.render("book/bookSearchList.ejs", renderData); 
    }); 
};