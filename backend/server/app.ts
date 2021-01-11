import * as express from 'express';
import { Users } from './db/dbModel';
var session = require('express-session');
var user = require('./db/CRUD/user');
var post = require('./db/CRUD/post');
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
  const {username, password} = req.body
  // insert function to create user account
  // handle if blanks
  // handle if already regsistered
  user.createAccount(username, password)
  res.json({ message: 'success.' });
})

// login user
app.post('/login', (req: express.Request, res: express.Response) => {
  const {username, password} = req.body
  const users = user.getUserByUsername(username).then(function (users: Array<typeof Users>) {
    // check if username is in DB
    if (users.length === 0) {
      res.json({'error': 'User not registered'})
    }
    else if (users[0].password !== password) {
      res.json({'error': 'Incorrect password'})
    }
    // otherwise, create session and log them in
    else {
      session['current'] = users[0].id
      console.log('logged in');
      res.json({'success': username})

    }
  })

  app.post('/create_post', (req: express.Request, res: express.Response) => {
    const {postTitle, postContent, postDate, userID} = req.body
    console.log('xx')
    // insert function to create user account
    // handle if blanks
    // handle if already regsistered
    res.json({ message: 'success.' });
  })
})

function logger (req: Request, res: Response, next: express.NextFunction) {
  console.log(`a ${req.method} was made to ${req.url} with status: ${res.status}`)
  next()
  }
  app.listen(8080, () => {
    console.log('listening');
  });
  module.exports = app;