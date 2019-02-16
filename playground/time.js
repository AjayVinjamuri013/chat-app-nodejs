var moment = require('moment');

var date = moment();
var date1 = moment(1234);
date.add(100,'year').subtract(9,'months');
console.log(date.format('MMM Do YYYY'));
console.log(date1.format('h:mm a'));