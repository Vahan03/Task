const Sequelize = require('sequelize');
const mysql = require('mysql');
const {MYSQL_DATABASE_NAME, MYSQL_USER_NAME, MYSQL_PASSWORD} = require('../../constants/constants.js');


const connection=new Sequelize(MYSQL_DATABASE_NAME, MYSQL_USER_NAME, MYSQL_PASSWORD,{
  dialect:'mysql',
 })
 //Global referance to Mysql Connection
 
  connection.sync();

  module.exports={
    connection,Sequelize
  }

  