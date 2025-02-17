const employees = require('./employees.js');
let nextId = 9;
 
const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.send('<h1>Hello employees!</h1>')
})

app.get('/employees', (req, res) => {
  let out = '';
  employees.forEach((employee)=>{
    out += `<h1>${employee.name}: Employee #${employee.id}</h1>`;
  })
  res.send(out)

});

app.post('/employees', (req,res,next) => {
  const {name} = req.body;

  if(!name){
    const error = new Error("no name provided");
    next(error)
  } else {
    employees.push({
      id: nextId,
      name
    });
    nextId++;
    res.send(employees)
  }
  
});

app.get('/employees/:id', (req, res) => {
  const {id} = req.params;
  let chosenOne = {};
  if(id==='random'){
    const index = Math.floor((Math.random()*(employees.length-1))+1)
    console.log(index);
    chosenOne = employees.find((person)=> {
      return person.id === Number(index);
    })
  }else{
    chosenOne = employees.find((person)=> {
      return person.id === Number(id);
    })
  }
  res.send(`<h1>Employee ${chosenOne.id} is ${chosenOne.name}</h1>`);
})


app.use((err, req, res, next) => {
  console.log('ERROR MESSAGE', err.message);
  res.status(400).send(err.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

