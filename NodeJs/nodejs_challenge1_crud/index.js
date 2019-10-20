const express = require('express');
const server = express();
let requests = 0;
const projects = [];

server.use(express.json());

//MIDDLEWARE - Local

function checkProject (req,res,next) {
  const id = req.params;
  const project = projects.find(p => p.id == id);
  
  if (!project) {
    return res.status(400).json({error: 'This project does not exists'});
  }

  return next();
}

//MIDDLEWARE - GLOBAL

function numberOfRequests(req,res,next) {
  requests = requests + 1;

  console.log(`Requests: ${requests}`);

  return next();
}
//GET

server.get('/projects', numberOfRequests, (req,res) => {
  return res.json(projects);
})

//POST
server.post('/projects', numberOfRequests,(req,res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { task } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
})


//PUT

server.put('/projects/:id', numberOfRequests, checkProject, (req,res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);

})

//DELETE
server.delete('/projects/:id', numberOfRequests, checkProject, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id == id);
  
  projects.splice(index, 1);

  return res.send();
})

//POST - TASK

server.post('/projects/:id/tasks', numberOfRequests, checkProject, (req,res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
})

server.listen(3000);