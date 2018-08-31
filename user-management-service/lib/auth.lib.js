//import database
const {models} = require('../config/db');
const jwt = require('jsonwebtoken');

const confirmUser = (params,self)=>{
  return (err,data)=>{
        if(err){
            console.log(err)
            return {err:true,err};
        }
        console.log('data',data)
    return self.adapter.findOne({email:data.email},function(err,user){
        if(err){
            console.log(err)
            return {err:true,err}
        }
        console.log(user)
        if(!user){return console.log('could not find user with that email')};

        if(data.email.toString() === user.email.toString() && user.confirmedMember !== true){
                user.confirmedMember = true;

                return user.save(function(err){
                            if(err){return console.log(err)};
                            return user;
                        });
                }else if(data.email.toString() === user.email.toString() && user.confirmedMember === true ){
                    return user;
                }else{
                    return user;
                }

            });
    };
};


const login = (params)=>{

}



module.exports = {
    // register,
    login,
    confirmUser
}