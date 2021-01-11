import * as express from 'express';
import { Users, Posts } from './db/dbModel';
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
var Sequelize = require('sequelize-values')();

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
app.post('/create_post', (req: express.Request, res: express.Response) => {
  const {postTitle, postContent, postDate} = req.body
  const userID = session['current']
  post.createPost(postTitle, postContent, postDate, userID)
  // insert function to create user account
  // handle if blanks
  // handle if already regsistered
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
  // log out user
  app.get('/logout', (req, res) => {
    session['current'] = null;
    res.json({'success': 'logout'})

  })
  app.get('/show_posts', (req, res) => {
    let postData = [];
    const posts = post.showAllPosts().then(function (posts: Array<typeof Posts>) {
      for (const item of posts) {
        postData.push(item.dataValues);
        console.log(postData);

      }
      res.json(postData)

    })
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