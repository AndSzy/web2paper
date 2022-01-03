// express
const express = require('express');
// express settings
const app = express();
const port = process.env.PORT || '3000';

app.use(express.static('public'));
app.set('view engine', 'ejs');


const scrapper = require('./scrapper');
const storage = require('./storage');

// Post middleware
app.use(express.urlencoded());



//  -- TEST

app.get('/test', (req, res) => {

  // scrapper.printPDF('http://lechia.gda.pl/news/28912/');

  (async () => {
    let pdf = await scrapper.printPDF('http://lechia.gda.pl/news/28912/');

    storage.saveToAzure(pdf).then(() => console.log('Done')).catch((ex) => console.log(ex.message));
  })();

  res.render('index');
})

// --------- GOOD

app.post('/', (req, res) => {
  console.log(req.body);
  // scrapper.printPDF(req.body.url);
  // res.render('index'); 
  (async () => {
    let pdf = await scrapper.printPDF(req.body.url);

    storage.saveToAzure(pdf).then(() => console.log('Done')).catch((ex) => console.log(ex.message));

    res.render('index');
  })();

  

})


app.get('/', function (req, res) {  
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