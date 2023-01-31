//Stock Market Portfolio

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyp = require('body-parser');


const PORT = process.env.PORT || 5000


//Fuction to fetch data with callback
function call_api(finshedAPI, comp) {
request('https://nodejsproj.iex.cloud/stable/stock/'+ comp +'/quote?token=pk_287b7fe39acc489c82eade021d34cf28',{json : true}, (err,res,body) => {
	if(err) {return console.log(err);}
	if(res.statusCode === 200){
		finshedAPI(body); 
	};

});
};



// Middleware for Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');



//Middleware for bodyparser
app.use(bodyp.urlencoded({extended: false}));



//Static page loading 
app.use(express.static(path.join(__dirname,'public')));



//Set handlebar POST routes
app.post('/', function(req,res){
	call_api(function(doneAPI){
		res.render('home', {
			stock : doneAPI
		});
	},req.body.Company);
});


//About page 
app.get('/about.html', function(req,res){
	res.render('about');
});


app.listen(PORT, () => console.log("Server listening on PORT " + PORT));