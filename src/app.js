const path = require('path')
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//connecting to db
mongoose.connect('mongodb://localhost/crud-mongo',{useNewUrlParser:true})
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err))

//imorting routes
const indexRoutes = require('./routers/index');

// settings 
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views')); // indica la ruta de la carpeta vieew
app.set('view engine','ejs'); // motor de plantilla

//middlewares
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false})); // se le coloca false si solo se envia texto

// routes
app.use('/', indexRoutes);
//start the servers
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});