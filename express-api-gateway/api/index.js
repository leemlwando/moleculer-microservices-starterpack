const express = require('express');
const router = express.Router();
const broker = require('../config')



const routes = (router)=>{
    
    
     require('./uploads')(router);
           
    
    return router;
}


module.exports = routes(router);