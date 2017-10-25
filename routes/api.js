const router = require('express').Router();
var Todo     = require("../models/todo");
var config   = require("../config");

router.get("/todos", function(req,res){
    Todo.find({},function(error,docs){
        if(error) throw error;
            res.json(docs);
    });
});

router.put("/todos", function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

router.delete("/todos/:id", function(req,res){
    var id =  req.params.id;

    Todo.find({_id: id}).remove(function(err,data){
        if (err) throw err;
    res.json(data);
    });
});

router.get("/todos/:id", function(req,res){
    var id =  req.params.id;
    
    //Todo.findOne({_id: mongoose.Types.ObjectId(id)},function(error,doc){
    Todo.findOne({_id: id},function(error,doc){
        if(error) throw error;
        res.json(doc);
    });
});

router.put("/todos/:id", function(req,res){
    var id =  req.params.id;
    Todo.findOneAndUpdate({_id: id},{ $set:{item:req.body.item}}).exec(function(error,doc){
        if(error) throw error;
        res.json(doc);
    });
});

module.exports = router;