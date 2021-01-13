import * as express from 'express';
import { Users, Posts, Favorites } from './db/dbModel';
let session = require('express-session');
const createError = require('http-errors');
const cors = require('cors')
const port = 8080;
require('dotenv').config();
const app = express();
app.use(cors()) // prevent cors error
const bodyParser = require('body-parser')
// CRUD function files for data models
const user = require('./db/CRUD/user');
const post = require('./db/CRUD/post');
const favorite = require('./db/CRUD/favorite');

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
  res.json({ message: 'success.' })
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
      session['current'] = users[0].id;
      console.log(users[0].id)
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
  const userID: number = session['current'];
  console.log('show user posts');
  console.log(userID);

  const posts = post.showUserPosts(userID).then(function (posts: Array<typeof Posts>) {
    for (const item of posts) {
      postData.push(item.dataValues);
      console.log(item.dataValues);
    }
    res.json(postData)
  })
})
// shows user's favorites
app.get('/show_favorites', (req, res) => {
  let favoriteData = [];
  const userID: number = session['current'];
  console.log(userID);
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
// returns info on post
app.get('/get_post_info/:id', (req: express.Request, res: express.Response) => {
  const postData = []
  const info = post.getPostInfo(req.params['id']).then(function (info: Array<typeof Posts>) {
    for (const item of info) {
      postData.push(item.dataValues);
    }
  res.json(postData);
})
})
// deletes a post
app.post('/delete_post/:id', (req: any, res: express.Response) => {
  post.deletePost(req.params['id'])
  res.json({'message': 'success'});
})
// deletes a favorite post
app.post('/delete_favorite/:id', (req: any, res: express.Response) => {
  favorite.deleteFavorite(req.params['id'])
  res.json({'message': 'success'});
})
app.post('/search_by_title', (req: express.Request, res: express.Response) => {
  let postData = [];
  console.log(req.body);
  
  const searchTerm: string = req.body['title'];
  const posts = post.searchPostTitle(searchTerm).then(function (posts: Array<typeof Posts>) {
    for (const item of posts) {
      postData.push(item.dataValues);
    }
    res.json(postData)

  })
})
app.get('/send_login', (req: express.Request, res: express.Response) => {
  if (session['current']) {
    console.log('current');
    res.json({'status': true})
  }
  else {
    res.json({'status': false})
  }
  
})

app.post('/update_post/:id', (req: express.Request, res: express.Response)=> {
  const {content} = req.body;
  console.log(req);
  console.log('update backend');
  console.log(content);
  post.updatePost(req.params['id'], content)
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