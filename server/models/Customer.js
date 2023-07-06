const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Score: {
    type: String,
    required: true
  },
  Roll_No: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Birth: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);