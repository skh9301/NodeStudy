import express from 'express';

import commentRouter from './routers/commentRouter.js';
import noticeRouter from './routers/noticeRouter.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/comments", commentRouter);
// "/notices" 요청에 대한 라우팅 미들웨어 등록
// "/notices"로 들어오는 모든 요청은 noticeRouter로 넘겨서 처리한다.
app.use("/notices", noticeRouter);
app.listen(3000, () => {
    console.log(`Express 서버 시작 -OK- http://localhost:3000/`);
});
