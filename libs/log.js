var winston = require('winston');
var ENV = process.env.NODE_ENV;

function log(module) {
  var path = module.filename.split('/').slice(-2).join('/');

  return new winston.createLogger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: ENV === 'devlopment' ? 'debug' : 'error',
        label: path
      }),
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        timestamp: true
      })
    ]
  })
}

module.exports = log;