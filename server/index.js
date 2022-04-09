// Set up
var express = require("express");
var app = express();
var logger = require("morgan");
var cors = require("cors");
var https = require("https");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev")); // Log requests to API using morgan
app.use(cors());

// Routes
app.post("/api/check", function (req, res) {
  var key = req.body.key;
  var response = res;

  // Use this code if you want to just send a successful response

  response.send(true);

  // Use the following code if you want to actually integrate with SendOwl
  // This will require signing up to SendOwl and creating a product

  // var options = {
  // 	hostname: 'www.sendowl.com',
  // 	path: '/api/v1/products/PRODUCT-ID-GOES-HERE/licenses/check_valid?key=' + key,
  // 	headers: {
  //       'Accept': 'application/json',
  // 	  'Authorization': 'Basic ' + new Buffer('KEY-GOES-HERE:SECRET-GOES-HERE').toString('base64')
  //   	},
  // 	method: 'GET'
  // };

  // https.get(options, (res) => {

  // 	res.on('data', (data) => {

  // 		var text = data.toString();

  // 		if(text != "[]"){
  // 			response.send(true);
  // 		} else {
  // 			response.send(false);
  // 		}

  // 	});

  // }).on('error', (err) => {
  //   	console.error('error:', err);
  // 	response.send(err);
  // });
});

// Listen
app.listen(process.env.PORT || 8080);
console.log("Server started");
