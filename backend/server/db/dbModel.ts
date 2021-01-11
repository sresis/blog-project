
"use strict"

import { SequelizeScopeError } from "sequelize/types";

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
Users.sync({ alter: true})

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
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post'
});

Post.sync({ alter: true})
Users.hasMany(Post, {
    foreignKey: 'userID',
    sourceKey: 'id'
});
Post.belongsTo(Users, {foreignKey: 'userID',
targetKey: 'id'})
sequelize.sync();
export {
    Users, Post, sequelize
}