"use strict"

const { Sequelize, DataTypes } = require('sequelize-typescript');
require('dotenv').config();


const sequelize = new Sequelize(
    'blog', 'stephanieresis', '', 
    {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
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
        allowNull: true
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

// Favorites class
const Favorites = sequelize.define('Favorites', {
    postID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Favorites'
});

Favorites.sync({ alter: true})

// relations
// 1 User : Many Posts
Users.hasMany(Posts, {
    foreignKey: 'userID',
    sourceKey: 'id'
});
Posts.belongsTo(Users, {foreignKey: 'userID',
targetKey: 'id'})
sequelize.sync();
// 1 User: Many Favorites
Users.hasMany(Favorites, {
    foreignKey: 'userID',
    sourceKey: 'id'
});
Favorites.belongsTo(Users, {foreignKey: 'userID',
targetKey: 'id'})
sequelize.sync();
// 1 Post: Many Favorites
Posts.hasMany(Favorites, {
    foreignKey: 'postID',
    sourceKey: 'id',
    onDelete: 'cascade' // handle cascading deletes
});
Favorites.belongsTo(Posts, {foreignKey: 'postID',
targetKey: 'id'})
sequelize.sync();

export {
    Users, Posts, Favorites, sequelize
}