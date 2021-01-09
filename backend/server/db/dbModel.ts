
const { Sequelize, DataTypes } = require('sequelize-typescript');
require('dotenv').config();


const sequelize = new Sequelize('blog', 'vagrant', '', {
  host: "localhost", //your server
  dialect: 'postgres'
});

const { SERVER_PORT } = process.env;
sequelize
.authenticate()
.then(() => console.log(`Server and DB running at port ${SERVER_PORT}`))
.catch((err: Error) => console.log('Connection Failed', err))

// user class
const User = sequelize.define('User', {
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
    User, Post
}