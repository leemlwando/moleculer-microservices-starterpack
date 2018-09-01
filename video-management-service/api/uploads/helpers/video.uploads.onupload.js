
    
    publicDir = process.env.PUBLIC_DIR || './'


   


   
    const fileInputName = process.env.FILE_INPUT_NAME || "qqfile"
    const onSimpleUpload = require('./video.uploads.onsimpleupload');
    const onChunkedUpload = require('./video.uploads.onchunkuploads');

    const multiparty = require('multiparty');

module.exports = function onUpload(req, res) {
    const form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        const partIndex = fields.qqpartindex;
    

        // text/plain is required to ensure support for IE9 and older
        res.set("Content-Type", "text/plain");

        if (partIndex == null) {
            onSimpleUpload(fields, files[fileInputName][0], res);
        }
        else {
            onChunkedUpload(fields, files[fileInputName][0], res);
        }
    });
}
