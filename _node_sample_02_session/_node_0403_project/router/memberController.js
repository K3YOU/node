// 가장 큰 회원번호 가져오기
function getMaxMemberNo(memberDB) {
    var maxNo = 0;
    for(var i=0; i<memberDB.length; i++) {
        if(maxNo < memberDB[i]["memberNo"]) {
            maxNo = memberDB[i]["memberNo"];
        }
    }
    return maxNo;
}

// 로그인한 회원의 이름정보 가져오기
function getName(memberDB, log) {
    var name = "";
    for(var i=0; i<memberDB.length; i++) {
        if(memberDB[i]["memberId"] == log) {
            name = memberDB[i]["memberName"];
            break;
        }
    }
    return name;
}

// 로그인 처리
function loginCheck(memberDB, memberId, memberPw) {
    var check = false;
    for(var i=0; i<memberDB.length; i++) {
        if(memberDB[i]["memberId"] == memberId && memberDB[i]["memberPw"] == memberPw) {
            check = true;
            break;
        }
    }
    return check;
}

// 회원 탈퇴 처리
function deleteMember(memberDB, log) {
    for(var i=0; i<memberDB.length; i++) {
        if(memberDB[i]["memberId"] == log) {
            memberDB.splice(i, 1);
            break;
        }
    }
}

module.exports = function(app){

     // 회원가입 페이지
     app.get("/memberJoin", function(req, res){ 
        
        var log = req.session.log;
        var name = req.session.name;
    
        var renderData = {	
            "log" : log,
            "name" : name
        };

        res.render("member/memberJoin.ejs", renderData); 
    });

    app.get("/memberJoinPro", function(req, res){ 
        var memberDB = req.session.memberDB;

        var memberNo = getMaxMemberNo(memberDB) + 1;
        var memberId = req.query.memberId;
        var memberPw = req.query.memberPw;
        var memberName = req.query.memberName;
        var memberEmail = req.query.memberEmail;

        var member = {"memberNo" : memberNo, "memberId" : memberId, "memberPw" : memberPw, "memberName" : memberName, "memberEmail" : memberEmail};
        memberDB.push(member);

        res.redirect("mainBook"); 
    });

    // 로그인 페이지
    app.get("/memberLogin", function(req, res){ 

        var log = req.session.log;
        var name = req.session.name;
    
        var renderData = {	
            "log" : log,
            "name" : name
        };

        res.render("member/memberLogin.ejs", renderData); 
    });

    app.get("/memberLoginPro", function(req, res){ 

        var memberDB = req.session.memberDB;

        var memberId = req.query.memberId;
        var memberPw = req.query.memberPw;
    
        var check = loginCheck(memberDB, memberId, memberPw);
        if(check) {
            req.session.log = memberId;
            var name = getName(memberDB, memberId);
            req.session.name = name;

            res.redirect("mainBook"); 
        } else {
            res.redirect("memberLogin"); 
        }

    });

    // 로그아웃
    app.get("/memberLogout", function(req, res){ 

        req.session.log = null;
        req.session.name = null;
    
        res.redirect("mainBook"); 
    });    

    // 회원 탈퇴
    app.get("/memberDelete", function(req, res){ 
        var memberDB = req.session.memberDB;
        var cartDB = req.session.cartDB;
        var orderDB = req.session.orderDB;

        var log = req.session.log;
        deleteMember(memberDB, log);

        var index = 0;
        var i = 0;
        while(i < cartDB.length) {
            if(cartDB[i]["cartMemberId"] == log) {
                cartDB.splice(i, 1);
                index += 1;
            } else {
                i += 1;
            }
        }

        index = 0;
        i = 0;
        while(i < orderDB.length) {
            if(orderDB[i]["orderMemberId"] == log) {
                orderDB.splice(i, 1);
                index += 1;
            } else {
                i += 1;
            }
        }

        req.session.log = null;
        req.session.name = null;

        res.redirect("mainBook"); 
    }); 
};