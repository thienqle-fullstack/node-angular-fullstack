var express = require("express");
var app = express.Router();
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
    {
      "id":1,"concept":"OOPs",
      "description":"Object-oriented programming is a programming paradigm based on the concept of objects",
      "field":"General",
      "active":true
    },
    {
      "id":2,"concept":"Abstraction",
      "description":"Abstraction refers to the concept of hiding the complexities of a system from the users of that system",
      "field":"General",
      "active":true
    },
]

/* READ ALL */
app.get("/", (req, res, next) => {
  res.json(data);
});

/* READ ONE */
app.get('/:id', (req, res, next) => {
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
app.delete('/:id', function(req, res, next){
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
app.post('/new/', function(req, res, next){
  let created_object;
  if(req.body!==undefined){
      created_object = req.body;
      data.push(created_object)
  }
  res.json(created_object);
});


/* UPDATE ONE */
app.put('/:id', function(req, res, next){
  let id = req.params.id;
  let updated_object;
  if(req.body!==undefined){ //Only see body when we applied bodyParser
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

module.exports = app;