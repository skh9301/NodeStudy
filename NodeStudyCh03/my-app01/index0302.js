// REST API 라우팅 03-02
// https://restfulapi.net/, https://meetup.nhncloud.com/posts/92
const express = require('express'); // express 모듈 불러오기
const url = require('url');         // url 모듈 불러오기

// Express 서버 인스턴스 생성 - app은 express의 기능을 담고 있는 객체
const app = express();

// req.body를 사용해서 요청 본문의 데이터를 받으려면 express의
// json 미들웨어를 사용해야 한다. 그렇지 않으면 undefined로 받는다.
app.use(express.json());

// POST 요청 시 Content-type이 application/x-www-form-urlencoded인 
// 경우 파싱해 주는 설정으로 JSON 미들웨어와 같이 사용해야 함
app.use(express.urlencoded({ extended: true }));

// CSS, JavaScript, html 파일과 같은 정적 파일을 제공하려면 Express에서
// 기본 제공하는 미들웨어인 static() 함수의 인수로 정적 파일을 제공할
// 디렉터리를 지정하면 된다. 아래와 같이 public 디렉터리가 지정되면
// public/main.html 파일은 http://localhost:3000/main.html로 호출하며
// public/index.html 파일은 http://localhost:3000/로 호출할 수 있다.
app.use(express.static('public'));

/* Express 프레임워크에는 HTTP 요청 메서드에 대응하여 라우팅을 
 * 설정할 수 있는 get(), post(), put(), delete(), all() 함수를 제공한다.
 **/
// HTTP 메서드가 GET 방식인 "/comments" 요청에 대한 라우팅 설정
app.get("/comments", (req, res) => {
  /* Query String : 파라미터로 데이터를 구분해서 받는 방식
   * 요청 URI : /comments?page-num=3&keyword=REST API
   * 라우팅 설정 : "/comments"
   * Query String 방식은 request 객체의 query 속성으로 값을 받을 수 있음
   * req 객체의 query 속성으로 keyword 읽기 : const no = req.query.keywrod; 
   **/  
  // parse() 함수의 두 번째 인수에 true를 지정하면 요청된 URL에서
  // 쿼리스트링을 객체로 읽어 오고 false를 지정하면 문자열로 읽어온다.  
  const reqParam = url.parse(req.url, true).query;
  const result = { pageNum: reqParam["page-num"], keyword: reqParam.keyword };  

  // json으로 응답 - "charset=utf-8"이 자동으로 설정되어 한글이 깨지지 않는다.  
  res.json(result);
});

// HTTP 메서드가 GET 방식인 "/comments/10/3" 요청에 대한 라우팅 설정
app.get("/comments/:no/:pageNum", (req, res) => {
  /* Path Variable : 경로 구분자(/)로 데이터를 구분해서 받는 방식
   * 요청 URI : comments/10/3
   * 라우팅 설정 : "/comments/:no/:pageNum"
   * Path Variable 방식은 request 객체의 params 속성으로 값을 받음
   **/  
  const no = req.params.no;
  const pageNum = req.params.pageNum;
  
  res.json({ no: no, pageNum: pageNum });
});

// HTTP 메서드가 POST 방식인 "/comments" 요청에 대한 라우팅 설정
app.post("/comments", (req, res) => { 
  // 요청 본문으로 들어오는 데이터를 구조 분해 할당을 이용해 변수에 할당 
  const { title, writer, content } = req.body;
  console.log(req.body);  
  console.log(title, writer, content);

  res.json({ title: title, writer: writer, content: content });
});

// HTTP 메서드가 PUT 방식인 "/comments" 요청에 대한 라우팅 설정
app.put("/comments", (req, res) => {
  // 요청 본문으로 들어오는 데이터를 구조 분해 할당을 이용해 변수에 할당  
  const { no, title, writer, content } = req.body;
  console.log(no, title, writer, content);
  
  res.json({ no: no, title: title, writer: writer, content: content, update: "OK" });
});

// HTTP 메서드가 DELETE 방식인 "/commnets" 요청에 대한 라우팅 설정
app.delete("/comments", (req, res) => {
  // 요청 본문으로 들어오는 no 데이터 받기
  const no = req.body.no;  
  console.log(no);

  res.json({ no: no, delete: "OK" });
});

// 모든 HTTP 메서드의 "/all" 요청에 대한 라우팅 설정
app.all("/all", (req, res) => {  
  res.json({ uri: "/all", msg: "OK" });
});

// 3000번 포트에서 사용자 접속 대기
app.listen(3000, () => {
  console.log(`Express 서버 시작 OK - http://localhost:3000/`);
});