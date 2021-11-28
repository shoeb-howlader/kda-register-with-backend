var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var dotenv = require('dotenv')
dotenv.config();
var indexRouter = require('./routes/index');
var apiRouter=require('./api')
const database = require('./config/database');
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


database();
app.use('/', indexRouter);
app.use('/api', apiRouter);

//
app.use(express.static(path.join(__dirname, 'public')));
app.get(/.*/, (req,res)=>{
  res.sendFile(__dirname+'/public/index.html');
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//handle production
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, 'public')));
  app.get(/.*/, (req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
  })
}
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/////// code here for creating log file 
const winston = require('winston');
// Logger configuration
const logConfiguration = {
  'transports': [
      new winston.transports.File({
          filename: 'logs/DB_backup.log'
      })
  ]
};
const winlogger = winston.createLogger(logConfiguration);
//winlogger.info('Hello, Winston!');
//winlogger.info('Hello, Winston!');

/*const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});*/


//////BACKUP code here //////
const { spawn } = require('child_process');
//const path = require('path');
const cron = require('node-cron');

/* 
Basic mongo dump and restore commands, they contain more options you can have a look at man page for both of them.
1. mongodump --db=rbac_tutorial --archive=./rbac.gzip --gzip
2. mongorestore --db=rbac_tutorial --archive=./rbac.gzip --gzip
Using mongodump - without any args:
  will dump each and every db into a folder called "dump" in the directory from where it was executed.
Using mongorestore - without any args:
  will try to restore every database from "dump" folder in current directory, if "dump" folder does not exist then it will simply fail.
*/

const DB_NAME = 'kda-register';
const ARCHIVE_PATH = path.join(__dirname, 'db_backup', `${DB_NAME}.gzip`);

// 1. Cron expression for every 5 seconds - */5 * * * * *
// 2. Cron expression for every night at 00:00 hours (0 0 * * * )
// Note: 2nd expression only contains 5 fields, since seconds is not necessary

// Scheduling the backup every 5 seconds (using node-cron)
//daily night 0 0 * * *
//this will backup every thursday 59 23 * * 4
cron.schedule('*/5 * * * * *', () => backupMongoDB());

function backupMongoDB() {
  const child = spawn('mongodump', [
    `--db=${DB_NAME}`,
    `--archive=${ARCHIVE_PATH}`,
    '--gzip',
  ]);

  child.stdout.on('data', (data) => {
    console.log('stdout:\n', data);
  });
  child.stderr.on('data', (data) => {
    console.log('stderr:\n', Buffer.from(data).toString());
  });
  child.on('error', (error) => {
    console.log('error:\n', error);
  });
  child.on('exit', (code, signal) => {
    if (code) console.log('Process exit with code:', code);
    else if (signal) console.log('Process killed with signal:', signal);
    else {console.log('Backup is successfull ✅');
    var today = new Date();
    var date =today.getDate()+'-'+ (today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    winlogger.info('Backup is successfull ✅--  date: '+date+'  time: '+time);
  }

  });
}


module.exports = app;
