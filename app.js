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

// https://andrzejazurestorage.blob.core.windows.net/test/

// --------- GOOD

app.post('/', (req, res) => {
  console.log(req.body);

  let domain = (new URL(req.body.url));
  let blobName = domain.hostname + Date.now().toString();

  (async () => {
    let pdf = await scrapper.printPDF(req.body.url);

    storage.saveToAzure(pdf,blobName).then(() => res.render('index', {blobName: blobName})).catch((ex) => console.log(ex.message));

    // res.render('index');
  })();

   // unique name for blob that can be reused to get the blob address
    // show modal success/error
    // show btn with address to the blob file 

})


app.get('/', function (req, res) {  
    res.render('index', {blobName: false}); 
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