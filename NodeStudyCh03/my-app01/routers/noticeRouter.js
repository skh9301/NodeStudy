// GET 방식 "/notices" 요청에 대한 라우팅을 분리한 파일
import express from 'express';  // express 모듈 불러오기
import url from 'url'           // url 모듈 불러오기

// Router 객체 생성
const router = express.Router();

// Router 객체를 사용해 GET 방식 "/notices" 요청에 대한 라우팅 설정
// index04.js에서 라우팅 미들웨어를 등록할 때 "/notices"로 등록하기 때문에
// 최상위 경로인 "/notices"를 제외하고 그 하위를 "/"로 다시 분리해야 한다.
router.get("/", (req, res) => {

  // parse() 함수의 두 번째 인수에 true를 지정하면 요청된 URL에서
  // 쿼리스트링을 객체로 읽어 오고 false를 지정하면 문자열로 읽어온다.  
  const reqParam = url.parse(req.url, true).query;
  const result = { title: reqParam["title"], writer: reqParam.writer };  

  // json으로 응답 - "charset=utf-8"이 자동으로 설정되어 한글이 깨지지 않는다.  
  res.json(result);
});

// 현재 파일에서 router 하나만 export
export default router