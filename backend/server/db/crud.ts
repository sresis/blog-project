import { Model, Sequelize } from "sequelize/types";
import { Users } from "./dbModel";
var model = require('./dbModel');


// create user account
function createAccount(username: string, password: string) {
    // need to add validation to account for duplicate users?
    const user = model.Users.create({ username: username, password: password });
}

// get user by username
function getUserByUsername(username: string) {
    return Users.findAll({
        where: {
            username: username
        }
    });
}

export {
    createAccount,
    getUserByUsername
}