// Express 프레임워크 사용하기
// https://expressjs.com/ko/starter/hello-world.html
const express = require('express'); // express 모듈 불러오기
const url = require('url');         // url 모듈 불러오기

// Express 서버 인스턴스 생성 - app은 express의 기능을 담고 있는 객체
const app = express();

// app 객체의 get() 메서드를 이용해 get 방식 요청에 대한 라우팅 설정
// https://expressjs.com/en/guide/routing.html
app.get("/main", (req, res) => {
  // parse() 함수의 두 번째 인수에 true를 지정하면 요청된 URL에서
  // 쿼리스트링을 객체로 읽어 오고 false를 지정하면 문자열로 읽어온다.
  const user = url.parse(req.url, true).query;  
  console.log(user);

  // json으로 응답 - "charset=utf-8"이 자동으로 설정되어 한글이 깨지지 않는다.
  res.json({ name: user.name + '한글', age: user.age });
});

app.get("/list", (req, res) => {
  res.setHeader('Content-type', 'text/html; charset=utf-8'); // 응답 헤더 설정 
  res.end(`<h1>여기는 리스트</h1>
            <ul>
              <li>Node.js</li>
              <li>JavaScript</li>
              <li>JSON</li>
            </ul>`);
});

// 3000번 포트에서 사용자 접속 대기
app.listen(3000, () => {
  console.log(`Express 서버 시작 OK - http://localhost:3000/`);
});