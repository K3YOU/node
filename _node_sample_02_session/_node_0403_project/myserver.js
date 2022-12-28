// 서버 세팅 
var express = require("express");
var app = express();
var port = 3402;
var server = app.listen(port, function(){
	console.log("서버가 가동되었습니다" + port);
});

// ejs 세팅(views)
var ejs = require("ejs");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);
//---------------------------------------------------------------------------------------
// img폴더 경로 셋팅
app.use(express.static('./img'));			
//---------------------------------------------------------------------------------------
// session 세팅
var session = require("express-session");
app.use(session({							// session에는 옵션3가지를 설정해야줘야 한다. 
	secret : "abcdefg",						// secret에는 아무 내용이나 작성해주고,
	resave : false,							// 나머지는 false로 설정한다.
	saveUninitialized : false
}));
//---------------------------------------------------------------------------------------
// 라우터 폴더 연결
require("./router/boardController")(app);
require("./router/bookController")(app);
require("./router/memberController")(app);
require("./router/cartController")(app);
require("./router/orderController")(app);
//---------------------------------------------------------------------------------------

function getMemberSample() {
	var memberDB = [
		{"memberNo" : 1 , "memberId" : "hello" , "memberPw" : "1234", "memberName" : "김수혁", "memberEmail" : "hello@naver.com"},
		{"memberNo" : 2 , "memberId" : "qwer"  , "memberPw" : "1234" , "memberName" : "홍길동", "memberEmail" : "kim@daum.net"},
		{"memberNo" : 3 , "memberId" : "asdf"  , "memberPw" : "1234" , "memberName" : "이수정", "memberEmail" : "lee@hotmail.com"},
	];

	return memberDB;
}

