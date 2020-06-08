const request = require('request');
const fs = require('fs');
const url = "http://api.corona-19.kr/korea/country/new/?serviceKey=fff098a39e0a841ab72e1d27bdee9b517"

function RemoveJsonTextAttribute(value,parentElement){
    try{
        var keyNo = Object.keys(parentElement._parent).length;
        var keyName = Object.keys(parentElement._parent)[keyNo-1];
        parentElement._parent[keyName] = value;
    }catch(err){
        console.log(err);
    }
}

exports.data2 = function(){
    request({
        url: url,
        json: true
    }, function(err,res,body){
        if(err){
            console.log(`err => ${err}`)
        }
        else {
            if(res.statusCode == 200){
                const cocoro2 = JSON.stringify(body)
                console.log(cocoro2);
                fs.writeFileSync('coco2.json', cocoro2)   
            }
                
        }
    })

}
