var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var config      = require("./config");
var mongoose    = require("mongoose");
var router      = express.Router();
var appRoutes   = require("./api")(router);

app.use(express.static("app"));
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