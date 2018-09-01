const mongodb = require('mongodb');
const Promise = require('bluebird');
const conn = mongodb.MongoClient.connect('mongodb://127.0.0.1:27017',{useNewUrlParser:true})


const db = Promise.resolve(conn)
                .then(client=>{
                        return client.db('video-management-service');
                    }).then(dbd=>{
                        let movies = new mongodb.GridFSBucket(dbd,{bucketName:'movies'});
                        let music = new mongodb.GridFSBucket(dbd,{bucketName:'music'});
                        let other = new mongodb.GridFSBucket(dbd,{bucketName:'other'});
                        return {movies,music,other};
                    })
                    .catch(err=>{return err});

module.exports = db;