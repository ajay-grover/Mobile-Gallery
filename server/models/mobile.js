const mongoose = require('mongoose');

const mobileschema = new mongoose.Schema({

    mobilename:{
        type:String,
        default:''
    },
    mobilespecs:{
        type:String,
        default:''
    },
    mobileprice:{
        type:Number,
        default:0
    },
    mobileimage:{
        type:String,
        default:''
    },
    ispresent:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('mobile' , mobileschema);