import express from 'express';
import { parse } from 'url';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/comments", (req, res) => {
    const reqParam = parse(req.url, true).query;
    const result = { pageNum: reqParam['page-num'], keyword: reqParam.keyword };
    res.json(result);
});

app.get("/comments/:no/:pageNum", (req, res) => {
    const no = req.params.no;
    const pageNum = req.params.pageNum;
    res.json({ no: no, pageNum: pageNum });
});

app.post("/comments", (req, res) => {
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
app.all("/all", (req, res) => {
    res.json({ uri: "/all", msg: "OK" });
});

app.listen(3000, () => {
    console.log(`Express 서버 시작 -OK- http://localhost:3000/`);
});
