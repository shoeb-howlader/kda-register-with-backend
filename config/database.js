const mongoose = require('mongoose');
//const logger=require('./logger');
//var winston = require('winston');
//require('winston-daily-rotate-file');
//var {format} = require('winston');
/**
 * Logger handles all logs in the application
 */
/*const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  colorize: true,
  transports: [
    new winston.transports.File({
      filename: 'logs/server/error.log',
      level: 'error',
      handleExceptions: true
    }),
    new winston.transports.File({
      filename: 'logs/server/all.log',
      level: 'info',
      handleExceptions: true
    }),
    new winston.transports.DailyRotateFile({
      maxFiles: '14d',
      level: 'info',
      dirname: 'logs/server/daily',
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%.log'
    }),
    new winston.transports.Console({
      level: 'debug',
      json: false,
      handleExceptions: true
    })
  ]
});

/**
 * morganLogger logs all http request in a dedicated file and on console
 */
/*const morganLogger = winston.createLogger({
  format: format.combine(format.simple()),
  transports: [
    new winston.transports.File({
      filename: 'logs/requests/all.log',
      level: 'debug',
      handleExceptions: true
    }),
    new winston.transports.Console({
      level: 'debug',
      json: false,
      handleExceptions: true
    }),
    new winston.transports.DailyRotateFile({
      maxFiles: '14d',
      level: 'info',
      dirname: 'logs/requests/daily',
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%.log'
    })
  ]
});

const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   *//*
  write(message) {
    morganLogger.info(message.toString());
  }
};*/

module.exports = async function() {
  try {
    // Replace database value in the .env file with your database config url
    const DATABASE =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE;

        console.log(DATABASE);
    await mongoose.connect(DATABASE)
    .then(()=>{console.log('connection succesful')})
    .catch(err=>console.log(err))
    //console.log(logger)
    //logger.info('Connected to the database.');
    console.log('Connected to the database.');
  } catch (error) {
    //logger.error('Could not connect to the database.', error);
    console.log('Could not connect to the database.', error);
  }
};

