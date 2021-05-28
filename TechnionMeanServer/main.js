const express = require('express');
const usersRouter = require('./router/usersRouter');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

require('./config/database');
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/users', usersRouter);
app.listen(port, () => console.log('Listening on port 8080'));
