module.exports = router =>{
    const {onUpload} = require('./helpers');
    router.get('/video/uploads',(re,res,next)=>res.send('get video'));
    router.post('/video/uploads',onUpload);
    // router.post('/video/uploads',require('./helpers'));
    return router;
}