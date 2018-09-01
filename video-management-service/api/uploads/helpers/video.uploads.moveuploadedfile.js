	// const uploadedFilesPath = 
	const path = require('path')
	const uploadedFilesPath = process.env.UPLOADED_FILES_DIR || path.resolve(__dirname,'../../video.uploads/')
	
module.exports = function moveUploadedFile(file, uuid, success, failure) {
	    var destinationDir = uploadedFilesPath + uuid + "/",
	        fileDestination = destinationDir + file.name;

	    moveFile(destinationDir, file.path, fileDestination, success, failure);
	}