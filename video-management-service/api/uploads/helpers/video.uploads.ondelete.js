	const rimraf = require('rimraf');
	const uploadedFilesPath = 

module.exports = function onDeleteFile(req, res) {
			    const uuid = req.params.uuid;
			     const dirToDelete = uploadedFilesPath + uuid;

			    rimraf(dirToDelete, function(error) {
			        if (error) {
			            console.error("Problem deleting file! " + error);
			            res.status(500);
			        }

			        res.send();
			    });
			}