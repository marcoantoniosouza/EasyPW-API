const express = require('express');
const Users = require('./Model/Users');
const Passes = require('./Model/Passes');

const routes = express.Router();

routes.get("/hello", (req, res) => {return res.json({h:"hello"});});

const user = new Users();
routes.get ("/users", user.index);
routes.post("/users", user.create);
routes.post("/login", user.login);

const pass = new Passes();
routes.get ("/passes", pass.index);
routes.post("/passes", pass.create);
routes.put ("/passes", pass.update);

module.exports = routes;