// 미들웨어 사용하기
// https://expressjs.com/ko/resources/middleware.html
const express = require('express'); // express 모듈 불러오기
const url = require('url');         // url 모듈 불러오기
const createError = require('http-errors');  // http-errors 모듈 불러오기

// Express 서버 인스턴스 생성 - app은 express의 기능을 담고 있는 객체
const app = express();

/* 첫 번째 미들웨어를 화살표 함수로 등록
 * 미들웨어는 요청과 응답 사이에서 필요한 기능을 제공하는 함수이다.
 * 미들웨어는 다음과 같이 요청 객체, 응답 객체, next 함수를 넘겨 받는다.
 **/
app.use((req, res, next) => {
  console.log("첫 번째 미들웨어 입니다.");
  next(); // 반드시 next() 함수가 호출되어야 다음 미들웨어로 처리를 넘긴다.
});

// 두 번째 미들웨어 정의
let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next(); // 다음 미들웨어로 처리를 넘긴다.
};

// Express의 use() 함수를 통해서 두 번째 미들웨어를 등록한다.
app.use(requestTime);

app.get("/main", (req, res) => {
  // parse() 함수의 두 번째 인수에 true를 지정하면 요청된 URL에서
  // 쿼리스트링을 객체로 읽어 오고 false를 지정하면 문자열로 읽어온다.
  const user = url.parse(req.url, true).query;  
  console.log(user);

  // json으로 응답 - "charset=utf-8"이 자동으로 설정되어 한글이 깨지지 않는다.
  // 앞의 미들웨어에서 req 객체에 requestTime 속성을 추가했기 때문에 접근이 가능하다.
  res.json({ name: user.name + '한글', age: user.age, reqTime: req.requestTime }); 
});

// app.use("/경로", 미들웨어) 형식으로 라우팅을 설정할 수 있음
app.use("/list", (req, res) => {
  res.setHeader('Content-type', 'text/html; charset=utf-8'); // 응답 헤더 설정 
  res.end(`<h1>여기는 리스트</h1>
          <ul>            
            <li>app.use(/list, (req, res) => { })로 라우팅</li>
          </ul> `);
});

// 요청 페이지가 없을 때 처리를 위한 미들웨어 등록
app.use((req, res, next) => {
  // next() 함수의 인수로 http-errors 패키지를 이용해 PageNotFound(404)
  // 에러를 발생시켜서 Express의 에러 핸들링 미들웨어가 실행되도록 했다.
  next(createError(404));
});

// 3000번 포트에서 사용자 접속 대기
app.listen(3000, () => {
  console.log(`Express 서버 시작 OK - http://localhost:3000/`);
});