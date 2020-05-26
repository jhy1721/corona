var express = require('express')
var router = express.Router()
var request = require("request");
const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')
const app = express()
const ejs = require('ejs')
let testdata = {}

app.set('views', __dirname + '../views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/static'));

(async () => {
    await client.lrange('list', 0, -1, (err, data) => {
        testdata = data;
    });
})();

router.get('/getChartData', function (req, res) {
    var data;
    var sendData = [];
    var lookup = {};
    var result = [];
    var item;
    for (data of testdata) {
        var t = JSON.parse(data);
        if (t.createDt.substring(8, 10) % 10 == 1) {
            t.createDt = t.createDt.substring(0, 10);
            sendData.push(t);
        }
    }
    //중복제거(createDt 기준)
    for (i = 0; item = sendData[i]; i++) {
        var name = item.createDt;
        var k = sendData[i];

        if (!(name in lookup)) {
            lookup[name] = 1;
            result.push(k);
        }
    }
    res.json((result));
});


router.get('/asdf', function (req, res) {
    res.render('test2.ejs')
});

router.get('/getData', function (req, res) {
        res.json(testdata)
})

router.get('/chart', function (req, res) {
    res.render('chart.ejs')
});


router.get('/map', function (req, res) {
    res.render('map.ejs')
});

router.get('/mask', function (req, res) {
    res.render('mask.ejs')
});



module.exports = router;


