
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  name: String,
  text: String
});
module.exports = mongoose.model('Product', ProductsSchema);
