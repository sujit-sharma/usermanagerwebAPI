var config = require('./config.global');

config.env = 'test';
config.hostname = 'dev.usermanagerwebapi';
config.hostIp = '127.0.0.1';

//database configurations
config.dbname= 'yourdatabasename';

//config.dbuser = 'nodeuser';
//config.dbpassword = 'web@api';

config.dbuser = 'databaseuser';
config.dbpassword = 'databasepassword';

config.dbhost ='127.0.0.1';
config.dbdialect = 'mssql';

//jwt token security key
config.jwtsecuritykey = 'tyourjwtsecuritykey';

module.exports = config;