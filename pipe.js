var data = require('./data.js')
var redisinserter = require('./redisinserter.js')
var redisdelete = require('./redisdelete.js')
var schedule = require('node-schedule')
var excel =require('./excel.js')


async function pipe(){
    await redisdelete.redisdelete()
    await data.data()
    await redisinserter.redisinserter()
    await excel.excel()

}
schedule.scheduleJob('10 * * * * *', function(){
    pipe()
})
