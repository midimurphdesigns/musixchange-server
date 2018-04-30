const Ad = require('./model');

exports.getAll = (req, res) => {
  Ad.find().then(data => {
    return res.json(data);
  });
};

exports.getById = (req, res) => {
  Ad.findById(req.params.id).then(data => {
    return res.json(data);
  });
};

exports.create = (req, res) => {
  Ad.create(req.body).then(data => {
    return res.json(data);
  });
};
