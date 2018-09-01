const combineChunks = require('./video.uploads.combinechunks');
const storeChunk = require('./video.uploads.storechunk');
const failWithTooBigFile = require('./video.uploads.toobigfile');
const isValid = require('./video.uploads.isvalid');

const uploadedFilesPath = process.env.UPLOADED_FILES_DIR
const  chunkDirName = "chunks"

//import gridfs handler
const {buckets} = require('../../../lib');
const fs  = require('fs');
const {stream} = require('../../../lib');
module.exports = function onChunkedUpload(fields, file, res) {
    const size = parseInt(fields.qqtotalfilesize),
        uuid = fields.qquuid,
        index = fields.qqpartindex,
        totalParts = parseInt(fields.qqtotalparts),
        responseData = {
            success: false
        };

    file.name = fields.qqfilename;

    //  console.log('fields',fields,'file',file);
    console.log('recieved chunk')

    if (isValid(size)) {
        storeChunk(file, uuid, index, totalParts, function() {
            if (index < totalParts - 1) {
                responseData.success = true;
                res.send(responseData);
            }
            else {
                combineChunks(file, uuid,function(file,dir,filename){
                  
                        responseData.success = true
                            buckets
                                .then(streams=>{
                                    
                                    const {movies,music,other} = streams;
                                    
                                   return stream(file,dir,filename,movies);
                                  
                                }).then(done=>{
                                    return  res.send(responseData)
                                })
                                .catch(err=>{
                                    console.log(err)
                                    return  res.send(responseData)
                                    })
                        
                    },
                    function() {
                        responseData.error = "Problem combining the chunks!";
                        res.send(responseData);
                    });
            }
        },
        function(reset) {
            responseData.error = "Problem storing the chunk!";
            res.send(responseData);
        });
    }
    else {
        failWithTooBigFile(responseData, res);
    }
}