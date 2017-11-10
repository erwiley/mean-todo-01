const router = require('express').Router();
var Todo     = require("../models/todo");
var config   = require("../config");
const {ensureAuthenticated} = require('../helpers/auth');

router.get("/", ensureAuthenticated, function(req,res){
    Todo.find({user:req.user.id})
        .sort({date:'desc'})
        .then((todos)=>{
            res.json(todos);
    });
});

router.put("/", ensureAuthenticated, function(req,res){
    const newData = {
        item: req.body.item,
        user: req.user.id
    }
    var newTodo = Todo(newData).save(function(err,data){
        if (err) throw err;
        req.flash('success_msg','New Todo Added');
        res.json(data);
    });
});

router.delete("/:id", ensureAuthenticated, function(req,res){    
    Todo.find({_id: req.params.id}).remove(function(err,data){
        if (err) throw err;
        req.flash('success_msg','Todo Removed');
        res.json(data);
    });
});

router.get("/:id", ensureAuthenticated, function(req,res){
    Todo.findOne({_id: req.params.id},function(error,doc){
        if(error) throw error;
        res.json(doc);
    });
});

router.put("/:id", ensureAuthenticated, function(req,res){    
    Todo.findOneAndUpdate({_id: req.params.id},{ $set:{item:req.body.item}}).exec(function(error,doc){
        if(error) throw error;
        req.flash('success_msg','Todo Updated');
        res.json(doc);
    });
});

module.exports = router;