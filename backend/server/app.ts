import * as express from 'express';
var session = require('express-session');
var crud = require('./db/crud')
var createError = require('http-errors');
var cors = require('cors')
const port = 8080;
require('dotenv').config();
const app = express();
app.use(cors()) // prevent cors error
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing json
 


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my app.' });
  });

// create user account
app.post('/create_account', (req: express.Request, res: express.Response) => {
  console.log('test12');
  console.log(req.body);
  const {username, password} = req.body
  console.log(username);
  // insert function to create user account
  // handle if blanks
  // handle if already regsistered
  //crud.createAccount(username, password)
  res.json({ message: 'success.' });

})
app.get('/test', (req, res) => {
    //crud.createAccount('ccc', 'ddd')
    res.json({ message: 'good day' });


  });

function logger (req: Request, res: Response, next: express.NextFunction) {
  console.log(`a ${req.method} was made to ${req.url} with status: ${res.status}`)
  next()
  }
  app.listen(8080, () => {
    console.log('listening');
  });
  module.exports = app;