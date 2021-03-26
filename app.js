const express = require('express')
const logger = require('morgan');
const _ = require('lodash');
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request-promise");
const bodyParser = require('body-parser')
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

app.use("/public", express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('port', port);
app.set('view engine', 'ejs');

app.get('/get-thumbnail', function(req, res) {
    res.render('index');
});

app.post('/get-thumbnail', (req, res) => {
    request(req.body.link, (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        var title = $('h1.detail-title').text();
        console.log(title);

        var description = $('h2.detail-lead').text();
        // console.log(description);
        
        var imageLink = $('meta[property="og:image"]').attr('content');
        console.log(imageLink);
        res.render('image-render' ,{ title, description, imageLink })
    }
    });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})