function getBookSample() {
	var bookDB = [
		{"bookNo" : 1  , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머신러닝/딥러닝", "bookName" : "혼자 공부하는 머신러닝+딥러닝" 								, "bookPrice" : 26000, "bookStock" : 10 , "bookImage" : "1.jpg" , "bookInfo" : "박해선 저 | 한빛미디어 | 2020년 12월 21일"		, "bookContentImage" : "contentImg01.jpg"  , "bookDiscount" : 10, "bookSold" : 78024},
		{"bookNo" : 2  , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머신러닝/딥러닝", "bookName" : "Must Have 머신러닝·딥러닝 문제해결 전략" 						, "bookPrice" : 38000, "bookStock" : 9  , "bookImage" : "2.jpg" , "bookInfo" : "신백균 저 | 골든래빗 | 2022년 04월 13일"		, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 3288},
		{"bookNo" : 3  , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머신러닝/딥러닝", "bookName" : "파이썬 머신러닝 완벽 가이드" 									, "bookPrice" : 40000, "bookStock" : 3  , "bookImage" : "3.jpg" , "bookInfo" : "권철민 저 | 위키북스 | 2022년 04월 21일"		, "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 1302},
		{"bookNo" : 4  , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머신러닝/딥러닝", "bookName" : "파이썬 머신러닝 판다스 데이터 분석" 							, "bookPrice" : 25000, "bookStock" : 2  , "bookImage" : "4.jpg" , "bookInfo" : "오승환 저 | 정보문화사 | 2019년 06월 15일"		, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 9177},
		{"bookNo" : 5  , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "AI"           ,  "bookName" : "Do it! 첫 인공지능" 										  , "bookPrice" : 13000, "bookStock" : 1  , "bookImage" : "5.jpg" , "bookInfo" : "이애리 저 | 이지스퍼블리싱 | 2022년 04월 01"	  , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 831},
		{"bookNo" : 6  , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "일반/에세이"   , 	"bookName" : "비전공자를 위한 이해할 수 있는 IT 지식" 						, "bookPrice" : 16800, "bookStock" : 0  , "bookImage" : "6.jpg" , "bookInfo" : "최원영 저 | 티더블유아이지 | 2020년 07월 14일"	, "bookContentImage" : "contentImg05.jpg" , "bookDiscount" : 10, "bookSold" : 73413},
		{"bookNo" : 7  , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "일반/에세이"   , 	"bookName" : "비전공자도 이해할 수 있는 AI 지식" 						    , "bookPrice" : 19800, "bookStock" : 7  , "bookImage" : "7.jpg" , "bookInfo" : "박상길 저/정진호 그림 | 반니 | 2022년 03월 04일", "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 23217},
		{"bookNo" : 8  , "bookCategory" : "프로그래밍" , "bookSubCategory" : "HTML/CSS"     ,  "bookName" : "Do it! HTML+CSS+자바스크립트 웹 표준의 정석" 				   , "bookPrice" : 30000, "bookStock" : 6  , "bookImage" : "8.jpg" , "bookInfo" : "고경희 저 | 이지스퍼블리싱 | 2021년 01월 22일"	, "bookContentImage" : "contentImg06.jpg" , "bookDiscount" : 10, "bookSold" : 53232},
		{"bookNo" : 9  , "bookCategory" : "프로그래밍" , "bookSubCategory" : "파이썬"        ,  "bookName" : "혼자 공부하는 파이썬" 									   , "bookPrice" : 18000, "bookStock" : 1  , "bookImage" : "9.jpg" , "bookInfo" : "윤인성 저 | 한빛미디어 | 2019년 06월 10일"		, "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 80499},
		{"bookNo" : 10 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "HTML/CSS"      , "bookName" : "코딩만 따라 해도 웹페이지가 만들어지는 HTML+CSS+자바스크립트" , "bookPrice" : 24000, "bookStock" : 3  , "bookImage" : "10.jpg", "bookInfo" : "반병현 저 | 생능북스 | 2022년 02월 15일"		 , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 3552},

		{"bookNo" : 11 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "Java Script"   , 	"bookName" : "자바스크립트 완벽 가이드" 								   , "bookPrice" : 42000, "bookStock" : 4  , "bookImage" : "11.jpg", "bookInfo" : "데이비드 플래너건 저/한선용 역 | 인사이트(insight) | 2022년 03월 31일"								 , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 4143},
		{"bookNo" : 12 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "C/C++"      	 , 	"bookName" : "리눅스 C프로그래밍 스킬북" 								   , "bookPrice" : 25000, "bookStock" : 2  , "bookImage" : "12.jpg", "bookInfo" : "김원표, 박승주 저 | 홍릉 | 2022년 02월 24일"							 								, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 0, "bookSold" : 90},
		{"bookNo" : 13 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "파이썬"         ,  "bookName" : "모두의 데이터 분석 with 파이썬" 							   , "bookPrice" : 18000, "bookStock" : 5  , "bookImage" : "13.jpg", "bookInfo" : "송석리, 이현아 저 | 길벗 | 2019년 04월 25일"		 													, "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 23670},
		{"bookNo" : 14 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "C/C++"         , 	"bookName" : "놀랄 만큼 재미있는 C언어 기초 WONDER C" 					   , "bookPrice" : 32000, "bookStock" : 8  , "bookImage" : "14.jpg", "bookInfo" : "조성호 저 | 인피니티북스 | 2021년 12월 17일"		 													, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 0, "bookSold" : 2208},
		{"bookNo" : 15 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "C/C++"         , 	"bookName" : "266가지 문제로 정복하는 코딩 인터뷰 in C++" 				   , "bookPrice" : 35000, "bookStock" : 0  , "bookImage" : "15.jpg", "bookInfo" : "아드난 아지즈, 쭝시엔 리, 아미트 프라카시 저/이창현, 김현욱 역 | 인사이트(insight) | 2021년 10월 01일"  , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 1170},
		{"bookNo" : 16 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "C/C++"         , 	"bookName" : "코딩 테스트를 위한 자료 구조와 알고리즘 with C++" 		   , "bookPrice" : 32000, "bookStock" : 7  , "bookImage" : "16.jpg", "bookInfo" : "존 캐리, 셰리안 도시, 파야스 라잔 저/황선규 역 | 길벗 | 2020년 12월 08일"		 					  , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 4632},
		{"bookNo" : 17 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "C#"            , 	"bookName" : "C#을 다루는 기술" 										  , "bookPrice" : 36000, "bookStock" : 1 , "bookImage" : "17.jpg", "bookInfo" : "존 스킷 저/김명신 역 | 길벗 | 2021년 05월 13일"		 												, "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 2874},
		{"bookNo" : 18 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "C#"            , 	"bookName" : "C# 프로그래밍(2판)" 										  , "bookPrice" : 26000, "bookStock" : 0   , "bookImage" : "18.jpg", "bookInfo" : "윤인성 저 | 한빛아카데미 | 2021년 01월 05일"		 													, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 0, "bookSold" : 6498},
		{"bookNo" : 19 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "IOS/안드로이드" ,  "bookName" : "아키텍처를 알아야 앱 개발이 보인다" 							, "bookPrice" : 30000, "bookStock" : 4  , "bookImage" : "19.jpg", "bookInfo" : "옥수환 저 | 비제이퍼블릭(BJ퍼블릭) | 2020년 04월 17일"					 							  , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 1524},
		{"bookNo" : 20 , "bookCategory" : "DB/OS"     , "bookSubCategory" : "Java Script"   ,  "bookName" : "초보자를 위한 JavaScript 200제" 							  , "bookPrice" : 25000, "bookStock" : 3  , "bookImage" : "20.jpg", "bookInfo" : "고재도, 노지연 저 | 정보문화사 | 2019년 03월 10일"		 											, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 864},

		{"bookNo" : 21 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "파이썬"   	 ,  "bookName" : "데이터 과학을 위한 기초수학 with 파이썬" 					   , "bookPrice" : 26000, "bookStock" : 6  , "bookImage" : "21.jpg", "bookInfo" : "이병준 저 | 한빛아카데미 | 2021년 01월 06일"								 							, "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 5, "bookSold" : 3273},
		{"bookNo" : 22 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "파이썬"      	 , 	"bookName" : "컴퓨팅 사고와 소프트웨어 with 파이썬"     				   , "bookPrice" : 25000, "bookStock" : 1  , "bookImage" : "22.jpg", "bookInfo" : "성태응, 홍정희, 이홍래 저 | 인피니티북스 | 2022년 03월 02일"							 				, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 0, "bookSold" : 1872},
		{"bookNo" : 23 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "파이썬"        , 	"bookName" : "파이썬 클린 코드" 						    			  , "bookPrice" : 28000, "bookStock" : 3  , "bookImage" : "23.jpg", "bookInfo" : "마리아노 아나야 저/김창수 역 | 터닝포인트 | 2019년 02월 25일"		 									, "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 3942},
		{"bookNo" : 24 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "Java Script"   , 	"bookName" : "자바스크립트 프로그래밍 입문" 						   	  , "bookPrice" : 27000, "bookStock" : 9  , "bookImage" : "24.jpg", "bookInfo" : "윤인성 저 | 한빛아카데미 | 2022년 01월 03일"		 													, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 0, "bookSold" : 1674},
		{"bookNo" : 25 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "AI"            , 	"bookName" : "쉽게 배우는 AWS AI 서비스" 				  				  , "bookPrice" : 30000, "bookStock" : 2  , "bookImage" : "25.jpg", "bookInfo" : "피터 엘거, 오언 셔너히 저/맹윤호, 임지순 역/곽근봉 감수 | 한빛미디어 | 2022년 04월 15일"  			 , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 714},
		{"bookNo" : 26 , "bookCategory" : "DB/OS"     , "bookSubCategory" : "유닉스/리눅스"  , 	"bookName" : "이것이 우분투 리눅스다(개정판)" 						      , "bookPrice" : 32000, "bookStock" : 9  , "bookImage" : "26.jpg", "bookInfo" : "우재남 저 │ 한빛미디어 │ 2020년 11월 02일"		 					  								, "bookContentImage" : "contentImg08.jpg" , "bookDiscount" : 10, "bookSold" : 11148},
		{"bookNo" : 27 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "파이썬"        , 	"bookName" : "Do it! 점프 투 파이썬" 									  , "bookPrice" : 18000, "bookStock" : 10 , "bookImage" : "27.jpg", "bookInfo" : "박응용 저 | 이지스퍼블리싱 | 2019년 06월 20일"		 											   , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 117618},
		{"bookNo" : 28 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머신러닝/딥러닝",	 "bookName" : "모두의 딥러닝" 										      , "bookPrice" : 24000, "bookStock" : 8   , "bookImage" : "28.jpg", "bookInfo" : "조태호 저 | 길벗 | 2022년 03월 31일"		 														   , "bookContentImage" : "contentImg07.jpg" , "bookDiscount" : 10, "bookSold" : 3084},
		{"bookNo" : 29 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "JSP"			 ,	"bookName" : "자바 웹을 다루는 기술" 									  , "bookPrice" : 45000, "bookStock" : 5  , "bookImage" : "29.jpg", "bookInfo" : "이병승 저 | 길벗 | 2019년 01월 10일"					 											  , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 3162},
		{"bookNo" : 30 , "bookCategory" : "DB/OS"     , "bookSubCategory" : "Java"    		,  "bookName" : "Java의 정석" 												 , "bookPrice" : 30000, "bookStock" : 3  , "bookImage" : "30.jpg", "bookInfo" : "남궁성 저 | 도우출판 | 2016년 02월 01일"		 													 , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 0, "bookSold" : 31371},
		
		{"bookNo" : 31 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머신러닝/딥러닝"  , "bookName" : "선형대수와 통계학으로 배우는 머신러닝 with 파이썬" 		   , "bookPrice" : 37500, "bookStock" : 10  , "bookImage" : "31.jpg", "bookInfo" : "장철원 저 | 비제이퍼블릭(BJ퍼블릭) | 2021년 01월 26일"								 					, "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 8, "bookSold" : 7542},
		{"bookNo" : 32 , "bookCategory" : "DB/OS" 	  , "bookSubCategory" : "IOS/안드로이드"   , "bookName" : "코틀린을 이용한 안드로이드 개발"     				    , "bookPrice" : 30000, "bookStock" : 5  , "bookImage" : "32.jpg", "bookInfo" : "마르친 모스칼라, 이고르 워다 저/최민석 역 | 에이콘출판사 | 2018년 05월 31일"							 	, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 66},
		{"bookNo" : 33 , "bookCategory" : "DB/OS"     , "bookSubCategory" : "IOS/안드로이드"   , "bookName" : "깡쌤의 안드로이드 프로그래밍 with 자바" 					, "bookPrice" : 35000, "bookStock" : 10  , "bookImage" : "33.jpg", "bookInfo" : "강성윤 저 | 쌤즈 | 2022년 04월 01일"		 															, "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 0},
		{"bookNo" : 34 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머신러닝/딥러닝"   , "bookName" : "코딩은 처음이라 with 딥러닝" 						   	 , "bookPrice" : 18000, "bookStock" : 6  , "bookImage" : "34.jpg", "bookInfo" : "이종환 저 | 영진닷컴 | 2022년 04월 25일"		 													     , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 330},
		{"bookNo" : 35 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "JAVA"            , "bookName" : "생활코딩! 자바 프로그래밍 입문" 				  			, "bookPrice" : 27000, "bookStock" : 7  , "bookImage" : "35.jpg", "bookInfo" : "이고잉 저 | 위키북스 | 2022년 02월 09일"  			                                                    , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 0, "bookSold" : 780},
		{"bookNo" : 36 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "일반/에세이"      , "bookName" : "1일 1로그 100일 완성 IT 지식" 						    , "bookPrice" : 20000, "bookStock" : 8  , "bookImage" : "36.jpg", "bookInfo" : "브라이언 W. 커니핸 저/하성창 역 | 인사이트(insight) | 2021년 12월 31일"		 					  		 , "bookContentImage" : "contentImg04.jpg" , "bookDiscount" : 10, "bookSold" : 35775},
		{"bookNo" : 37 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "일반/에세이"      , "bookName" : "IT 지식으로 미래를 읽는다면" 							 , "bookPrice" : 14000, "bookStock" : 7 , "bookImage" : "37.jpg", "bookInfo" : "윤정구 저 | 다른 | 2022년 03월 03일"		 											                , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 0, "bookSold" : 654},
		{"bookNo" : 38 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "일반/에세이"      , "bookName" : "디지털 시대에 살아남는 IT 지식" 						 , "bookPrice" : 16000, "bookStock" : 5   , "bookImage" : "38.jpg", "bookInfo" : "박성묵 저 | 정보문화사 | 2021년 08월 30일"		 													 , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 0, "bookSold" : 1500},
		{"bookNo" : 39 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "파이썬"		    , "bookName" : "만들면서 배우는 파이썬과 40개의 작품들" 				  , "bookPrice" : 18800, "bookStock" : 6  , "bookImage" : "39.jpg", "bookInfo" : "장문철 저 | 앤써북 | 2022년 02월 28일"					 											 , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 14856},
		{"bookNo" : 40 , "bookCategory" : "DB/OS"     , "bookSubCategory" : "IOS/안드로이드"   , "bookName" : "웹 표준을 이용한 iOS 앱 개발 트레이닝" 					 , "bookPrice" : 16000, "bookStock" : 0  , "bookImage" : "40.jpg", "bookInfo" : "크리스토퍼 레이온 저 / 김지선 역 | 정보문화사 | 2012년 07월 13일"		 								   , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 0},
		
		{"bookNo" : 41 , "bookCategory" : "DB/OS"     , "bookSubCategory" : "IOS/안드로이드"   , "bookName" : "Do it! 스위프트로 아이폰 앱 만들기 입문" 		   		 , "bookPrice" : 30000, "bookStock" : 6  , "bookImage" : "41.jpg", "bookInfo" : "송호정 , 이범근 저 | 이지스퍼블리싱 | 2022년 02월 28일"								 				, "bookContentImage" : "contentImg03.jpg" , "bookDiscount" : 5, "bookSold" : 3660},
		{"bookNo" : 42 , "bookCategory" : "DB/OS" 	  , "bookSubCategory" : "유닉스/리눅스"    , "bookName" : "모두의 리눅스"     				    					, "bookPrice" : 25000, "bookStock" : 7  , "bookImage" : "42.jpg", "bookInfo" : "미야케 히데아키 , 오스미 유스케 저 | 이동규 역 | 길벗 | 2021년 12월 24일"							 	, "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 7, "bookSold" : 1464},
		{"bookNo" : 43 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머신러닝/딥러닝"   , "bookName" : "모두의 딥러닝" 										 , "bookPrice" : 24000, "bookStock" : 8  , "bookImage" : "43.jpg", "bookInfo" : "조태호 저 | 길벗 | 2022년 03월 31일"		 														  , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 3084},
		{"bookNo" : 44 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "JSP"             , "bookName" : "모바일 웹 서비스 구현을 위한 JSP 웹 프로그래밍" 			  , "bookPrice" : 30000, "bookStock" : 5  , "bookImage" : "44.jpg", "bookInfo" : "김현규 , 박유현 저 | 한빛아카데미 | 2021년 08월 23일"		 										     , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 5, "bookSold" : 372},
		{"bookNo" : 45 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "JAVA"            , "bookName" : "명품 JAVA Programming" 				  			       , "bookPrice" : 30000, "bookStock" : 8  , "bookImage" : "45.jpg", "bookInfo" : "황기태 , 김효수 저 | 생능출판 | 2018년 06월 01일"  			                                         , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 17082},
		{"bookNo" : 46 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "JAVA"            , "bookName" : "개념있는 JAVA" 						                   , "bookPrice" : 25000, "bookStock" : 2  , "bookImage" : "46.jpg", "bookInfo" : "시바타 보요 저 | 김성훈 역 | 영진닷컴 | 2019년 01월 10일"		 					  		           , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 132},
		{"bookNo" : 47 , "bookCategory" : "컴퓨터공학" , "bookSubCategory" : "머시러닝/딥러닝"   , "bookName" : "이보다 더 쉬울 수 없는 자바 머신러닝 with Weka" 		   , "bookPrice" : 31000, "bookStock" : 0 , "bookImage" : "47.jpg", "bookInfo" : "자바라머신러닝 저 | 비제이퍼블릭 | 2021년 01월 29일"		 										       , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 10, "bookSold" : 480},
		{"bookNo" : 48 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "파이썬"           , "bookName" : "이것이 취업을 위한 코딩 테스트다 with 파이썬" 			   , "bookPrice" : 34000, "bookStock" : 0   , "bookImage" : "48.jpg", "bookInfo" : "나동빈 저 | 한빛미디어 | 2020년 08월 05일"		 													 , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 10, "bookSold" : 42039},
		{"bookNo" : 49 , "bookCategory" : "프로그래밍" , "bookSubCategory" : "JSP"		       , "bookName" : "자신감 뿜뿜! JSP 웹 프로그래밍 Hard Carry" 				 , "bookPrice" : 26000, "bookStock" : 0  , "bookImage" : "49.jpg", "bookInfo" : "신윤환 저 | 생능출판 | 2022년 01월 10일"					 										   , "bookContentImage" : "contentImg01.jpg" , "bookDiscount" : 0, "bookSold" : 783},
		{"bookNo" : 50 , "bookCategory" : "DB/OS"     , "bookSubCategory" : "유닉스/리눅스"    , "bookName" : "리눅스 입문자를 위한 명령어 사전" 					      , "bookPrice" : 32000, "bookStock" : 1  , "bookImage" : "50.jpg", "bookInfo" : "가와구치 히로시 , 다야 후미히코 , 미사와 아키라 저 | 서수환 역 | 한빛미디어 | 2021년 07월 07일"	         , "bookContentImage" : "contentImg02.jpg" , "bookDiscount" : 0, "bookSold" : 4362},
	];

	return bookDB;
}

function getCartSample() {
	var cartDB = [
		{"cartNo" : 1, "cartMemberId" : "qwer", "cartBookName" : "혼자 공부하는 파이썬", "cartBuyCount" : 1, "cartBookImage" : "9.jpg", "cartBuyBookPrice" : 16200}
	];
	return cartDB;
}

function getBoardSample() {
	var boardDB = [
		{"boardNo" :  1, "boardMemberId" : "qwer", "boardSubject" :  "제목1", "boardContent" :  "내용1", "boardReadCount" : 5},
		{"boardNo" :  2, "boardMemberId" : "asdf", "boardSubject" :  "제목2", "boardContent" :  "내용2", "boardReadCount" : 1},
		{"boardNo" :  3, "boardMemberId" : "qwer", "boardSubject" :  "제목3", "boardContent" :  "내용3", "boardReadCount" : 2},
		{"boardNo" :  4, "boardMemberId" : "qwer", "boardSubject" :  "제목4", "boardContent" :  "내용4", "boardReadCount" : 0},
		{"boardNo" :  5, "boardMemberId" : "asdf", "boardSubject" :  "제목5", "boardContent" :  "내용5", "boardReadCount" : 7},
		{"boardNo" :  6, "boardMemberId" : "qwer", "boardSubject" :  "제목6", "boardContent" :  "내용6", "boardReadCount" : 10},
		{"boardNo" :  7, "boardMemberId" : "asdf", "boardSubject" :  "제목7", "boardContent" :  "내용7", "boardReadCount" : 6},
		{"boardNo" :  8, "boardMemberId" : "qwer", "boardSubject" :  "제목8", "boardContent" :  "내용7", "boardReadCount" : 1},
		{"boardNo" :  9, "boardMemberId" : "asdf", "boardSubject" :  "제목9", "boardContent" :  "내용9", "boardReadCount" : 0},
		{"boardNo" : 10, "boardMemberId" : "qwer", "boardSubject" : "제목10", "boardContent" : "내용10", "boardReadCount" : 2},
		{"boardNo" : 11, "boardMemberId" : "hello", "boardSubject" : "제목11", "boardContent" : "내용11", "boardReadCount" : 1}
	];
	return boardDB;
}

// 라우터 세팅
app.get("/", function(req, res){ 

	var memberDB = getMemberSample();
	var bookDB = getBookSample();
	var cartDB = getCartSample();
	var boardDB = getBoardSample();

	req.session.log = null;
	req.session.name = null;
	req.session.orderDB = [];
	req.session.memberDB = memberDB;
	req.session.bookDB = bookDB;
	req.session.cartDB = cartDB;
	req.session.boardDB = boardDB;

    res.redirect("mainBook"); 
});



