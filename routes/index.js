const set = app => {
  const controller = require('../controllers');

  app.get('/data', controller.get);
  app.post('/data', controller.post);
  app.put('/data', controller.put);
  app.delete('/data', controller.delete);
}

export {
  set
};