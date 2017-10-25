var express     = require("express");
var path        = require('path');
var bodyParser  = require("body-parser");
var config      = require("./config");
var mongoose    = require("mongoose");
var appRoutes   = require('./routes/api');
var app         = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use("/", appRoutes);

//Connect to the database
mongoose.connect(config.database,function(err){
    if(err)
        console.log("Not connected to db " + err);
    else
        console.log("Successfully connected to database");
});

app.listen(config.port,function(){
    console.log("listening on port " + config.port);
});