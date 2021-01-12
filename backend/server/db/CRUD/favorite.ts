import { Users, Posts, Favorites } from "../dbModel";
var model = require('../dbModel');
const { Sequelize, DataTypes } = require('sequelize-typescript');

function createFavorite(userID: number, postID: number) {
    const favorite = model.Favorites.create({ 
                            userID: userID,
                            postID: postID
                            });
}
//
function viewUserFavorites(userID: number) {
    return Favorites.findAll({
        where: {
            userID: userID
        },
        order: [['id', 'DESC']],
        include: [Users, Posts]
    })
}


export {
    createFavorite, viewUserFavorites
}