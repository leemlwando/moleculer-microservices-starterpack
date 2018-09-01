const express = require('express');
const {ServiceBroker} = require('moleculer');
const ApiService = require('moleculer-web');
const cors = require('cors');
const bodyParser = require('body-parser');
//load configuration
const {moleculer} = require('./config');



//create express app
const app = express();

//create broker
const broker = new ServiceBroker(moleculer.broker);

//create service
const svc = broker.createService(moleculer.svc);
//allow cross origin requests
app.use(cors())

// //pass json and raw files
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.raw());
//add moleculer service as express middleware
app.use('/api',svc.express());
const port = process.env.PORT || 4500
app.listen(port,'0.0.0.0',()=>console.log('express server started on port ', port))
broker.start().then(res=>console.log('video management service started..'))
        .catch(err=>console.log(err));