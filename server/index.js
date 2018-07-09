'use strict';


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cassandra = require('cassandra-driver');


// Cassandra database config/
const dbConfig = {
  contactPoints: ['127.0.0.1'],
  keyspace: 'demo'
};

const connection = new cassandra.Client(dbConfig);

connection.connect(function (err, result) {
  console.log('cassandra connected');
});

const { PORT, CLIENT_ORIGIN } = require('./config');
const {ethprices} = require('./ethprices.json');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// const fs = require('fs');
// const websocket = require('websocket').w3cwebsocket;
// const client = new websocket('wss://ws-feed.gdax.com', 'echo-protocol');
// const subscription = require('./subscribe.json');

// let TRADES = 0;
// let PRICE = 0;

// client.onerror = function () { console.log('{!} connection error.'); };
// client.onclose = function () { console.log('{!} connection closed.'); };
// client.onopen = function () {
//   console.log('{!} sending subscription.');
//   client.send(JSON.stringify(subscription));
//   console.log('{!} client connected.');

//   setInterval(() => {
//     process.stdout.clearLine();  // clear current text
//     process.stdout.cursorTo(0);  // move cursor to beginning of line
//     process.stdout.write(`{session} live-price: ${PRICE.toFixed(2)} trades: ${TRADES}`);
//   }, 4000);

// };

// client.onmessage = function (request) {
//   let response = JSON.parse(request.data);
//   if (response.type === 'ticker' && response.trade_id != undefined) {
//     TRADES++;
//     PRICE = parseInt(response.price);
//     fs.appendFile('ethprices.json', `{ "price": ${response.price}},`);
//   }
// };

app.get('/locations', function (req, res) {
  const data = {
    'error': null,
    'state': '',
  };
  const select = 'SELECT * from location';
  connection.execute(select, function (err, rows) {
    if (rows.length != 0) {
      data['error'] = 0;
      data['data'] = rows;
      res.json(data);
    } else {
      data['data'] = 'No data Found..';
      res.json(data);
    }
  });
});


// app.get('/eth', (req, res) => {
//   res.json({ ethprices });
// });

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  runServer();
}

module.exports = { app };
