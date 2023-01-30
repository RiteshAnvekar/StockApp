//Stock Market Portfolio

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');


const PORT = process.env.PORT || 5000

// Middleware for Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');


//Set handlebar routes
app.get('/', function(req,res){
	res.render('home');
})

//Set static folder

app.use(express.static(path.join(__dirname,'public')));


app.listen(PORT, () => console.log("Server listening on PORT " + PORT));