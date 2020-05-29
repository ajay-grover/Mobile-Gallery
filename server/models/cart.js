const mongoose=require('mongoose');

const cartschema = new mongoose.Schema({
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
    quantity:{
        type:Number,
        default:1
    }
});

module.exports = mongoose.model('cart', cartschema);