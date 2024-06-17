//미들웨어(Middleware)
// A와 B 중간에서 양 쪽을 연결하여 데이터를 주고 받을 수 있도록 매개 역할을 하는 소프트웨어를 의미
//요청과 응답 중간에서 필요한 처리를 수행하는 함수를 가리켜 미들웨어라고 부른다
const express = require('express');
const url = require('url');
const createError = require('http-errors');

const app = express();
const port = 3000;

// 첫번째 미들웨어
app.use((req,res,next)=>{
  console.log("첫번째 미들웨어...");
  next();
})

// 두번째 미들웨어 정의
let requestTime =(req,res,next)=>{
  req.requestTime = Date.now();
  next();
}

app.use(requestTime);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/main', (req, res) => {
  const user = url.parse(req.url, true).query;
  console.log(user);
  res.json({ name: user.name + '-한글', age: user.age });
});

app.get('/list', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.send(`
    <h1>여기는 리스트</h1>
    <ul>
      <li>app.use('/list',(req,res)=>{}) 라우팅 </li>
    </ul>
  `);
});

//요청 페이지가 없을 때 = 에러를 발생시키는 미들웨어
app.use((req,res,next)=> {
  next(createError(404));
})


app.listen(port, () => {
  console.log(`Express 서버시작 -ok- http://localhost:${port}`);
});
