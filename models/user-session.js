const mongoose=require('mongoose');

const usersessionschema=new mongoose.Schema({
    userid:{
        type:String,
        default:''
    },
    isdeleted:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('usersession',usersessionschema);