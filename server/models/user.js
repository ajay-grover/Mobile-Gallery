const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
});



module.exports = mongoose.model('user',userschema);