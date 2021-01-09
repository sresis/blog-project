
const { Sequelize } = require('sequelize-typescript');
require('dotenv').config();


const sequelize = new Sequelize('blog', 'vagrant', '', {
  host: "localhost", //your server
  dialect: 'postgres'
});
const models = {
  User: sequelize.import('./models/user'),
  Post: sequelize.import('./models/post')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
export { sequelize };
export default models;