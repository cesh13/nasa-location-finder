import express, { json } from 'express';
import fetch from 'node-fetch';
const app = express()

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index', {data: {}})
})

app.post('/', (req, res) => {
    const pointData = req.body.locationPoint.split(",");
    const url = `https://api.nasa.gov/planetary/earth/assets?lat=${pointData[0]}&lon=${pointData[1]}&date=2021-01-01&dim=0.025&api_key=0lli7tmiM3wf606yXd2bqAtQYY0PbAXUyXGGyeKw`
    let data = {};
    fetch(url)
    .then(res => res.json())
    .then(json => res.render('index', {data: json}));
})

app.listen(5000)