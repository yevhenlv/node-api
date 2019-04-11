const set = app => {
  const controller = require('../controllers');

  app.get('/', controller.get);
  app.post('/', controller.post);
  app.put('/', controller.put);
  app.delete('/', controller.delete);
}

export {
  set
};