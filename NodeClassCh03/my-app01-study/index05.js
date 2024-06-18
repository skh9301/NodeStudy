// 템플릿 엔진 사용하기
// Nunjucks : https://mozilla.github.io/nunjucks/
import express from 'express';    // express 모듈 불러오기
import path from 'path';          // path 모듈 불러오기
import nunjucks from 'nunjucks';  // nunjucks 모듈 불러오기
import fs from 'fs';              // fs 모듈 불러오기

// Express 서버 인스턴스 생성 - app은 express의 기능을 담고 있는 객체
const app = express();

// req.body를 사용해서 요청 본문의 데이터를 받기 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CommonJS 방식에서는 다음 2개가 기본 제공되었는데 ESM 에서는 사용할 수 없어서
// path 모듈의 resolve() 함수를 이용해 현재 실행되는 파일의 절대 경로를 구했다.
// __dirname : 현재 실행 중인 파일이 포함된 디렉터리의 절대경로
// __filename : 현재 실행 중인 파일의 이름
const __dirname = path.resolve();

// join() 함수는 인수를 순서대로 조합해 경로 문자열을 반환하는 함수
// file path - my-app01/data/students.json
const filePath = path.join(__dirname, 'data', 'students.json');
console.log(__dirname);
console.log(filePath);

// 템플릿 엔진을 사용하는 설정으로 템플릿 엔진의 파일 확장자를 html로 설정
// 파일 확장자는 꼭 html이 아니어도 되며 임의로 설정할 수 있음
app.set('view engine', 'html');  // index.html => index(.html)

// 뷰 페이지의 경로를 지정해 Nunjucks 환경 설정
nunjucks.configure('./views', {
  watch: true,  // html 파일이 수정되면 수정된 내용을 반영하여 다시 렌더링
  express: app
});

app.get("/", (req, res) => {  
  // 응답 객체의 render() 함수로 뷰의 이름과 뷰에 출력할 데이터를 전달
  res.render("variable", { message: "Hi Nunjucks", toDay: new Date()});
});

app.get("/if", (req, res) => {  
  // 응답 객체의 render() 함수로 뷰의 이름과 뷰에 출력할 데이터를 전달
  res.render("ifCondition", { isLogin: true, id: "admin", color: "red"});
});

app.get("/for", async (req, res) => {
  // data/students.json 파일에서 데이터를 읽어와 자바스크립트 객체로 변환
  const fileData = fs.readFileSync(filePath);
  const sList = JSON.parse(fileData);
  
  // 응답 객체의 render() 함수로 뷰의 이름과 뷰에 출력할 데이터를 전달
  res.render("forLoop", {sList: sList});
});

app.get("/main", (req, res) => {
  // 응답 객체의 render() 함수로 뷰의 이름과 뷰에 출력할 데이터를 전달
  res.render("main", { data: "Include Page" });
});

app.get("/blockContent", (req, res) => {
  // 응답 객체의 render() 함수로 뷰의 이름과 뷰에 출력할 데이터를 전달
  res.render("blockContent", { title: "Block Content" });
});

// 3000번 포트에서 사용자 접속 대기
app.listen(3000, () => {
  console.log(`Express 서버 시작 OK - http://localhost:3000/`); 
});