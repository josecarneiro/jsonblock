'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  block: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 1,
    maxlength: 40
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: () => ({})
  }
});

const Resource = mongoose.model('Resource', schema);

module.exports = User;
