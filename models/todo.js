var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    item:{ type:String, required:true },
    user:{ type:String, required:true },
    date:{ type:Date, default:Date.now }
});

module.exports = mongoose.model('Todo',todoSchema);
