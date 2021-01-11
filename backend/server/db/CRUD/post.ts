import { Users, Posts } from "../dbModel";
var model = require('../dbModel');
const { Sequelize, DataTypes } = require('sequelize-typescript');

// create post
// only show option to post if logged in
function createPost(postTitle: string, postContent: string, postDate: string, userID: number) {
    const user = model.Posts.create({ 
                            postTitle: postTitle,
                            postContent: postContent,
                            postDate: postDate,
                            userID: userID
                            });
}
function updatePost() {

}
function showAllPosts() {
    // make instance then make array of it
    return Posts.findAll({
        attributes: ['postTitle', 'postContent', 'postDate', 'userID']
      })
 

}
export { createPost, updatePost, showAllPosts }