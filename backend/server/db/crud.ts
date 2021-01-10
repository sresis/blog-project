import { Model, Sequelize } from "sequelize/types";
import { Users } from "./dbModel";
var model = require('./dbModel');


// create user account
function createAccount(username: string, password: string) {
    const user = model.Users.create({ username: username, password: password });
    console.log("User's auto-generated ID", user.id )
}

// get users
function getUsers() {
    return Users.findAll();
}

export {
    createAccount,
    getUsers
}