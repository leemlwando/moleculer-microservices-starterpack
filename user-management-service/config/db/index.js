const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const mongoose = require('mongoose');
const db = mongoose.connection;
//start database
const DbStart = ()=>{

    const adapter = new MongooseAdapter(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{useNewUrlParser:true})
    db.on('open',()=>console.log('database connected succesfully'))
    db.on('error',(err)=>{
        console.log('error: ', err)
        process.exit(1);
        
    })

 return adapter;
}

//





module.exports = {
    DbStart,
    models:require('./db.models')
}