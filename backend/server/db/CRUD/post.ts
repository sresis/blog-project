import { Users, Posts } from "../dbModel";
var model = require('../dbModel');

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
    return Posts.findAll();

}
export { createPost, updatePost, showAllPosts }