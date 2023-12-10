const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const passport = require('passport');
// Підключення Passport та його налаштування
require('./passport-config')(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Import routes
const adminsRouter = require('./routes/admins');
const seedsRouter = require('./routes/seeds');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/orders');

// Configs uses
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080'
}));
app.use(cookieParser());

// Use routes
app.use(orderRouter);
app.use(authRouter);
app.use(adminsRouter);
app.use(seedsRouter);

// Export
module.exports = app;