var readline = require('readline');
var ospi = require('../lib/ospi');

var printBinary = function (num) {
  var s = num + ' -- > ';
  for (var i=15; i >= 0; i--) {
    var bit = num & (1 << i);
    s += bit > 0 ? '1' : '0';
  }
  console.log(s);
}

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (cmd) {

   if (cmd === 'quit') {
     done();
   } else {
     var input = cmd.split(' ');
     var station=parseInt(input[1]);
     if (input[0] === 'on') {
       ospi.on(station);
     } else if(input[0] === 'off')  {
       ospi.off(station);
     } else {
       console.log('command not recognized');
     }
  }
});

