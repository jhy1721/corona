const fs = require('fs')
const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')

exports.redisdelete = function(){
    client.del('list', function(err, response) {
        if (response == 1) {
           console.log("Deleted Successfully!")
        } else{
         console.log("Cannot delete")
        }
     })
}
