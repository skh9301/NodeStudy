//Rest API


import express from 'express';
import commentRouter from "./routers/commentRouter.js";
import noticeRouter from "./routers/noticeRouter.js";

const app = express();
const port = 3000;

// req.body 들어오는 데이터를 처리하는 미들웨어
app.use(express.json());

// post 요철으로 들어올 때 content-Type이 application/x-www-form-urlencoded인 
// 경우 파싱해 주는 설정 JSON 미들웨어와 같이 사용
app.use(express.urlencoded({extended:true}));

// CSS, JavaScript,html, 이미지 파일등의 정적 파일을 제공하기 위한 설정
app.use(express.static("public"));

app.use("/comments",commentRouter);

app.use("/notice",noticeRouter);

app.listen(port, () => {
  console.log(`Express 서버시작 -ok- http://localhost:${port}`);
});
