// Simple server for Heroku deployment.
//@todo: harden server and configure for html5 mode
const path = require('path');
const express = require('express');

const app = express();
const port = (process.env.PORT || 3000);

//Setup Portfolio
const portfolioIndexPath = path.join(__dirname, '/portfolio/index.html');
const portfolioPublicPath = express.static(path.join(__dirname, '/portfolio'));
app.use('/portfolio', portfolioPublicPath);
app.get('/portfolio',function (_, res) { res.sendFile(portfolioIndexPath); });

//Setup ConcertDb
const concertDbIndexPath = path.join(__dirname, '/public/index.html');
const publicPath = express.static(path.join(__dirname, '/public'));
app.use('/public', publicPath);
app.get('/concertdb',function (_, res) { res.sendFile(concertDbIndexPath); });

// catchall, routes to portfolio
app.all('/', function (_, res) { res.sendFile(portfolioIndexPath); });

//Start Server
app.listen(port);
console.log('Listening at http://localhost:' + port);
