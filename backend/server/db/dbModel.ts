
"use strict";
const { Sequelize, DataTypes } = require('sequelize-typescript');
require('dotenv').config();


const sequelize = new Sequelize(
    'blog', 'stephanieresis', '', 
    {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false
    sync: true 

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
const Users = sequelize.define('Users', {
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
    modelName: 'Users'
});
Users.sync({ alter: false})

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
console.log(Users === sequelize.models.Users);

Post.sync({ alter: false})
export {
    Users, Post, sequelize
}