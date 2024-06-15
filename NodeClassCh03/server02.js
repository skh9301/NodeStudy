// 라우터 만들기 - 데이터를 주고 받기 위해 인터넷을 연결해주는 선- 인터넷 장비중 한가지
// http 모듈
const http = require('http');
// url 모듈
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // http://localhost:3000/main => /main
  const path =url.parse(req.url,true).pathname;
  res.setHeader('Content-Type', 'text/html;  charset=UTF-8');
 
  if(path == "/main"){
    res.write("<h2>요청 URI</h2>")
    res.end("</h3>여기는 메인</h3>");
  } else if(path == "/list"){
    res.write("<h2>요청 URI</h2>")
    res.end("</h3>여기는 리스트</h3>");
  }else {
    res.statusCode =404;
    res.end("Page Not Found -404");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
