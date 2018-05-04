'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

postSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      title: this.title,
      image: this.image,
      description: this.description,
      condition: this.condition,
      price: this.price,
      author: this.author,
    };
  },

  helloWorld() {
    return 'hello world';
  },
};

module.exports = mongoose.model('Post', postSchema);
