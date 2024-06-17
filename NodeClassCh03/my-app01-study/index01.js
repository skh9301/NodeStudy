const express = require('express');
const url = require('url');

const app = express();

app.get("/main",(req,res)=>{
        const user = url.parse(req.url, true).query;
        console.log(user);
        res.json({name:user.name,age:user.age})
})
app.get("/list",(req,res)=>{
    res.setHeader('Content-type', 'text/html; charset=utf-8');
    res.end(`<h1>여기는 리스트</h1>
            <ul>
                <li>Node.js</li>
                <li>JavaScript</li>
                <li>JSON</li>
            </ul>
        `)
})

app.listen(3000,()=>{
        console.log(`Express 서버시작 oK - http://localhost:3000/`);
})