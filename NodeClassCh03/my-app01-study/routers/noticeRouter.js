import express from 'express';
import url from 'url'

const router = express.Router();

router.get("/",(req,res)=>{
    const reqParam =url.parse(req.url,true).query;
    const result={title :reqParam["title"],writer:reqParam.writer};
    res.json(result);
})


    export default router