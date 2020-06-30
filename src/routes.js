const express = require('express');
const Users = require('./Model/Users');

const routes = express.Router();

routes.get("/hello", (req, res) => {return res.json({h:"hello"});});

const user = new Users();
routes.get("/users", user.index);
routes.post("/users", user.create);
routes.post("/login", user.login);

module.exports = routes;