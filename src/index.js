const express = require('express');
const basicAuth = require('express-basic-auth');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(basicAuth({
    users: { "Paula": "74ccfc6e39eee939e818625ed419550c50d51865" }
}));

app.use(routes);

const port = 3333;

app.listen(port, () => {
    console.log('Listen on http://localhost:' + port + '/');
});