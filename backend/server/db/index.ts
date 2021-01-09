
const { Sequelize } = require('sequelize-typescript');
require('dotenv').config();


const sequelize = new Sequelize('blog', 'vagrant', '', {
  host: "localhost", //your server
  dialect: 'postgres'
});
export default sequelize;