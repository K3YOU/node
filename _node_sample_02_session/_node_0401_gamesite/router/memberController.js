//router
module.exports = function(app){
   
    app.get("/memberListAll", function(req, res){ 

        var memberDB = req.session.memberDB;
        var renderData = {
            "memberDB" : memberDB
        };

        res.render("member/memberListAll.ejs", renderData); 
    });

    app.get("/memberListSort", function(req, res){ 

        var sortStandard = req.query.sortStandard;

        var memberDB = req.session.memberDB;
        if(sortStandard == "sortNo") {
            for(var i=0; i<memberDB.length; i++) {
                var minNo = memberDB[i]["memberNo"];
                var minIndex = i;
              
                for(var j=i; j<memberDB.length; j++) {
                    if(minNo > memberDB[j]["memberNo"]) {
                        minNo = memberDB[j]["memberNo"];
                        minIndex = j;
                    }
                }

                var temp = memberDB[i];
                memberDB[i] = memberDB[minIndex];
                memberDB[minIndex] = temp;
            }
        } else if(sortStandard == "sortName") {
            for(var i=0; i<memberDB.length; i++) {
                var minName = memberDB[i]["memberName"];
                var minIndex = i;
              
                for(var j=i; j<memberDB.length; j++) {
                    if(minName > memberDB[j]["memberName"]) {
                        minName = memberDB[j]["memberName"];
                        minIndex = j;
                    }
                }

                var temp = memberDB[i];
                memberDB[i] = memberDB[minIndex];
                memberDB[minIndex] = temp;
            }
        } else if(sortStandard == "sortGrade") {
            for(var i=0; i<memberDB.length; i++) {
                var minGrade = memberDB[i]["memberGrade"];
                var minIndex = i;
              
                for(var j=i; j<memberDB.length; j++) {
                    if(minGrade > memberDB[j]["memberGrade"]) {
                        minGrade = memberDB[j]["memberGrade"];
                        minIndex = j;
                    }
                }

                var temp = memberDB[i];
                memberDB[i] = memberDB[minIndex];
                memberDB[minIndex] = temp;
            }
        }

        var memberDB = req.session.memberDB;
       
        res.redirect("memberListAll"); 
    });

    app.get("/memberAddForm", function(req, res){ 
        res.render("member/memberAddForm.ejs"); 
    });

    app.get("/memberAddFormPro", function(req, res){ 
        var num = req.query.num;
        var name = req.query.name;
        var grade = req.query.grade;
        var subject = req.query.subject;
        var hobby = req.query.hobby; // 는 배열이라 따로 반복문으로 처리
        var memo = req.query.memo;

        var hobStr = "";
        for (var i = 0; i < hobby.length; i++){
            hobStr += hobby[i];
            hobStr += ","
        }
        if (hobStr != ""){
            hobStr = hobStr.substring(0, hobStr.length-1); // 마지막 , 삭제
        } 

        var memberDB = req.session.memberDB;

        var data = {
        "memberNo" : num , 
        "memberName" : name , 
        "memberGrade" : grade, 
        "memberSubject" : subject,   
        "memberHobby" : hobStr, 		
        "memberMemo" : memo};

        memberDB.push(data);

        req.session.memberDB = memberDB;

        res.redirect("memberListAll"); 
    });

    app.get("/memberPage", function(req, res){ 
        var index = req.query.index
        var member= req.session.memberDB[index];
        var renderData = {
            "member" : member
        };

        res.render("member/memberPage.ejs", renderData); 
    });

    app.get("/memberDeletePro", function(req, res){ 
        var index = req.query.index
        req.session.memberDB.splice(index , 1);
        
        res.redirect("memberListAll"); 
    });

    app.get("/memberUpdateForm", function(req, res){ 
        var index = req.query.index
        var member= req.session.memberDB[index];
        var renderData = {
            "member" : member
        };

        res.render("member/memberUpdateForm.ejs", renderData); 
    });

    app.get("/memberUpdateFormPro", function(req, res){ 
        
        var num = req.query.num;
        var name = req.query.name;
        var grade = req.query.grade;
        var subject = req.query.subject;
        var hobby = req.query.hobby; // 는 배열이라 따로 반복문으로 처리
        var memo = req.query.memo;

        var hobStr = "";
        for (var i = 0; i < hobby.length; i++){
            hobStr += hobby[i];
            hobStr += ","
        }
        if (hobStr != ""){
            hobStr = hobStr.substring(0, hobStr.length-1); // 마지막 , 삭제
        } 

        var data = {
        "memberNo" : num , 
        "memberName" : name , 
        "memberGrade" : grade, 
        "memberSubject" : subject,   
        "memberHobby" : hobStr, 		
        "memberMemo" : memo};
        
        var memberDB = req.session.memberDB;

        for(var i = 0; i < memberDB.length; i++){
            if (memberDB[i]["memberNo"] == num){
                memberDB[i] = data;
                break
            }
        }
        res.redirect("memberListAll"); 
    });


};
