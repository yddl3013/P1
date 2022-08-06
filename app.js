import cors from 'cors';
import axios from 'axios';
import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express();

const port = 3030;

const serviceKey = "111f48f0039644d087e84073ded0515d"
const url = `http://open.neis.go.kr/hub/hisTimetable`


app.use(express.static(__dirname))
app.use(cors({origin: true, credentials: true}))
app.use(express.json())

app.post('/',  async (req, res) => {
    console.log(req.body);
    console.log("------------------");
    const result = await axios({
        url: url,
        method: 'get',
        params: {
            Key: serviceKey,
            Type: 'json',
            pIndex: 1,
            pSize: 100,
            ATPT_OFCDC_SC_CODE: 'J10',
            SD_SCHUL_CODE: '7531149',
            AY: '2022', //학년도
            SEM: '1', //학기
            GRADE: '3', //학년
            CLRM_NM: '1', //강의실명
            CLASS_NM: '1', //반명
            TI_FROM_YMD: req.body.from, //시작 날짜
            TI_TO_YMD: req.body.to //끝 날짜
        }
    })
    console.log(result);
    



    res.status(200).send(result.data);
})

app.listen(port, () => {
    console.log(`server listening on ${port}`);
})