const convert = require('xml-js');
const request = require('request');
const fs = require('fs');
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd
} 
if(mm<10) {
    mm='0'+mm
} 
today = yyyy+mm+dd;


const HOST = `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${YOUR_SERVICE_KEY}&numOfRows=10000&startCreateDt=20200310&endCreateDt=20200315&`


function RemoveJsonTextAttribute(value,parentElement){
    try{
        var keyNo = Object.keys(parentElement._parent).length;
        var keyName = Object.keys(parentElement._parent)[keyNo-1];
        parentElement._parent[keyName] = value;
    }catch(err){
        console.log(err);
    }
}
exports.data = function(){
    request.get(HOST, (err,res,body) =>{
        if(err){
            console.log(`err => ${err}`)
        }
        else {
            if(res.statusCode == 200){
                var result = body
                //console.log(`body data => ${result}`)
                var xmlToJson =  convert.xml2json(result, {compact: true, spaces: 4, textFn : RemoveJsonTextAttribute});
                //console.log(xmlToJson)
                const data = JSON.parse(xmlToJson)
                const coco = data.response.body.items.item
                const cocoro = JSON.stringify(coco)
                console.log(cocoro)
                fs.writeFileSync('coco.json', cocoro)     
            }
                
        }
    })

}