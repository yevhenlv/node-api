var express = require('express');

var router = express.Router();

router.delete('/', function(req, res, next) {
  res.json({
    type: 'delete'
  });
});

module.exports = router;