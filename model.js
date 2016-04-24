var data = {
  'starttime': '2015-01-01 00:00:00',
  'endtime': '2016-04-01 12:00:00'
};
var data = require('querystring').stringify(data);

var reqOpt = {
  method: "POST",
  port: 80,
  host: "119.254.111.193",
  path: "/index.php/Home/API/readOrderByTime",
  headers: {
    "Content-Type": 'application/x-www-form-urlencoded',
    "Content-Length": data.length
    }
};

function getOrdersArray(orders){
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
  return ordersArray;
}

exports.opt = reqOpt;
exports.data = data;
exports.getOrdersArray = getOrdersArray;