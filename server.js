var express     = require("express");
var path        = require('path');
var exphbs      = require('express-handlebars');
var session     = require('express-session');
var bodyParser  = require("body-parser");
var flash       = require('connect-flash');
var mongoose    = require("mongoose");
var passport    = require('passport');
var config      = require("./config");
var todosRoutes = require('./routes/todo-routes');
var usersRoutes = require('./routes/users-routes');
var app         = express();

app.use(express.static(path.join(__dirname,'public')));

// Passport Config
require('./config/passport')(passport);

//Connect to the database
mongoose.connect(config.database,function(err){
    if(err)
        console.log("Not connected to db " + err);
    else
        console.log("Successfully connected to database");
});

// Handlebars middlewear
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session middlewear
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middlewear
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Index Route
app.get('/', (req,res)=>{
    res.render('index');
});

// About Route
app.get('/about', (req,res)=>{
    res.render('about');
});

app.use("/todos", todosRoutes);
app.use('/users', usersRoutes);

app.listen(config.port,function(){
    console.log("listening on port " + config.port);
});