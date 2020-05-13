var data = require('./data.js')
var redisinserter = require('./redisinserter.js')
var redisdelete = require('./redisdelete.js')
var schedule = require('node-schedule')


async function pipe(){
    await redisdelete.redisdelete()
    await data.data()
    await redisinserter.redisinserter()

}
schedule.scheduleJob('5 * * * * *', function(){
    pipe()
})
