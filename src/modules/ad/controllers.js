const Ad = require('./model');

exports.getAll = (req, res) => {
  Ad.find()
    .populate('author')
    .then(data => {
      return res.json(data);
    });
};

exports.getById = (req, res) => {
  Ad.findById(req.params.id)
    .populate('author')
    .then(data => {
      return res.json(data);
    });
};

exports.getFromUser = (req, res) => {
  Ad.find({ author: req.user.id }).then(data => {
    return res.json(data);
  });
};

exports.create = (req, res) => {
  const data = Object.assign({}, req.body, { author: req.user.id });
  Ad.create(data).then(data => {
    return res.json(data);
  });
};

exports.remove = (req, res) => {
  Ad.findById(req.params.id).then(ad => {
    if (ad.author.toString() !== req.user.id) {
      return res.sendStatus(401)
    }
    ad.remove().then(() => {
      return res.status(204).json({success: true})
    })
  })
}
