//router 폴더 세팅
module.exports = function(app){

    app.get("/gameBR31Main", function(req, res){  
        
        res.render("gameBR31/gameBR31Main.ejs" );
    });

    app.get("/gameBR31Play", function(req, res){  
        var renderData = {
            "turn" : req.query.turn,
            "total" : req.query.total
        };

        res.render("gameBR31/gameBR31Play.ejs" , renderData);
    });

    app.get("/gameBR31PlayPro", function(req, res){  
        var renderData = {
            "turn" : req.query.turn,
            "total" : req.query.total
        };

        res.render("gameBR31/gameBR31PlayPro.ejs" , renderData);
    });
};
