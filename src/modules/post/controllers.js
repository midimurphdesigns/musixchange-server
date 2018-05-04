const Post = require('./model');

exports.getAll = (req, res) => {
  Post.find()
    .populate('author')
    .then(data => {
      return res.json(data);
    });
};

exports.getById = (req, res) => {
  Post.findById(req.params.id)
    .populate('author')
    .then(data => {
      return res.json(data);
    });
};

exports.getFromUser = (req, res) => {
  Post.find({ author: req.user.id }).then(data => {
    return res.json(data);
  });
};

exports.create = (req, res) => {
  const data = Object.assign({}, req.body, { author: req.user.id });
  Post.create(data).then(data => {
    return res.json(data);
  });
};

exports.remove = (req, res) => {
  Post.findById(req.params.id).then(post => {
    if (post.author.toString() !== req.user.id) {
      return res.sendStatus(401);
    }
    post.remove().then(() => {
      return res.status(204).json({ success: true });
    });
  });
};

exports.update = (req, res) => {
  Post.findById(req.params.id).then(post => {
    if (post.author.toString() !== req.user.id) {
      return res.sendStatus(401);
    }

    const newPost = post;

    Object.keys(req.body).forEach(key => {
      if (key !== 'id') {
        newPost[key] = req.body[key];
      }
    });

    newPost.save().then(() => {
      return res.status(200).json(newPost);
    });
  });
};
