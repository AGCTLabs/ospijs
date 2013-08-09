var util = require('util');
var winston = require('winston');
var FFI = require('ffi');
var path = require('path');

var logfile = path.join(__dirname, '../logs/ospi-activity.log');

var logger = new (winston.Logger)({
    transports: [
         new (winston.transports.File)({ filename: logfile, timestamp: function () {
          return new Date().toString();
        }})
    ]
});

var state = 0; 

var RTLD_NOW = FFI.DynamicLibrary.FLAGS.RTLD_NOW;
var RTLD_GLOBAL = FFI.DynamicLibrary.FLAGS.RTLD_GLOBAL;
var mode = RTLD_NOW | RTLD_GLOBAL;

var wiringPi = FFI.DynamicLibrary('libwiringPi' + FFI.LIB_EXT, mode);
var ospi = FFI.DynamicLibrary(path.join(__dirname, 'libospi' + FFI.LIB_EXT), mode);

var ospi = new FFI.Library(path.join(__dirname, 'libospi'),
  {"ospi_init": [ "void", [  ] ],
   "ospi_open_shut":["void",["int"]]});

ospi.ospi_init();

checkStation = function(station) {
  if (station < 0 || station > 15) {
    throw new Error('invalid station. must be between 0 and 15');
  }
}

exports.on = function(station) {
  
  checkStation();

  var mask = 1 << station;
  state |= mask;
  ospi.ospi_open_shut(state);

  logger.info('Opening station '+station);
}

exports.off = function(station) {

  if  (typeof station === 'undefined' || isNaN(station)) {
    state = 0;
    ospi.ospi_open_shut(state);
    logger.info('Shutting all stations');

    return;
  }

  checkStation();

  var mask = 1 << station;
  state &= ~mask;
  ospi.ospi_open_shut(state);

  logger.info('Shutting station '+station);
}

exports.control = function(option) {
  option = option || {};

  option.open = option.open || [];
  option.shut = option.shut || [];

  var cur_state = state;

  if (option.shutAll) {

    state = 0;

  } else if (option.open.length) {
    
    for (var i = 0; i < option.open.length; i++) {
      var mask = 1 << option.open[i];
      state |= mask;
    }

  } else if (option.shut.length) {

    for (var i = 0; i < option.shut.length; i++) {
      var mask = 1 << option.shut[i];
      state &= ~mask;
    }
  }

  logger.log('info','Controlling stations', option);

  if (cur_state != state )
     ospi.ospi_open_shut(state);
}

exports.state = function () {
  return state;
}
