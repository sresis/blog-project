import { Model, Sequelize } from "sequelize/types";
import { User } from "./dbModel";
var model = require('./dbModel');


// create user account
function createAccount(username: string, password: string) {
    const user = User.create({username: username, password: password});
    console.log(user.username)
}

export {
    createAccount
}