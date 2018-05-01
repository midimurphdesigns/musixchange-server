'use strict';

const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  instrumentType: { type: String, required: true },
  instrumentName: { type: String, required: true },
  description: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: String, required: true },
});

adSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      title: this.title,
    };
  },

  helloWorld() {
    return 'hello world'
  }
};

module.exports = mongoose.model('Ad', adSchema);
