import { Users, Posts, Favorites } from "../dbModel";
var model = require('../dbModel');
const { Sequelize, DataTypes } = require('sequelize-typescript');

function createFavorite(userID: number, postID: number) {
    const favorite = model.Favorites.create({ 
                            userID: userID,
                            postID: postID
                            });
}


export {
    createFavorite
}