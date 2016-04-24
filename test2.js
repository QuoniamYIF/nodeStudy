var http = require('http'), 
      later = require('later');
      sched = later.parse.text('every 20 mins');

console.log("NOW: " + new Date());
// var sche =  later.schedule(sched).,
var sched = later.parse.text('every 20 mins'),
      t = later.setInterval(function() {
          console.log(new Date());
          test();
      }, sched);

var data = {
    'starttime': '2015-01-01 00:00:00',
    'endtime': '2016-04-01 12:00:00'
};

console.log(data.endtime.split(' ')[1].split(':'));

data = require('querystring').stringify(data);
// console.log(data);
function test() {
    var opt = {
        method: "POST",
        port: 80,
        host: "119.254.111.193",
        path: "/index.php/Home/API/readOrderByTime",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": data.length
        }
    };

    var req = http.request(opt, function (res) {
    console.log(res.statusCode);
    if (res.statusCode == 200) {
        var body = "";
        res
        .on('data', function (data) { body += data; })
        .on('end', function () { 
            var userData = JSON.parse(body);
            // console.log(body); 
        });
    }
    });

    req.on('error', function(e) {
        console.log(e.message);
    });
    // write data to request body
    req.write(data);
    req.end();
}