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
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
}))
app.set('port', port);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/get-thumbnail', (req, res) => {
    request(req.body.link, (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        var title = $('meta[property="og:title"]').attr('content');
        console.log(title);

        var description = $('meta[property="og:description"]').attr('content');
        console.log(description);
        
        var imageLink = $('meta[property="og:image"]').attr('content');
        
        var random = Math.floor(Math.random() * Math.floor(999999));

        res.render('image-render' ,{ title, description, imageLink, random })
    }
    });

})

app.post('/update-get-thumbnail', (req, res) => {
    var title = req.body.title;
    var imageLink = req.body.image;
    var random = Math.floor(Math.random() * Math.floor(999999));
    var description = "";
    
    res.render('image-render' ,{ title, description, imageLink, random })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})