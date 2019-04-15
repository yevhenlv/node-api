var mongoose = require('mongoose');

const connect = url => {
  mongoose.connect(
    url,
    { useNewUrlParser: true, auto_reconnect: true },
    function() {
      // mongoose.connection.db.dropDatabase();
    }
  );

  mongoose.connection.on('error', function(error) {
    mongoose.disconnect();
  });
  mongoose.connection.on('disconnected', function() {
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