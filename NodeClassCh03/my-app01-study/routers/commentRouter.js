import express from 'express';
import url from 'url'

const router = express.Router();

router.get("/",(req,res)=>{
    const reqParam =url.parse(req.url,true).query;
    const result={pageNum :reqParam["page-num"],keyword:reqParam.keyword};
    res.json(result);
})



router.get("/:no/:pageNum",(req,res)=>{
    const no= req.params.no;
    const pageNum = req.params.pageNum;

    res.json({no: no , pageNum: pageNum})
});

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