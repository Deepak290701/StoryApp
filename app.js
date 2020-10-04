const express = require('express');
const dotenv = require('dotenv');
const morgan  = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const connectDB = require('./config/db');
const app = express();

//Load Config Files
dotenv.config({path : './config/config.env'});

//Passport Config
require('./config/passport')(passport);


//Connectiong to database 
connectDB();


//Setting up morgan 
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}

//setting up the view engine
//seeting the .hbs extension instead of .handlebars extension
//default layout is main.hbs
// All the layouts i.e. which are used in many files are to keept inside layouts folder like here we want
//different layout for login page therefor, we will make a different layout in layouts folder with name login
app.engine('.hbs', exphbs({defaultLayout : 'main' , extname: '.hbs'}));
app.set('view engine', '.hbs');


//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store : new MongoStore({mongooseConnection : mongoose.connection})
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());



//Static Folders

//What it does that it tells the templeate engine to search for OUR OWN EXTERNAL css and js files which we will include in views folder to look into public
//i.e. now /css.. in view folder is actually /public/css..
app.use(express.static(path.join(__dirname,'public')))


//Routes
app.use('/' , require('./routes/index'));
app.use('/auth' , require('./routes/auth'));


const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT} in ${process.env.NODE_ENV} mode`));