const { ServiceBroker } = require("moleculer");
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {moleculer} = require('./config');

//define port
const port = process.env.PORT || 4000;

//create express app
const app = express();
const broker = new ServiceBroker(moleculer.broker);
const router = express.Router();

//load services from file
broker.loadServices('./services')

const svc = broker.createService(moleculer.svc);
// const router = express.Router();

app.use(morgan('dev'))
app.use(cors());

//add moleculer as express middleware
app.use('/api',svc.express());



app.listen(port,()=>console.log('server started on port ', port));
// Start server

broker.start()
// console.log(broker)
