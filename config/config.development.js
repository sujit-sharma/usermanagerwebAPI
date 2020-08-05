var config = require('./config.global');

config.env = 'devlopment';
config.hostname = 'dev.usermanagerwebapi';
config.hostIp = '127.0.0.1';
config.port = '8080';

//database configurations
config.dbname= 'usermanagerwebapi';

//config.dbuser = 'nodeuser';
//config.dbpassword = 'web@api';

config.dbuser = 'root';
config.dbpassword = 'Sujit@123#';

config.dbhost ='127.0.0.1';
config.dbdialect = 'mysql';

//jwt token security key
config.jwtsecuritykey = 'thebluebrownfoxjumpoverthelazydogissupersecuritykey';

module.exports = config;