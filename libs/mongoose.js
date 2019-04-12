var mongoose = require('mongoose');
var log = require('./log')(module);

const connect = url => {
  mongoose.connect(
    url,
    { useNewUrlParser: true, auto_reconnect: true },
    function() {
      // mongoose.connection.db.dropDatabase();
    }
  );

  mongoose.connection.on('error', function(error) {
    log.error('Error in MongoDb connection: ' + error);

    mongoose.disconnect();
  });
  mongoose.connection.on('disconnected', function() {
    log.error('MongoDb disconnected.');

    mongoose.connect(
      url,
      { useNewUrlParser: true, auto_reconnect: true }
    );
  });
  
  mongoose.set('debug', true);
  mongoose.set('useCreateIndex', true);
}

const close = _ => {
  mongoose.disconnect();
}

module.exports = {
  connect,
  close
};