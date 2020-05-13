const express = require('express')
const app = express()
const port = 3300
const ejs = require('ejs');
const router = require('./routers/router.js')


app.use(express.static(__dirname+'/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use('/', router);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
