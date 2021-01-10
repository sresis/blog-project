
const { Sequelize, DataTypes } = require('sequelize-typescript');
require('dotenv').config();


const sequelize = new Sequelize(
    'blogdb', 'root', 'password', 
    {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
    },
)

sequelize
  .authenticate()
  .then(function(err: Error) {
    console.log(err)
    console.log('Connection to db has been established successfully.');
  })
  .catch(function (err: Error) {
    console.log(err)
    console.log('Unable to connect to the database:', err);
  });

// user class
const User = sequelize.define('User', {
    id:  { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User'
});
User.sync({ alter: true})

// post class
const Post = sequelize.define('Post', {
    postTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postContent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postDate: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Post'
});
User.sync({ alter: true})
export {
    User, Post, sequelize
}