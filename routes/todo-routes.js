const router = require('express').Router();
var Todo     = require("../models/todo");
var config   = require("../config");
const {ensureAuthenticated} = require('../helpers/auth');

router.get("/", ensureAuthenticated, function(req,res){
    Todo.find({user:req.user.id})
        .sort({date:'desc'})
        .then((todos)=>{
            res.render('todos/add',{todos:todos});
        });
});

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, (req,res)=>{
    Todo.findOne({_id:req.params.id})
        .then((todo)=>{
            if(todo.user != req.user.id){
                req.flash('error_msg','Not Authorized');
                res.redirect('/ideas');
            }
            else{
                res.render('todos/edit',{todo:todo});
            }
        });
});

// New route
router.post("/", ensureAuthenticated, function(req,res){
    const newData = {
        item: req.body.item,
        user: req.user.id
    }
    var newTodo = Todo(newData).save(function(err,data){
        if (err) throw err;
        req.flash('success_msg','New Todo Added');
        res.redirect('/todos');
    });
});

/*
 const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        }
        new Idea(newUser)
            .save()
            .then((idea)=>{
                req.flash('success_msg','Video Idea Added');
                res.redirect('/ideas');
            });
*/

// Edit Form process
router.put('/:id', ensureAuthenticated, (req,res)=>{
    Todo.findOne({_id:req.params.id})
    .then((todo)=>{
        // new values
        todo.item = req.body.item;
        todo.save().then((todo)=>{
            req.flash('success_msg','ToDo Updated');
            res.redirect('/todos');
        });
    });
});

router.delete("/:id", ensureAuthenticated, function(req,res){    
    Todo.find({_id: req.params.id}).remove(function(err,data){
        if (err) throw err;
        req.flash('success_msg','Todo Removed');
        //res.json(data);
        res.redirect('/todos');
    });
});

module.exports = router;