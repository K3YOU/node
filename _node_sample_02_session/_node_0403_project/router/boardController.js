function    sortBoard(boardDB) {

    
    for(var i=0; i<boardDB.length; i++) {
        var maxNo = boardDB[i]["boardNo"];
        var maxIndex = i;
        for(var j=i; j<boardDB.length; j++) {
            if(maxNo < boardDB[j]["boardNo"]) {
                maxNo = boardDB[j]["boardNo"];
                maxIndex = j;
            }
        }
        var temp = boardDB[i];
        boardDB[i] = boardDB[maxIndex];
        boardDB[maxIndex] = temp;
    }
}

function getMaxBoardNo(boardDB) {
    var maxNo = 0;
    for(var i=0; i<boardDB.length; i++) {
        if(maxNo < boardDB[i]["boardNo"]) {
            maxNo = boardDB[i]["boardNo"];
        }
    }
    return maxNo;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = function(app){
    // 게시판 페이지
    app.get("/boardList", function(req, res){ 
        var log = req.session.log;

        //로그인이 안돼었으면
        if(log == null) {
            //맴버로그인으로
            res.redirect("memberLogin");
        } else {

            var name = req.session.name;
            var boardDB = req.session.boardDB;
            sortBoard(boardDB);
    
            console.log(boardDB);
    
            var curPageNum = req.query.curPageNum;      // 현재 페이지 번호
            if(curPageNum == null) {
                curPageNum = 1;
            }
            var boardListCount = boardDB.length;        // 전체 게시글 수
            var onePageBoardCount = 5;                  // 한 페이지에 보여줄 게시글 수
            var boardPageCount = parseInt(boardListCount / onePageBoardCount);    // 전체 페이지 수
            if(boardListCount % onePageBoardCount > 0) {
                boardPageCount += 1;   
            }
            var curPageBeginBoardNum = (curPageNum - 1) * onePageBoardCount;    // 현재 페이지의 게시글 시작번호
            var curPageEndBoardNum = curPageBeginBoardNum + onePageBoardCount;  // 현제 페이지의 게시글 마침번호
            if(curPageEndBoardNum > boardListCount) {
                curPageEndBoardNum = boardListCount;
            }
    
            var onepagepaingNumber = 2;         // 한 페이지에 보여줄 페이징 번호
            var curPageBeginPagingNumber = 1;    // 현재 페이지의 페이징 시작번호


            if(curPageNum % onepagepaingNumber > 0) {
                curPageBeginPagingNumber = parseInt(curPageNum / onepagepaingNumber) * onepagepaingNumber + 1;
            } else {
                curPageBeginPagingNumber = (parseInt(curPageNum / onepagepaingNumber) - 1) * onepagepaingNumber + 1;
            }
    
            var curPageEndPagingNumber = curPageBeginPagingNumber + onepagepaingNumber - 1;        // 현재 페이지의 페이징 마침번호
            if(curPageEndPagingNumber > boardPageCount) {
                curPageEndPagingNumber = boardPageCount;
            }
    
            console.log("시작 번호 = " + curPageBeginPagingNumber);
            console.log("마침 번호 = " + curPageEndPagingNumber);

            var count = 0;
            if(boardDB != null) {
                count = boardDB.length;
            }
    
            var renderData = {	
                "log" : log,
                "name" : name,
                "count" : count,
                "boardDB" : boardDB,
                "curPageNum" : curPageNum,
                "curPageBeginBoardNum" : curPageBeginBoardNum,
                "curPageEndBoardNum" : curPageEndBoardNum,
                "boardPageCount" : boardPageCount,
                "onepagepaingNumber" : onepagepaingNumber,
                "curPageBeginPagingNumber" : curPageBeginPagingNumber,
                "curPageEndPagingNumber" : curPageEndPagingNumber
            };
            res.render("board/boardList.ejs", renderData); 
        }

    });

    app.get("/boardInfo", function(req, res){
        var log = req.session.log;
        var name = req.session.name;
        var boardDB = req.session.boardDB;

        var boardNo = req.query.boardNo;
        var index = 0;
        for(var i=0; i<boardDB.length; i++) {
            if(boardDB[i]["boardNo"] == boardNo) {
                index = i;
                break;
            }
        }

        boardDB[index]["boardReadCount"] += 1;
        var board = boardDB[index];

        var check = false;
        if(boardDB[index]["boardMemberId"] == log) {
            check = true;
        }

        var renderData = {	
            "log" : log,
            "name" : name,
            "board" : board,
            "check" : check
        };
        res.render("board/boardInfo.ejs", renderData); 
     });


     app.get("/boardModify", function(req, res){
        var log = req.session.log;
        var name = req.session.name;
        var boardDB = req.session.boardDB;

        var boardNo = req.query.boardNo;
        var index = 0;
        for(var i=0; i<boardDB.length; i++) {
            if(boardDB[i]["boardNo"] == boardNo) {
                index = i;
                break;
            }
        }

        var board = boardDB[index];

        var renderData = {	
            "log" : log,
            "name" : name,
            "board" : board
        };
        res.render("board/boardModify.ejs", renderData); 

     });


     
    app.get("/boardModifyPro", function(req, res){

        var boardDB = req.session.boardDB;

        var boardNo = req.query.boardNo;
        var index = 0;
        for(var i=0; i<boardDB.length; i++) {
            if(boardDB[i]["boardNo"] == boardNo) {
                index = i;
                break;
            }
        }

        var boardSubject = req.query.boardSubject;
        var boardContent = req.query.boardContent;

        boardDB[index]["boardSubject"] = boardSubject;
        boardDB[index]["boardContent"] = boardContent;

        res.redirect("boardList");

    });

    app.get("/boardDelete", function(req, res){

        var boardDB = req.session.boardDB;

        var boardNo = req.query.boardNo;
        for(var i=0; i<boardDB.length; i++) {
            if(boardDB[i]["boardNo"] == boardNo) {
                boardDB.splice(i, 1)
                break;
            }
        }
        res.redirect("boardList");
    });

    app.get("/boardWrite", function(req, res){
        var log = req.session.log;
        var name = req.session.name;
        var boardDB = req.session.boardDB;

        var maxBoardNo = getMaxBoardNo(boardDB);
        maxBoardNo += 1;

        var renderData = {	
            "log" : log,
            "name" : name,
            "boardNo" : maxBoardNo
        };
        res.render("board/boardWrite.ejs", renderData); 
    });    

    app.get("/boardWritePro", function(req, res){
        var log = req.session.log;
        var boardDB = req.session.boardDB;

        var boardNo = req.query.boardNo;
        var boardWriter = log;
        var boardSubject = req.query.boardSubject;
        var boardContent = req.query.boardContent;

        var board = {"boardNo" :  boardNo, "boardMemberId" : boardWriter, "boardSubject" :  boardSubject, "boardContent" :  boardContent, "boardReadCount" : 0};
        boardDB.push(board);

        res.redirect("boardList");
    });    

};