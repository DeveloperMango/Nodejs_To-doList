웹 어플리케이션 구조
본 예제에서 만들 웹 어플리케이션의 기본 디렉토리 구조
1. public: 정적 리소스
	-Images: 이미지
	-javascripts: 프론트엔드 자바스크립트
	-stylesheets: CSS
2. views: 템플릿
3. routes: 요청을 처리하는 핸들러
4. node_modules: Node.js 확장 모듈
5. app.js:메인 웹 서버

다음과 같은 개념을 포함하고 있다.
-Express 모듈을 이용하여 웹서버 실행하기
-라우팅 구성하기
-Bootstrap를 이용하여 웹 페이지 구성하고 꾸미기
-jQuery를 이용하여 DOM 요소를 다루고, 기능 구형하기 



다양한 기능 추가하기
1. 새로운 할 일을 추가할때, 엔터키를 입력하여 추가하기
2. 완료된 할 일은 아래로 정렬하기
3. 여러 할 일을 한 번에 처리하기
4. 표와 관련된 다른 라이브러리 적용하기(jQuery DataTables
5. UI를 더 예쁘게 꾸며보기
6. 할 일 목록을 데이터베이스테 저장하기
7. DB연동하기
8. 모바일 버전도 제작하기(리액트)


1) morgan
서버를 실행 시켰을 때 콘솔에 나오는 GET / 200 51.267 ms - 1539 같은 로그는 모두 morgan 미들웨어에서 나오는 것입니다.
요청에 대한 정보를 콘솔에 기록해 주는 역할을 합니다.

2) body-parser
요청의 본문을 해석해주는 미들웨어입니다.
보통 폼 데이터나 AJAX 요청의 데이터를 처리합니다.

3) cookie-parser
요청에 동봉된 쿠키를 해석해줍니다.