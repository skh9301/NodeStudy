//미들웨어


const express = require('express');
const url = require('url');
const createError = require('http-errors');


const app = express();

//미들웨어

app.use((req,res,next) => {
        console.log("첫 미들웨어입니다.");
        next();
});

//두번째 미들웨어

let requestTime = (req,res,next)=>{
        req.requestTime = Date.now();
        next();
}

app.use(requestTime);

//요청 페이지가 없을때 처리를 위한 미들웨어

app.use((req,res,next)=>{
        next(createError(404));
})
//app.use("/경로", 미들웨어) 형식으로 라우팅을 설정할수 있음
app.use("/list",(req,res)=>{
        res.setHeader('Content-type', 'text/html; charset=utf-8');
        res.end(`<h1>여기는 리스트</h1>
                <ul>
                        <li>app.use(/list,(req,res)=> {})로라우팅 </li>
                </ul>
                `)
})



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