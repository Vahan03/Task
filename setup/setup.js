const colors = require('colors/safe');
const fs = require('fs');
const readline = require('readline-sync');


const settings = {
    mysqlDataBaseName:'',
    mysqlUserName:'',
    mysqlPassword: '',
    mongoDataBaseHost: '',
    mongoDataBaseName: '',
    mongoDataBaseUserName: '',
    mongoDataBasePassword: '',
    serverPort: '',
};


 console.log(colors.green('This is first time project setup'));
 console.log(colors.green('All setting can be changed in generated .env file after installation'));

const configureSettingsObject = (settings)=>{
    settings.mysqlDataBaseName = readline.question('Mysql Database Name (default: users) >>') || 'users';
    settings.mysqlUserName = readline.question('Mysql Database User Name (dafualt: root) >>') || 'root';
    settings.mysqlPassword = readline.question('Mysql database password (default: 123456) >>') || '123456';
    settings.mongoDataBaseHost = readline.question('Mongo Data Base Host (default: localhost:27017) >>') || 'localhost:27017';
    settings.mongoDataBaseName = readline.question('Mongo Data Base Name (default: userhistory) >>') || 'userhistory';
    settings.mongoDataBaseUserName = readline.question('Mongo DB Username (default: "") >>');
    settings.mongoDataBasePassword = readline.question('Mongo DB passowrd (default: "") >>');
    settings.tokenSecretKey = readline.question('Secret key for token generation (default: nexttimewework)') || 'lasttimewehope';
    settings.serverPort = readline.question('Port for server to run (default: 5000) >>') || 5000;
    
    console.log(colors.green('Configuration file will be saved with this settings'));
    console.log(settings);

    let finalAnswer = readline.question('Do you want to save this settings? yes/no >>');

    if(finalAnswer === 'yes'){
        const data = `
        MYSQL_DATABASE_NAME=${settings.mysqlDataBaseName}
        MYSQL_USER_NAME=${settings.mysqlUserName}
        MYSQL_PASSWORD=${settings.mysqlPassword}
        MONGO_DATABASE_HOST=${settings.mongoDataBaseHost}
        MONGO_DATABASE_NAME=${settings.mongoDataBaseName}
        MONGO_DATABASE_USER_NAME=${settings.mongoDataBaseUserName}
        MONGO_DATABASE_PASSWORD=${settings.mongoDataBasePassword}
        PORT=${settings.serverPort}
        SECRET_KEY=${settings.tokenSecretKey}`;
        if(fs.existsSync('../.env')){
            console.log('.env file found. File will be deleted and created again !');
            fs.unlinkSync('../.env');
        }
        fs.appendFileSync('../.env',data);
        console.log(colors.green('File saved succesfully'));
    }else{
        for(let x in settings){
            settings[x] = '';
        }
        configureSettingsObject(settings);
    }
}
 

configureSettingsObject(settings);