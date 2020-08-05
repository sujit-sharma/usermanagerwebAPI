# usermanagerwebAPI

Introduction 

This is a web API that manages user along with members built on top of Nodejs, Express and MySQL. Allow  add, update, delete, along with authentication and authorization.
Uses JWT for authenticating user bcrypt for hashing password and UUID v4 for generating global unique id of user.

APIs info

1 ) Register or Signup
    Method = POST
    URL = http://localhost:8080/api/auth/signup

2 ) Login
    Method = POST
    URL = http://localhost:8080/api/auth/login

3 ) View User
    Method = GET
    URL = http://localhost:8080/api/user/:userId

4 ) Update User
    Method = PUT
    URL = http://localhost:8080/api/user/update/:userID

5 ) Add Member
    Method = PUT
    URL = http://localhost:8080/api/user/addmember/:userId

6 ) Update Member
    Method = PUT
    URL = http://localhost:8080/api/user/:userId/:memberId

7 ) Delete Member
    Method = DELETE
    URL = http://localhost:8080/api/user/:userId/:memberId

8 ) View All Member of User
    Method = GET
    URL = http://localhost:8080/api/user/members/:userId




Scope
The scope of project is, multiple users with you will be registering to the system as a user and you can add more members information and edit them. Members of another users are not allowed to view/edit.

Configurations
All settings are stored in /config directory which contains global configurations, development configurations and test configurations. To run this API  in your system you should provide your database URI, user and password.

config.dbname= 'yourdatabasename';
config.dbuser = 'databaseuser';
config.dbpassword = 'databasepassword';
config.dbhost ='127.0.0.1';
config.dbdialect = 'mysql';


Installation

Start your terminal
Clone the project with git pull https://github.com/sujitsharma1166/usermanagerwebAPI.git
Go to the project root directory cd usermanagerwebAPI
Hit npm install will install all the necessary packages for project
Set environment varialble. hit  NODE_ENV=development in your terminal
Enter node app.js or npm start and hit enter 

Now the project starts and you find indicated APIs when you hit with postman or front-end project. 





