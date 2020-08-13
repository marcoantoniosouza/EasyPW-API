const express = require('express');
const basicAuth = require('express-basic-auth');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(basicAuth({
    users: JSON.parse(process.env.basicAuth)
}));

app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log('Listen on http://localhost:' + port + '/');
});