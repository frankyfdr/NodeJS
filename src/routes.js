const express = require("express");
const routes = express.Router();
const axios = require("axios");
const fs = require("fs");
const UserController = require('./controllers/UserController');
const SymController = require('./controllers/SymController');




routes.post("/users", UserController.index);
routes.post("/signup", UserController.store);
routes.post("/login", UserController.login);
routes.put("/update", UserController.update);
routes.post("/auth", UserController.auth);



module.exports = routes;    

/*
 User.create({ 
        username: 'frankyfdr',
        password: '123',
        name: 'franky',
        email: 'frankyfdr@gmail.com'
        */
