
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
  name: String,
  text: String
});
module.exports = mongoose.model('Comment', ProductsSchema);
