import express from "express";
import data from "./data/data.json";

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.static('images'));

app.get('/', (req, res) => {
  // res.send(data);
  // get data
  res.json(data);
});

// app.get('/images', (req, res, next) => {
//   // res.redirect("http://www.linkedin.com");
//   res.download("images/rocket.jpg");
// });

app.get('/item/:id', (req, res, next) => {
  // res.send(data);
  // get data
  let userNo = +req.params.id;
  if(data.length < userNo) {
    res.send(`<h1>Requested User with ID: ${userNo} does not exist.</h1>`)
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify(data[userNo], null, 2));
    // res.send(JSON.stringify(data[userNo], null,));
  }
  next();
}, (req, res) => {
  console.log('Did you get the right data?')
  }
);

app.route('/item')
  .get((req, res) => { 
    res.send(`a get request with /item route on port ${PORT}`) 
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


app.listen(PORT, () => {
  console.log(`Serving running on port ${PORT}`);
  // console.log(JSON.stringify(data, null, 2));
})