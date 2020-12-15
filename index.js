import express from "express";
import favicon from "serve-favicon";
import path from "path";
import data from "./data/data.json";
import helmet from "helmet";

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(express.static('public'));
app.use(express.static('images'));

// app.use(express.json());
app.use(express.urlencoded({extended: true}));

// this is for proxies
app.set('trust proxy', 'loopback');

app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico' )));

app.get('/', (req, res) => {
  // res.send(data);
  // get data
  res.setHeader('Content-Type', 'application/json');
  // res.json(data);
  res.send(JSON.stringify(data, null, 2));
});

app.post('/newItem', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get('/item/:id', (req, res, next) => {
  // this is the middleware that pulls the data
  let userNo = +req.params.id;
  let user = data[userNo];
  // everything above is Middleware
  console.log(`Request from: ${req.originalUrl}`);
  console.log(`Request type: ${req.method}`);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(user, null, 2));
  // if(data.length < userNo) {
  //   res.send(`<h1>Requested User with ID: ${userNo} does not exist.</h1>`)
  // } else {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).send(JSON.stringify(data[userNo], null, 2));
  // }
  next();
}, (req, res) => {
  console.log('Did you get the right data?')
  }
);

app.route('/item')
  .get((req, res) => { 
    throw new Error('Not working');
    // res.send(`a get request with /item route on port ${PORT}`) 
    })
  .post((req, res) => { 
    res.send(`a post request with /item route on port ${PORT}`) 
    })
  .put((req, res) => { 
    res.send(`a put request with /item route on port ${PORT}`) 
    })
  .delete((req, res) => {
    res.send(`a delete request with /item route on port ${PORT}`)
  })

app.get("*", (req, res) => {
  res.redirect("/");
});

// error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send(`Red alert! Red Alert!: \n${err.stack}`)
});

app.listen(PORT, () => {
  console.log(`Serving running on port ${PORT}`);
  // console.log(JSON.stringify(data, null, 2));
})