const fs = require('fs');




module.exports  = function appendToStream(destStream, srcDir, srcFilesnames, index, success, failure) {
				    if (index < srcFilesnames.length) {
				        fs.createReadStream(srcDir + srcFilesnames[index])
				            .on("end", function() {
				                appendToStream(destStream, srcDir, srcFilesnames, index + 1, success, failure);
				            })
				            .on("error", function(error) {
				                console.error("Problem appending chunk! " + error);
				                destStream.end();
				                failure();
				            })
				            .pipe(destStream, {end: false})
				    }
				    else {
				        destStream.end();
				        success();
				    }
				}