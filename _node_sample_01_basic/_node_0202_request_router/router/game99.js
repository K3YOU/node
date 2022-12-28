//router 폴더 세팅
module.exports = function(app){

    app.get("/game99Main", function(req, res){  
        
        res.render("game99/game99Main.ejs" );
    });

    app.get("/game99Play", function(req, res){  
        var renderData = {
            "scoreCount" : req.query.scoreCount,
            "gameCount" : req.query.gameCount
        };

        res.render("game99/game99Play.ejs" , renderData);
    });

    app.get("/game99PlayPro", function(req, res){  
        var renderData = {
            "x" :  req.query.x,
            "y" :  req.query.y,
            "z" :  req.query.z,
            "gameCount" :  req.query.gameCount,
            "scoreCount" :  req.query.scoreCount
        };

        res.render("game99/game99PlayPro.ejs" , renderData);
    });
};
