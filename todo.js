var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var todoSchema = new Schema({item:String});

module.exports = mongoose.model('Todo',todoSchema);
