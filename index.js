var express = require("express");
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

data = [
    {"id":1,"name":"Tim Q Le","age":35,"salary":100000},
    {"id":2,"name":"Bi Q Ng","age":35,"salary":150000},
    {"id":3,"name":"Ruyma A","age":35,"salary":160000},
    {"id":4,"name":"Rymae A","age":35,"salary":55000},
    {"id":5,"name":"Miguel R","age":35,"salary":55000}
]

/* READ ALL */
app.get("/api/employees", (req, res, next) => {
    res.json(data);
});

/* READ ONE */
app.get('/api/employee/detail/:id', (req, res, next) => {
    let id = req.params.id;
    let read_object;
    for( var i = 0; i < data.length; i++)
    { 
        if (data[i].id == id) { //Compare between different datatype, Since params carry a string
            read_object = data[i]
            break;
        }
    }
    res.json(read_object);
});

/* DELETE ONE */
app.get('/api/employee/delete/:id', function(req, res, next){
    let id = req.params.id;
    let deleted_object;
    for( var i = 0; i < data.length; i++)
    { 
        if (data[i].id == id) { //Compare between different datatype, Since params carry a string
            deleted_object = data[i]
            data.splice(i, 1); 
        }
    }
    res.json(deleted_object);
});


/* NEW ONE */
app.post('/api/employee/new/:id', function(req, res, next){
    let created_object;
    if(req.body!==undefined){
        created_object = req.body;
        data.push(created_object)
    }
    res.json(created_object);
});


/* UPDATE ONE */
app.post('/api/employee/update/', function(req, res, next){
    let id = req.params.id;
    let updated_object;
    if(req.body!==undefined){
        updated_object = req.body;
   
    }
    for( var i = 0; i < data.length; i++)
    { 
        if (data[i].id == id) { //Compare between different datatype, Since params carry a string
            deleted_object = data[i]
            data.splice(i, 1); 
            data.push(updated_object)
            break;
        }
    }
    res.json(updated_object);
});
    
    

var port = process.env.OPENSHIFT_NODEJS_PORT || 8444

var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(port, ip_address, function () {
    console.log("Server running");
});