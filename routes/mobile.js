var express = require('express');
var mobile = require('../models/mobile');
var multer = require('multer');
var cart=require('../models/cart');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname);
    }
});

const upload=multer({
    storage:storage
});

var app=express();
app.post('/upload',upload.single('mobileimage'),(req,res,next)=>{
    console.log(req.file);
        const{
            mobilename,
            mobilespecs,
            mobileprice
        }= req.body;
        const filename=req.file.filename;
        mobile.find({mobilename:mobilename},(err,data)=>{
                if(err)
                {
                    return res.send({
                            success:false,
                            message:'Error:server error'
                    });
                }
                else if(data.length>0)
                {
                    return res.send({
                        success:true,
                        message:'Mobile phone already exist',
                        filename:filename
                    });
                }
               
        const newmobile = new mobile();
        newmobile.mobilename=mobilename;
        newmobile.mobilespecs=mobilespecs;
        newmobile.mobileprice=mobileprice;
        newmobile.mobileimage=req.file.originalname;

        newmobile.save((err,mobile)=>{
                if(err)
                {
                    return res.send({
                        success:false,
                        message:'Error:server error'
                    });
                }
                return res.send({
                        success:true,
                        message:'Mobile phone uploaded successfully',
                        filename:filename
                });
        });
                   

                

        });

       
});

app.get('/getall',(req,res,next)=>{

    mobile.find({},(err,value)=>{
        if(err)
        {
            return res.send({
                success:false,
                message:'Error:server error'

            });
        }
        return res.send(value);
    })
});

app.post('/addtocart',(req,res,next)=>{
    const{
        mobilename,
        mobilespecs,
        mobileprice,
        mobileimage,
        quantity
    }=req.body;

    cart.findOneAndUpdate({mobilename:mobilename},{$set:{quantity:quantity+1}},null,(err,docs)=>{
        if(err)
        {
            return res.send({
                    success:false,
                    message:'Error:server error'
            });
        }
        else if(docs==null)
        {
            const newcart=new cart();
            newcart.mobilename=mobilename;
            newcart.mobilespecs=mobilespecs;
            newcart.mobileprice=mobileprice;
            newcart.mobileimage=mobileimage;
            newcart.quantity=quantity;
                newcart.save((err,docs)=>{
                    if(err)
                    {
                        return res.send({
                            success:false,
                            message:'Error:server error'
                    });
                    }
                    return res.send({
                        succes:true,
                        message:'Mobile phone added to cart'
                    });
                });
        }
        else
        {
           
            return res.send({
                success:true,
                message:'Mobile phone already there in cart'
            });
        }
    });
});

app.get('/getcart',(req,res,next)=>{
        cart.find({},(err,docs)=>{
            if(err)
            {
                return res.send({
                    success:false,
                    message:'Error:server error'
                });
            }
            return res.send(docs);
        });
});

app.get('/cart/delete',(req,res,next)=>{
    const{
        mobilename
    }=req.query;
    cart.deleteOne({mobilename:mobilename},(err,docs)=>{
        if(err)
        {
            return res.send({
                success:false,
                message:'Error:server error'
            });
        }
        return res.send({
            success:true,
            message:'deleted'
        });
    });
});

app.get('/cart/add',(req,res,next)=>{
    const{
        mobilename,
        quantity
    }=req.query;
    cart.findOneAndUpdate({mobilename:mobilename},{$set:{quantity:parseInt(quantity,10)+1}},null,(err,docs)=>{
        if(err)
        {
            return res.send({
                success:false,
                message:'Error:server error'
            });
        }
        return res.send({
            success:true,
            message:'deleted'
        });
    });
});

app.get('/cart/sub',(req,res,next)=>{
    const{
        mobilename,
        quantity
    }=req.query;
    if(quantity>1)
    {
        cart.findOneAndUpdate({mobilename:mobilename},{$set:{quantity:parseInt(quantity,10)-1}},null,(err,docs)=>{
            if(err)
            {
                return res.send({
                    success:false,
                    message:'Error:server error'
                });
            }
            return res.send({
                success:true,
                message:'deleted'
            });
        });
    }
   
});

module.exports = app;