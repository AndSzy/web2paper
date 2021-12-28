// express
const express = require('express');
// express settings
const app = express();
const port = process.env.PORT || '3000';

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {  
    res.render('index'); 
  })

app.get('/terms', (req, res) => {  
    res.render('terms'); 
  })

app.get('/pricing', (req, res) => {  
    res.render('pricing'); 
  })

app.get('/login', (req, res) => { 

    // res.render('pricing'); 
  })

app.get('/signup', (req, res) => { 

    // res.render('pricing'); 
  })

app.get('/premium', (req, res) => { 

    // res.render('pricing'); 
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })