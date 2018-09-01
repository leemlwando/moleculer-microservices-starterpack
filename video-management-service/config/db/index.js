const mongodb = require('mongodb').Db;
const topology = require('mongodb').Server;
const bluebird = require('bluebird');
const server = new topology('127.0.0.1',27017)
server.on('connect',()=>{
    console.log('mongodb server connected..')
})

server.on('close',(err)=>{
    console.log('close',err)
})

server.on('commandFailed',(err)=>{
    console.log('commandFailed',err)
})

server.on('error',(err)=>{
    console.log(err)
})
const db = new mongodb('video-management-service',server,{promiseLibrary:bluebird});

db.on('fullSetup',(msg)=>console.log(msg))
db.on('error',(err)=>console.log(err))

module.exports = db;