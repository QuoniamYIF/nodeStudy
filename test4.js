'use strict'
//模块引用
var http = require('http'), 
      later = require('later'),
      fs = require('fs');
//代码组织
var model = require('./model'),
      down = require('./down'),
      eventproxy = require("eventproxy");
//变量
var eq = new eventproxy(),
      urll, urlr, picdir, lPic, rPic;
//       sched = later.parse.text('every 20 mins');

// console.log("NOW: " + new Date());
// // var sche =  later.schedule(sched).,
// var sched = later.parse.text('every 20 mins'),
//       t = later.setInterval(function() {
//           console.log(new Date());
//           test();
//       }, sched);
// var data = require('querystring').stringify(req.data);

// console.log(data.endtime.split(' ')[1].split(':'));
// console.log(model.opt);
function test() {

    var req = http.request(model.opt, function (res) {
    console.log(res.statusCode);
    if (res.statusCode == 200) {
        var body = "";
        res
        .on('data', function (data) { body += data; })
        .on('end', function () { 
            var orders = JSON.parse(body);
            var ordersArray = new Array();
            var order = new Array();
            for(var ind in orders) {
              if(typeof orders[ind] == 'object' && orders[ind] != null) {
                order.push(orders[ind].orderid);
                order.push(orders[ind].wearl);
                order.push(orders[ind].wearr);
                ordersArray.push(order);
                order = [];
              }
            }
            //所有的数据已经变成数组
            fs.mkdirSync('pic');
            for(let i = 0;i < ordersArray.length;i ++){
                fs.mkdir('./pic/'+ordersArray[i][0], function(err){
                    if(err) {
                         down.printE(err);
                    }
                    eq.emit('Done', i);
                });
            }
            eq.on('Done', function(i){
                urll = ordersArray[i][1];
                urlr = ordersArray[i][2];
                lPic = down.getPN(urll)
                rPic = down.getPN(urlr);
                picdir = './pic/'+ ordersArray[i][0]
                down.getP(urll, picdir, lPic);
                down.getP(urlr, picdir, rPic);
            });
        });
      }
    });

    req.on('error', function(e) {
      down.printE(e.message);
    });
    // write data to request body
    req.write(model.data);
    req.end();
}

test();