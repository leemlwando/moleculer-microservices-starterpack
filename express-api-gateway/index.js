const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 3000;
//create express app
const app = express();
const broker = new ServiceBroker({
    namespace: "",
	nodeID: "express-api-gateway",
	
	logger: true,
	logLevel: "info",
	logFormatter: "default",
	logObjectPrinter: null,

	transporter: "Redis",

	cacher: "Redis",

	serializer: "JSON",

	requestTimeout: 10 * 1000,
	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: err => err && !!err.retryable
	},

	maxCallLevel: 100,
	heartbeatInterval: 5,
	heartbeatTimeout: 15,

	tracking: {
		enabled: false,
		shutdownTimeout: 5000,
	},

	disableBalancer: false,

	registry: {
		strategy: "RoundRobin",
		preferLocal: true
	},

	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		windowTime: 60,
		minRequestCount: 20,
		halfOpenTime: 10 * 1000,
		check: err => err && err.code >= 500
	},

	bulkhead: {
		enabled: false,
		concurrency: 10,
		maxQueueSize: 100,
	},

	validation: true,
	validator: null,

	metrics: false,
	metricsRate: 1,

	internalServices: true,
	internalMiddlewares: true,

	hotReload: false,

	// Register custom middlewares
	middlewares: [],

	// Called after broker created.
	created(broker) {
		
	},

	// Called after broker starte.
	started(broker) {
		return this.db
	},

	// Called after broker stopped.
	stopped(broker) {

	},

	replCommands: null
});
const router = express.Router();
// Load API Gateway
router.post('/v1/video-uploads',(req,res,next)=>res.send({success:true}));
router.get('/hello',(req,res,next)=>{res.send('hello')})
router.get('/hi',(req,res,next)=>{res.send('hi')})
router.get('/yes',(req,res,next)=>{res.send('no')})
// app.use('/hello',router)
//load services
broker.loadServices('./services')
const svc = broker.createService({
    mixins: [ApiService],
    

    settings: {
        
        middleware: true,
        use: [
           router
        ],
    }
});
// const router = express.Router();

app.use(morgan('dev'))
app.use(cors());
// console.log(svc.express())
app.use('/api',svc.express());
// app.use('/api',router);


app.listen(port,()=>console.log('server started on port ', port));
// Start server
broker.start()