const express = require('express');
const cors = require('cors');
// const Joi = require('joi');
const config = require('config');
const morgan = require('morgan');
const debugDB = require('debug')('app:Db');
const CustomerRoutes = require('./routes/CustomerRoutes');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const UserRoutes = require('./routes/UserRoutes');
const HomeRoutes = require('./routes/HomeRoutes');
const SaeedForbiddenAuth = require('./http/middleware/SaeedForbiddenAuth');
const mongoose = require('mongoose');
const Error_middleware = require('./http/middleware/Error_middleware');
const app = express();
// const Customer = require("./models/CustomerModel")

class Application {
  constructor() {
    this.setupExpressServer();
    this.setupMongoose();
    this.setupRoutesAndMiddlewares();
    this.setupConfigs();

  }
  setupRoutesAndMiddlewares() {
    // built-in middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    if (app.get('env') === 'production') app.use(morgan('tiny'));
    // third-party middleware
    app.use(cors());

    // my middleware
    app.use(SaeedForbiddenAuth);

    //routes
    app.use(CustomerRoutes);
    app.use(UserRoutes);
    app.use(HomeRoutes);

    app.use(Error_middleware)

  }

  setupConfigs() {
    winston.add(new winston.transports.File({ filename: "error-log.log" }));
    winston.add(new winston.transports.MongoDB({
      db: "mongodb://127.0.0.1:27017/customers",
      level: "error"
    }));


    process.on('uncaughtException', (err) => {
      console.log(err);
      winston.error(err.message);
    })

    process.on('unhandledRejection', (err) => {
      console.log(err);
      winston.error(err.message);
    })
    // db ...
    debugDB('db initialized');

    app.set('view engine', 'pug');
    app.set('views', './views'); // default

  }

  setupMongoose() {
    mongoose
      .connect('mongodb://127.0.0.1:27017/customers',
        { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('db connected');
        winston.info('db connected')
      })
      .catch((err) => {
        console.error('db not connected', err);
      });

  }

  setupExpressServer() {
    const port = process.env.myPort || 3000;
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log(`app listen to port ${port}`);
    });
  }
}


module.exports = Application;