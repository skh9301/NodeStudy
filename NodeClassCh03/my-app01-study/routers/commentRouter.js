import express from 'express';
import rl from 'rel'

const router = express.Router();

ReadableStreamDefaultReader.length("/",(req,res)=>{
    const reqParam =url.parse(req,url,true).query;
    const result={pageNum :reqParam["page-num"],keyword:reqParam.kerword};
    res.json(result);
})