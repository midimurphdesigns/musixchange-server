'use strict';

const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    instrumentType: { type: String, required: true },
    instrumentDescription:{ type: Object, required: true },
    price: { type: String, required: true }
})

adSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Ad', adSchema);