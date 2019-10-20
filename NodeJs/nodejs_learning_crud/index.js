//Express dependencies
// Query params = ?teste=1
// Route params = /users/1
// Request body = {"name": "Debony", "email":"debony@gmail.com"} 
//localhold: 3000/teste

// CRUD - Create, Read, Update, Delete

const express = require('express'); //nome da dependecia
const server = express();
const users = ['Debony', 'Antonia','Arnaldo'];

server.use(express.json());

//MIDDLEWARE Global
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  
  next();

  console.timeEnd('Request');
})

//MIDDLEWARE Local

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Users is required' });
  }

  return next();
}

function checkUserInArray (req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exsist!' });
  }

  req.user = user;

  return next();
}

//GET - Read
server.get('/users', checkUserInArray, (req, res) => {
  return res.json(users);
})

server.get('/users/:index', checkUserInArray, (req,res) => {
  return res.json(req.user);
})

//POST - Create

server.post('/users', checkUserExists, (req,res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

//PUT - Update

server.put('/users/:index', checkUserExists, checkUserInArray,  (req,res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})


//Delete - delete 

server.delete('/users/:index', checkUserInArray, (req,res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
})
server.listen(3000);
