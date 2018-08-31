const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    otherNames:[],
    email:{type:String,required:true,unique:true},
    password:{type:String,require:true},
    confirmedMember:{type:Boolean,default:false}
    // avatar:{type:Schema.Types.ObjectId, ref:'images'}
})

UserSchema.methods.confirmedToken = function(token){

    if(this.email.toString() === token.email.toString() ){
        return true
    }

    return false
} 



const User = mongoose.model('Users',UserSchema);

module.exports = {User};