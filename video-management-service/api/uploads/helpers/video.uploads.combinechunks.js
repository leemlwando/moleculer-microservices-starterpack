	const appendToStream = require('./video.uploads.appendtostream');
	const fs = require('fs');
	const rimraf = require('rimraf');
	const path = require('path');

	const uploadedFilesPath = process.env.UPLOADED_FILES_DIR || path.resolve(__dirname,'../../video.uploads/')
    const chunkDirName = "chunks"

   

module.exports = 
				function combineChunks(file, uuid, success, failure) {
				    let chunksDir = uploadedFilesPath + "/" + uuid + "/" + chunkDirName + "/",
				        destinationDir = uploadedFilesPath + "/" + uuid + "/",
				        fileDestination = destinationDir + file.name;

				      let filename = file.name

				    fs.readdir(chunksDir, function(err, fileNames) {
				        let destFileStream;

				        if (err) {
				            console.error("Problem listing chunks! " + err);
				            failure();
				        }
				        else {
				            fileNames.sort();
				            destFileStream = fs.createWriteStream(fileDestination, {flags: "a"});

				            appendToStream(destFileStream, chunksDir, fileNames, 0, async function() {
				                rimraf(chunksDir, function(rimrafError) {
				                    if (rimrafError) {
				                        console.log("Problem deleting chunks dir! " + rimrafError);
				                    }
				                });

				                


				                		

				                	

				                

				                
				                success(fileDestination,path.resolve(__dirname,destinationDir),filename);
				            },
				            failure);
				        }
				    });
				}