const xlsx = require("xlsx");
const book = xlsx.utils.book_new();
var request = require("request");
const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')
let exdata = {};
exports.excel = function () {
    (async () => {
        await client.lrange('list', 0, -1, (err, data) => {
            exdata = data;
            var dataa;
            var sendData = [];
            var lookup = {};
            var result = [];
            var item;
            for (dataa of exdata) {
                var t = JSON.parse(dataa);
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
            const exceldata = xlsx.utils.json_to_sheet(result);
            xlsx.utils.book_append_sheet(book, exceldata, "chartDaTa");
            xlsx.writeFile(book, "./files/CoronaData.xlsx");
        });
    })();
}
