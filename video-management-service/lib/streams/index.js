const fs = require('fs');
const rimraf = require('rimraf');
module.exports = (sourceFile,sourceDir,filename, bucket)=>{

    return fs.createReadStream(sourceFile).pipe(bucket.openUploadStream(filename[0])).on('finish',()=>{
        //delete folder
       return rimraf(sourceDir,(err)=>{
            if(err)throw err;
            console.log('temp dir deleted');
        })
    })
}