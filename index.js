var express = require("express");
var app = express();

const employees_app = require('./employees')
const flash_card_app = require('./flashcards')

//* Route for employees model *//
app.use('/api/employees',employees_app);

//* Route for flashcard model *//
app.use('/api/flashcard',flash_card_app);


app.get('/', function (req, res) {
    res.status('200').send('Service is up');
});

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
//var server_ip_address = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {
    console.log("Server running");
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
    console.log('Server running on http://%s:%s', server_ip_address, server_port)
});