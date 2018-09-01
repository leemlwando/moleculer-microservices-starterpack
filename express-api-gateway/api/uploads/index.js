module.exports = router=>{

    const request = require('request');
    const broker = require('../../index');
 
    router.get('/video/uploads',(req,res,next)=>{
        // broker.call('api.$node.services',{},{nodeID:'video-management-service'})
        res.send('video uploads')
    });

    router.post('/video/uploads',(req,res,next)=>{

       req.pipe(request.post('http://127.0.0.1:4500/api/video/uploads').on('response',(response)=>{
           
       switch(response.statusCode){
            case 200:
                return res.send({success:true});
                break;
            case 500:
                return res.send({success:false,status:500})
                break;
            default:
                return res.send({success:false, status:'other'})
       }
       
          
       }));
    });

    return router;
}