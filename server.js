const employees = require('./employees.js');

const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.send('<h1>Hello employees!</h1>')
})

app.get('/employees', (req, res) => {
  // res.sendFile(`${__dirname}/employees.js`);
  let out = '';
  employees.forEach((employee)=>{
    out += `<h1>${employee.name}: Employee #${employee.id}</h1>`;
  })
  res.send(out)

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



app.listen(3000, () => {
  console.log(`listening on PORT 3000`);
});

