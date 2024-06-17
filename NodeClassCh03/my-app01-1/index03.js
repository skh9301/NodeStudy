// Rest API
const express = require('express')
const url = require('url');

const app = express()
const port = 3000

// req.body 들어오는 데이터를 처리하는 미들웨어
app.use(express.json());

// POST 요청으로 들어올 때 Content-Type이 application/x-www-form-urlencoded인
// 경우 파싱해 주는 설정 JSON 미들웨어와 같이 사용
app.use(express.urlencoded({extended: true}));

// CSS, JavaScript, html, 이미지 파일등의 정적 파일을 제공하기 위한 설정
// http://localhost:3000 -> index.html, http://localhost:3000/main.html - main.html
app.use(express.static("public"));

// http://localhost:3000/comments?page-num=3&keyword=검색어
app.get('/comments', (req, res) => {
  const reqParam = url.parse(req.url, true).query;
  const result = { pageNum: reqParam["page-num"], keyword: reqParam.keyword };
  
  // 객체를 JSON 문자열로 직렬화해서 응답
  res.json(result);
});
// 요청 URI : comments/10/3
app.get("/comments/:no/:pageNum", (req, res) => {
  const no = req.params.no;
  const pageNum = req.params.pageNum;

  res.json({no: no, pageNum: pageNum});  
});

app.post("/comments", (req, res) => {
  console.log(req.body);
  const {title, writer, content} = req.body;

  res.json({title: title, writer: writer, content: content});
});

app.put("/comments", (req, res) => {
  console.log(req.body);
  const {no, title, writer, content} = req.body;

  res.json({no: no, title: title, writer: writer, content: content, update: "OK"});
});

app.delete("/comments", (req,res)=>{
  const no =req.body.no;
  console.log(no);

  res.json({no:no, delete: "OK"});
})

app.all("/all",(req,res)=>{
  res.json({uri:"/all",msg:"OK"})
})


app.listen(port, () => {
  console.log(`Express 서버 시작 - OK - http://localhost:${port}`);
})