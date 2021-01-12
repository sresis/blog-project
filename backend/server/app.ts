import * as express from 'express';
import { Users, Posts, Favorites } from './db/dbModel';
let session = require('express-session');
const user = require('./db/CRUD/user');
const post = require('./db/CRUD/post');
const favorite = require('./db/CRUD/favorite');
const createError = require('http-errors');
const cors = require('cors')
const port = 8080;
require('dotenv').config();
const app = express();
app.use(cors()) // prevent cors error
const bodyParser = require('body-parser')
const Sequelize = require('sequelize-values')();

app.use(bodyParser.json()) // for parsing json
 
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my app.' });
  });

// create user account
app.post('/create_account', (req: express.Request, res: express.Response) => {
  const {username, password} = req.body
  console.log(req.body);
  console.log('make account');
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
      }
      res.json(postData)

    })
  })
  // show all the posts that the user has made
  app.get('/show_user_posts', (req, res) => {
    let postData = [];
    const userID:number = session['current']
    const posts = post.showUserPosts(userID).then(function (posts: Array<typeof Posts>) {
      for (const item of posts) {
        postData.push(item.dataValues);
      }
      res.json(postData)
    })
  })
  // shows user's favorites
  app.get('/show_favorites', (req, res) => {
    let favoriteData = [];
    const userID: number = session['current']
    const favorites = favorite.viewUserFavorites(userID).then(function (favorites: Array<typeof Favorites>) {
      for (const item of favorites) {
        favoriteData.push(item.dataValues);
      }
      res.json(favoriteData)

    })
  })
  // creates a favorite post
  app.post('/create_favorite/:id', (req: any, res: express.Response) => {
    const userID = session['current']
    favorite.createFavorite(userID, req.params['id'])    
    res.json({ message: 'success.' });
  })
  // deletes a post
  app.post('/delete_post/:id', (req: any, res: express.Response) => {
    post.deletePost(req.params['id'])
    res.json({'message': 'success'});
  })
  app.post('/update_post/:id', (req: express.Request, res: express.Response)=> {
    const {postContent} = req.body
    console.log(postContent);
    post.updatePost(req.params['id'], postContent)
    res.json({'message': 'success'})
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