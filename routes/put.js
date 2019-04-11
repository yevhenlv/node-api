var express = require('express');

var router = express.Router();

router.put('/', function(req, res, next) {
  res.json({
    type: 'put'
  });
});

module.exports = router;