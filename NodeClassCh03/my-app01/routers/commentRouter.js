//라우터
import express from "express";
import url from "url";

const router = express.Router();




// http://localhost:3000/comments?page-num=3&keyword=검색어
router.get('/', (req, res) => {
  const reqParam=url.parse(req.url, true).query;
  const result ={pageNum: reqParam["page-num"] , keyword : reqParam.keyword}

  //객체를 JSON 문자열로 직렬화해서 응답
  res.json(result);
});

// 요청 URI : comments/10/3
router.get("/:no/:pageNum",(req,res)=>{
    const no = req.params.no;
    const pageNum = req.params.pageNum;

    res.json({no:no, pageNum: pageNum});


})

router.post("/",(req,res)=>{
  console.log(req.body);
  const{title,writer,content}=req.body;
  res.json({title:title , writer:writer ,content: content});

})

router.put("/",(req,res)=>{
  console.log(req.body);
  const {no,title,writer,content}=req.body;

  res.json({no:no , title:title, writer:writer, content:content, update:"OK"})
})

router.delete("/",(req,res)=>{
  const {no}=req.body;
  res.json({no:no, delete:"OK"});
  
})

export default router