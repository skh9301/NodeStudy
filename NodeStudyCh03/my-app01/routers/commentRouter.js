// "/comments" 요청에 대한 라우팅을 분리한 파일
import express from 'express';  // express 모듈 불러오기
import url from 'url'           // url 모듈 불러오기

// Router 객체 생성
const router = express.Router();

// Router 객체를 사용해 GET 방식 "/comments" 요청에 대한 라우팅 설정
// index04.js에서 라우팅 미들웨어를 등록할 때 "/comments"로 등록하기 때문에
// 최상위 경로인 "/comments"를 제외하고 그 하위를 "/"로 다시 분리해야 한다.
router.get("/", (req, res) => {

  // parse() 함수의 두 번째 인수에 true를 지정하면 요청된 URL에서
  // 쿼리스트링을 객체로 읽어 오고 false를 지정하면 문자열로 읽어온다.  
  const reqParam = url.parse(req.url, true).query;
  const result = { pageNum: reqParam["page-num"], keyword: reqParam.keyword };  

  // json으로 응답 - "charset=utf-8"이 자동으로 설정되어 한글이 깨지지 않는다.  
  res.json(result);
});

// Router 객체를 사용해 GET 방식 "/comments/10/3" 요청에 대한 라우팅 설정
router.get("/:no/:pageNum", (req, res) => {

  // 경로 변수를 이용해 서버로 전송된 데이터를 읽어온다.
  const no = req.params.no;
  const pageNum = req.params.pageNum;
  
  res.json({ no: no, pageNum: pageNum });
});

// Router 객체를 사용해 POST 방식 "/comments" 요청에 대한 라우팅 설정
router.post("/", (req, res) => { 

  // 요청 본문으로 들어오는 데이터를 구조 분해 할당을 이용해 변수에 할당 
  const { title, writer, content } = req.body;
  console.log(req.body);  
  console.log(title, writer, content);

  res.json({ title: title, writer: writer, content: content });
});

// Router 객체를 사용해 PUT 방식 "/comments" 요청에 대한 라우팅 설정
router.put("/", (req, res) => {

  // 요청 본문으로 들어오는 데이터를 구조 분해 할당을 이용해 변수에 할당  
  const { no, title, writer, content } = req.body;
  console.log(no, title, writer, content);
  
  res.json({ no: no, title: title, writer: writer, content: content, update: "OK" });
});

// Router 객체를 사용해 DELETE 방식 "/commnets" 요청에 대한 라우팅 설정
router.delete("/", (req, res) => {
  // 요청 본문으로 들어오는 no 데이터 받기
  const no = req.body.no;  
  console.log(no);

  res.json({ no: no, delete: "OK" });
});

// 현재 파일에서 router 하나만 export 
export default router