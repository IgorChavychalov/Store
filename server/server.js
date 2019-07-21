const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use('/', express.static('client'));

app.get('/api/products', (req, res) => {
  fs.readFile('server/db/products.json', 'utf8', (err, data) => {
    if (err) {
      res.send({result: 0, text: 'error'});
    } else {
      res.send(data);
    }
  })
});
app.get('/api/cart', (req, res) => {
  fs.readFile('server/db/userCart.json', 'utf8', (err, data) => {
    if (err) {
      res.send({result: 0, text: 'error'});
    } else {
      res.send(data);
    }
  })
});


app.listen(3000, () => console.log('Started at port 3000...'));