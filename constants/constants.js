require('dotenv').config();

const {
        MYSQL_DATABASE_NAME,
        MYSQL_USER_NAME,
        MYSQL_PASSWORD,
        MONGO_DATABASE_HOST,
        MONGO_DATABASE_NAME,
        MONGO_DATABASE_USER_NAME,
        MONGO_DATABASE_PASSWORD,
        PORT,
        SECRET_KEY,
} = process.env;

module.exports = {
        MYSQL_DATABASE_NAME,
        MYSQL_USER_NAME,
        MYSQL_PASSWORD,
        MONGO_DATABASE_HOST,
        MONGO_DATABASE_NAME,
        MONGO_DATABASE_USER_NAME,
        MONGO_DATABASE_PASSWORD,
        PORT,
        SECRET_KEY,
}

