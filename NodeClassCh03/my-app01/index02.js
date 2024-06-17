//미들웨어(Middleware)

const express = require('express');
const url = require('url');

const app = express();
const port = 3000;

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
      <li>Node.js</li>
      <li>JavaScript</li>
      <li>Node.js</li>
      <li>Node.js</li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Express 서버시작 -ok- http://localhost:${port}`);
});
