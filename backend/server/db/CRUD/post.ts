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
// update the post content
function updatePost(id: number, postContent: string) {

    Posts.update(
        {postContent: postContent},
        {returning: true, where: {id: id} }
      )
}
// show all posts made by current user
function showUserPosts(userID: number) {
    console.log(userID);
    console.log('test');
    return Posts.findAll({
        where: {
            userID: userID
        },
        order: [['id', 'DESC']],
    })
}
// get post info
function getPostInfo(id: number) {
    return Posts.findAll({
        where: {
            id: id
        },
        attributes: ['postTitle', 'postContent', 'postDate', 'userID', 'id']
    })
}
// show all posts containing search term in title
function searchPostTitle(searchTerm: string) {
    console.log('attempt')
    return Posts.findAll({
        where: {
            postTitle: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('postTitle')), 'LIKE', '%' + searchTerm + '%')
        },
        include: [Users],
        order: [['id', 'DESC']],        
    })
}
// delete a post
function deletePost(id: number) {
    Posts.destroy({
        where: {
            id: id
        }
    })
}
// show details on all posts
function showAllPosts() {
    return Posts.findAll({
        attributes: ['postTitle', 'postContent', 'postDate', 'userID', 'id']
      })

}
export { createPost, updatePost, showAllPosts, showUserPosts, deletePost, searchPostTitle, getPostInfo }