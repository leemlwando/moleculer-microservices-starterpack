	const moveFile = require('./video.uploads.movefile');
	const getChunkFilename = require('./video.uploads.getchunkfilename');

	const path = require('path')

	const uploadedFilesPath = process.env.UPLOADED_FILES_DIR || path.resolve(__dirname,'../../video.uploads/')
    const chunkDirName = "chunks"


module.exports = function storeChunk(file, uuid, index, numChunks, success, failure) {
			    const destinationDir = uploadedFilesPath + "/"+ uuid + "/" + chunkDirName + "/",
			        chunkFilename = getChunkFilename(index, numChunks),
			        fileDestination = destinationDir + chunkFilename;

			    moveFile(destinationDir, file.path, fileDestination, success, failure);
			}