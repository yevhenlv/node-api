import { Text } from '../models/text';
var log = require('./libs/log')(module);

exports.get = (req, res) => {
  Text.find({}, function (err, texts) {
    if (err) return setError('db');
    if (texts) return res.status(200).json(texts);

    return res.status(200).json([]);
  });
}

exports.post = (req, res) => {
  if (!checkData(req.body, 'text')) return setError('post');

  const newText = new Text({ text: req.body.text });

  newText.save((err) => {
    if (err) return setError('db');

    res.status(201).json({ message: 'Added' });
  });  
}

exports.put = (req, res) => {
  if (!req.body.id) return setError('put');

  Text.updateOne({_id: req.body.id}, { text: req.body.text }, (err) => {
      if(err) return setError('db');

      res.status(201).json({ message: 'Updated' });
    }
  );
}

exports.delete = (req, res) => {
  if (!checkData(req.body, 'id')) return setError('delete');

  Text.deleteOne({_id: req.body.id}, (err) => {
      if (err) return setError('db');

      res.status(201).json({ message: 'Removed' });
    }
  );
}

const checkData = (data, param) => {
  return param in data;
}

const setError = action => {
  const error = {
    'delete': 'Can\'t delete without id',
    'put': 'Can\'t update without id',
    'post': 'Data is empty',
    'db': 'Error in request'
  };

  if (action === 'db') log.error(error[action]);  

  return res.status(400).json({ message: error[action] });
}