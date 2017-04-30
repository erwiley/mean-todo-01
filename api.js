var Todo        = require("./todo");
var config      = require("./config");

module.exports = function(router){
    router.route("/todos").get(function(req,res){
        Todo.find({},function(error,docs){
            if(error) throw error;
                res.json(docs);
        });
    });

    router.route("/todos").put(function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });

    router.route("/todos/:id").delete(function(req,res){
        var id =  req.params.id;

        Todo.find({_id: id}).remove(function(err,data){
            if (err) throw err;
        res.json(data);
        });
    });

    router.route("/todos/:id").get(function(req,res){
        var id =  req.params.id;
        
        //Todo.findOne({_id: mongoose.Types.ObjectId(id)},function(error,doc){
        Todo.findOne({_id: id},function(error,doc){
            if(error) throw error;
            res.json(doc);
        });
    });

    router.route("/todos/:id").put(function(req,res){
        var id =  req.params.id;
        Todo.findOneAndUpdate({_id: id},{ $set:{item:req.body.item}}).exec(function(error,doc){
            if(error) throw error;
            res.json(doc);
        });
    });

    return router;
}