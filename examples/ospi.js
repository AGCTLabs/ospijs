
var winston = require('winston');
var logger = new (winston.Logger)({
       transports: [
         new (winston.transports.File)({ filename: 'logs/scheduler-activity.log', timestamp: function () {
          return new Date().toString();
        }})
       ]
});

var FFI = require("ffi");

var RTLD_NOW = FFI.DynamicLibrary.FLAGS.RTLD_NOW;
var RTLD_GLOBAL = FFI.DynamicLibrary.FLAGS.RTLD_GLOBAL;
var mode = RTLD_NOW | RTLD_GLOBAL;

var wiringPi = FFI.DynamicLibrary('libwiringPi' + FFI.LIB_EXT, mode);
var ospi = FFI.DynamicLibrary('lib/libospi' + FFI.LIB_EXT, mode);

var ospi = new FFI.Library("lib/libospi",
  {"ospi_init": [ "void", [  ] ],
   "ospi_open_shut":["void",["int"]]});

if (process.argv.length != 3) {
   console.log("Arguments: " + process.argv[0] + " " + process.argv[1] + " <value>");
   process.exit();
}

ospi.ospi_init();
ospi.ospi_open_shut(process.argv[2]);
logger.info('open_shut','Script called...with value '+process.argv[2]);
