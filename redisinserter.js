const fs = require('fs')
const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')


exports.redisinserter = function(){
    const cocoro = fs.readFileSync('coco.json')
    const data = JSON.parse(cocoro)

    for (var i = 0; i < data.length; i++){
        client.lpush('list', JSON.stringify(data[i]))
    }

}


