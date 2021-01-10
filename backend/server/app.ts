import * as express from 'express';
var session = require('express-session');
var crud = require('./db/crud')

require('dotenv').config();
const app = express();

app.use(express.json());

// reinitialize DB when restarting server
 
 


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my app.' });
  });

// create user account
app.post('/create_account', (req: express.Request, res: express.Response) => {
    const username: string = req.body['username']
    const password: string = req.body['password']
    // insert function to create user account
    // handle if blanks
    // handle if already regsistered
    crud.createAccount(username, password)
    res.json({ message: 'success.' });

})
app.get('/test', (req, res) => {
    //crud.createAccount('ccc', 'ddd')
    res.json({ message: 'good day' });


  });
  app.listen(8080, () => {
    console.log('listening');
  });
  module.exports = app;