
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

// Posts class
const Posts = sequelize.define('Posts', {
    PostTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PostContent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PostDate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Posts'
});

Posts.sync({ alter: true})
Users.hasMany(Posts, {
    foreignKey: 'userID',
    sourceKey: 'id'
});
// relations
Posts.belongsTo(Users, {foreignKey: 'userID',
targetKey: 'id'})
sequelize.sync();
export {
    Users, Posts, sequelize
}