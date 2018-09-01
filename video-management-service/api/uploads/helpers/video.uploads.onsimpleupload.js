    const moveUploadedFile = require('./video.uploads.moveuploadedfile');
    const failWithTooBigFile = require('./video.uploads.toobigfile');
    const isValid = require('./video.uploads.isvalid');

module.exports = function onSimpleUpload(fields, file, res) {
    const uuid = fields.qquuid,
        responseData = {
            success: false
        };

    file.name = fields.qqfilename;

    // console.log('fields',fields,'file',file);

    if (isValid(file.size)) {
        moveUploadedFile(file, uuid, function() {
                responseData.success = true;
                res.send(responseData);
            },
            function() {
                responseData.error = "Problem copying the file!";
                res.send(responseData);
            });
    }
    else {
        failWithTooBigFile(responseData, res);
    }
}