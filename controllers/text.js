import Text from '../models/text';

exports.get = (req, res) => {
  Text.find({}, function (err, texts) {
    if (err) return setError('db');
    if (texts) return res.status(200).json(texts);

    return res.status(200).json([]);
  });
}

exports.post = (req, res) => {
  if (!checkData(req.query, 'text')) return setError('post', res);

  const newText = new Text({ text: req.query.text });

  newText.save((err) => {
    if (err) return setError('db', res);

    res.status(201).json({ message: 'Added' });
  });  
}

exports.put = (req, res) => {
  if (!req.query.id) return setError('put', res);

  Text.updateOne({_id: req.query.id}, { text: req.query.text }, (err) => {
      if(err) return setError('db', res);

      res.status(201).json({ message: 'Updated' });
    }
  );
}

exports.delete = (req, res) => {
  if (!checkData(req.query, 'id')) return setError('delete', res);

  Text.deleteOne({_id: req.query.id}, (err) => {
      if (err) return setError('db', res);

      res.status(201).json({ message: 'Removed' });
    }
  );
}

const checkData = (data, param) => {
  return param in data;
}

const setError = (action, res) => {
  const error = {
    'delete': 'Can\'t delete without id',
    'put': 'Can\'t update without id',
    'post': 'Data is empty',
    'db': 'Error in request'
  };
 
  return res.status(400).json({ error: error[action] });
}