// Router 객체로 라우팅 분리하기
// https://expressjs.com/en/guide/routing.html 
// https://expressjs.com/en/5x/api.html#router

 // ESM 모듈 방식으로 외부 모듈 불러오기 
import express from 'express'; // express 모듈 불러오기

// routers 디렉터리로부터 라우팅을 분리한 파일 불러오기
// 각각의 모듈에서 export default router로 export 했기 때문에
// 모듈을 불러올 때 다음과 같이 임의의 이름을 지정할 수 있다.
import commentRouter from './routers/commentRouter.js';
import noticeRouter from './routers/noticeRouter.js';

// Express 서버 인스턴스 생성 - app은 express의 기능을 담고 있는 객체
const app = express();

// req.body를 사용해서 요청 본문의 데이터를 받기 위한 미들웨어
app.use(express.json());

// POST 요청 시 Content-type이 application/x-www-form-urlencoded인 
// 경우 파싱해 주는 설정으로 JSON 미들웨어와 같이 사용해야 함
app.use(express.urlencoded({ extended: true }));

// CSS, JavaScript, html 파일과 같은 정적 파일 요청을 처리해주는 미들웨어
app.use(express.static('public'));

// "/commnets" 요청은 commentRouter로 처리하기 위해서 라우팅 미들웨어 등록
// "/comments"로 들어오는 모든 요청은 commentRouter로 넘겨서 처리한다.
app.use("/comments", commentRouter);

// "/notices" 요청에 대한 라우팅 미들웨어 등록
// "/notices"로 들어오는 모든 요청은 noticeRouter로 넘겨서 처리한다.
app.use("/notices", noticeRouter);

// 3000번 포트에서 사용자 접속 대기
app.listen(3000, () => {
  console.log(`Express 서버 시작 OK - http://localhost:3000/`);
});