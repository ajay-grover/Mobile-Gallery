const user=require('../models/user');
const usersession=require('../models/user-session');
var express = require('express');

var app=express();

  app.post('/account/signup',(req,res,next)=>{
    console.log('post');
    const{
      firstName,
      lastName,
      email,
      password
    }=req.body;

    if(!firstName)
    {
      return res.send({
          success:false,
          message:'Error:first name cannot be blank.'
      });
    }

    if(!lastName)
    {
      return res.send({
          success:false,
          message:'Error:last name cannot be blank.'
      });
    }

    if(!email)
    {
      return res.send({
          success:false,
          message:'Error:email cannot be blank.'
      });
    }

    if(!password)
    {
      return res.send({
          success:false,
          message:'Error:password cannot be blank.'
      });
    }
    if(password.length<8)
    {
      return res.send({
        success:false,
        message:'Error:password too short.'
    });
    }

    user.find({email:email},(err,previoususer)=>{
        if(err)
        {
          return res.send({
            success:false,
            message:'Error:password cannot be blank.'
        });
        }
        else if(previoususer.length>0)
        {
          return res.send({
            success:true,
            message:'Account already exist'
        });
        }
        const newuser=new user();
        newuser.firstName=firstName;
        newuser.lastName=lastName;
        newuser.email=email;
        newuser.password=password;
        newuser.save((err,user)=>{
          if(err)
          {
            return res.send({
              success:false,
              message:'Error:server error.'
          });
          }
          return res.send(
            {
              success:true,
              message:'Signed Up'
            }
          );
        });
    });
  });

  app.post('/account/login',(req,res,nex)=>{
      const{
        email,
        password
      }=req.body;
      if(!email)
      {
        return res.send({
            success:false,
            message:'Error:email cannot be blank.'
        });
      }
      if(!password)
      {
        return res.send({
          success:false,
          message:'Error: password cannot be blank'
        });
      }
      user.find({email:email,password:password},(err,users)=>{
            if(err)
            {
              return res.send({
                  success:false,
                  message:'Error: server error'
              });
            }
            if(users.length!=1)
            {
              return res.send({
                success:false,
                message:'Error:Account Not found'
      });
    }
    const user=users[0];
    const newusersession=new usersession();
    newusersession.userid=user._id;
    newusersession.save((err,docs)=>{
        if(err)
        {
          return res.send({
            success:false,
            message:'Error: server error'
        });
        }
        return res.send({
          success:true,
          message:'valid login',
          token:user._id
        });
    });
  });
});
app.get('/account/verify',(req,res,next)=>{
    const{token}=req.query;
    console.log(token);
    usersession.find({userid:token,isdeleted:false},(err,sessions)=>{
      console.log(sessions);
      if(err)
      {
        return res.send({
          success:false,
          message:'Error:server error'
        });
      }
      if(sessions.length!=1)
      {
        return res.send({
          success:false,
          message:'Error:Invalid'
        });
      }
      return res.send({
        success:true,
        message:'good'
      });
    })
});
app.get('/account/logout',(req,res,next)=>{
  const{token}=req.query;
  console.log(token);
  usersession.findOneAndUpdate({userid:token,isdeleted:false},{$set:{isdeleted:true}},null,(err,sessions)=>{
    console.log(sessions);
    if(err)
    {
      return res.send({
        success:false,
        message:'Error:server error'
      });
    }
    usersession.deleteOne({userid:token,isdeleted:true},(err)=>{
      if(err)
      {
        return res.send({
          success:false,
          message:'Error:server error'
        });
      }
      return res.send({
        success:true,
        message:'good'
    });
   
    });
  });
  
});
  module.exports = app;
