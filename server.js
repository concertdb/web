// Simple server for Heroku deployment.
//@todo: harden server and configure for html5 mode
const path = require('path');
const express = require('express');

const app = express();
const port = (process.env.PORT || 8080);
const indexPath = path.join(__dirname, '/public/index.html');
const publicPath = express.static(path.join(__dirname, '/public'));

app.use('/public', publicPath);
app.all('/', function (_, res) { res.sendFile(indexPath) });
app.listen(port);
console.log('Listening at http://localhost:' + port);
