//router
module.exports = function(app){
    app.get("/tttGame", function(req, res){  

        var renderData = {
            "tttArr" : req.session.tttArr,  
            "tttTurn" : req.session.tttTurn,
            "tttGameover" : req.session.tttGameover,
            "tttWin" : req.session.tttWin,  
        };
        res.render("ttt/tttGame.ejs"  , renderData );
    });
    
    app.get("/tttGamePro", function(req, res){  
    
        var tttIndex = req.query.tttIndex;
        var tttArr = req.session.tttArr;
        var tttGameover = req.session.tttGameover;
        var tttWin = req.session.tttWin;
        var tttTurn = req.session.tttTurn;
    
        if (tttTurn == 1){
            tttArr[tttIndex] = 1;
            tttTurn = 2;
        }else if (tttTurn == 2){
            tttArr[tttIndex] = 2;
            tttTurn = 1;
        }
    
        // 종료 판정 
        // 가로 판정
        for(var i = 0; i < 9; i+=3){
            if (tttArr[i] == 1  && tttArr[i + 1] == 1 && tttArr[i + 2] == 1){
                tttGameover = true;
                tttWin = 1;
            }
            if (tttArr[i] == 2  && tttArr[i + 1] == 2 && tttArr[i + 2] == 2){
                tttGameover = true;
                tttWin = 2;
            }   
        }
    
        // 세로 판정
        for (var i = 0; i < 3; i++){
            if(tttArr[i] == 1 && tttArr[i + 3] == 1 && tttArr[i + 6] == 1){
                tttGameover = true;
                tttWin = 1;
            }
    
            if(tttArr[i] == 2 && tttArr[i + 3] == 2 && tttArr[i + 6] == 2){
                tttGameover = true;
                tttWin = 2;
            }
        }
    
        // 대각선1
        if (tttArr[0] == 1 && tttArr[4] == 1 && tttArr[8] == 1){
            tttGameover = true;
            tttWin = 1;
        }
        if (tttArr[0] == 2 && tttArr[4] == 2 && tttArr[8] == 2){
            tttGameover = true;
            tttWin = 2;
        }
        // 대각선2
        if (tttArr[2] == 2 && tttArr[4] == 1 && tttArr[6] == 1){
            tttGameover = true;
            tttWin = 1;
        }
        if (tttArr[2] == 2 && tttArr[4] == 2 && tttArr[6] == 2){
            tttGameover = true;
            tttWin = 2;
        }
    
        // 무승부
        var count = 0
        for(var i = 0; i < 9; i++){
            if (tttArr[i] != 0){
                count += 1
            }
        }
        if (count == 9){
            tttGameover = true;
        }
    
        if (tttGameover == true && tttWin == 0){
            tttWin = 3;
        }
    
        console.log(tttArr );
        console.log(tttTurn );
        console.log(tttGameover );
        console.log(tttWin );
    
        req.session.tttArr = tttArr; 
        req.session.tttTurn = tttTurn;        
        req.session.tttGameover = tttGameover; 
        req.session.tttWin = tttWin; 
       
        res.redirect("tttGame");
    });
    

};