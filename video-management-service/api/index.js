const express = require('express');
const router = express.Router();




const routes = (router)=>{
   
    
     require('./uploads')(router);
           
    
    return router;
}


module.exports = routes(router);