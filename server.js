import express, { json, response } from 'express';
import fetch from 'node-fetch';
const app = express()

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index', { data: {} })
})

app.post('/', async (req, res) => {
    //default dim
    let dim = 0.1;

    const pointData = req.body.locationPoint.split(',');

    //pointData is an array of string, we need it to be float
    const pointDataFloats = pointData.map((point) => parseFloat(point));

    // console.log(pointDataFloats);
    //generate locations array
    let locations = [
        [pointDataFloats[0] + dim, pointDataFloats[1] - dim],
        [pointDataFloats[0] + dim, pointDataFloats[1]],
        [pointDataFloats[0] + dim, pointDataFloats[1] + dim],
        [pointDataFloats[0], pointDataFloats[1] - dim],
        [pointDataFloats[0], pointDataFloats[1]],
        [pointDataFloats[0], pointDataFloats[1] + dim],
        [pointDataFloats[0] - dim, pointDataFloats[1] - dim],
        [pointDataFloats[0] - dim, pointDataFloats[1]],
        [pointDataFloats[0] - dim, pointDataFloats[1] + dim]
    ];

    let urls = [];

    locations.forEach(async (location) => {
        // console.log(location);
        urls.push(`https://api.nasa.gov/planetary/earth/assets?lat=${location[0]}&lon=${location[1]}&date=2021-01-01&dim=${dim}&api_key=0lli7tmiM3wf606yXd2bqAtQYY0PbAXUyXGGyeKw`)
        // const response = await fetch(url);
        // const data = await response.json();

        // responsesArray.push(data);
        // console.log(responsesArray);
        // fetch(url)
        //     .then(res => res.json())
        //     .then(json => res.render('index', { data: [json, json, json, json, json, json, json, json, json] }));
    });

    Promise.all(
        urls.map(url =>
            fetch(url)
                .then(response => response.json())
                .catch(err => console.error(err))
        )
    ).then(imagesData => res.render('index', { data: imagesData }));

    // res.render('index', { data: responsesArray });

})

app.listen(5000)