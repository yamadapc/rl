var path = require('path');
var readline = require('readline');
var limiter = require('limiter');

function normalizeUnit(sunit) {
  switch(sunit) {
    case 's':
      return 'second';
    case 'seconds':
      return 'second';
    case 'millisecond':
      return 'millisecond';
    case 'milliseconds':
      return 'millisecond';
    case 'ms':
      return 'millisecond';
    case 'minutes':
      return 'minute';
    case 'minute':
      return 'minute';
    case 'm':
      return 'minute';
    case 'd':
      return 'day';
    case 'days':
      return 'day';
    case 'day':
      return 'day';
    case 'hour':
      return 'hour';
    case 'hours':
      return 'hour';
    case 'h':
      return 'hour';
    default:
      throw new Error('Invalid unit');
  }
}

function main(args) {
  var executable = path.basename(args[0]);
  if(['iojs', 'jx', 'node', 'nodejs'].indexOf(executable) !== -1) {
    args = args.slice(2);
  } else {
    args = args.slice(1);
  }

  var pattern = args[0];
  if(!pattern) {
    console.error('Usage: rl <pattern>');
    console.error('Example:');
    console.error('    for i in {1..5}; do echo $RANDOM; done | rl "1/1"');
    console.error('Will log 1 random number every 1 second.');
    console.error('You can pass in "{n}/{n}{unit}" so "10/1hour" or "100/2m"');
    process.exit(1);
  }

  var spattern = pattern.split('/');
  var n = spattern[0];
  var munit = /(\d+)?(\w+)?/.exec(spattern[1]);
  var nunit = munit[1] || 0;
  var unit = normalizeUnit(munit[2]) || 'second';

  if(unit === 'millisecond') {
    nunit = 1 / 1000;
  } else if(unit === 'minute') {
    nunit *= 1000 * 60;
  } else if(unit === 'hour') {
    nunit *= 1000 * 60 * 60;
  } else if(unit === 'day') {
    nunit *= 1000 * 60 * 60 * 24;
  }

  var rl = new limiter.RateLimiter(n, nunit * 1000);
  var slines = readline.createInterface({
    input: process.stdin,
  });

  slines.on('line', function(line) {
    rl.removeTokens(1, function() {
      console.log(line);
    });
  });
}
exports.main = main;
