import React from 'react';
import {setinstorage} from './storage';
import {Redirect} from 'react-router-dom';

export default class Loginpage extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    state=
    {
        email:'',
        passowrd:'',
        loginmsg:'',
        loginstatus:false,
        token:''
    }
    getemail=(event)=>
    {
        const e=event.target.value;
        this.setState({
            email:e
        });
    }
    getpassword=(event)=>
    {
            const p=event.target.value;
            this.setState({
                password:p
            });
    }
    login=()=>
    {
        const{
            email,
            password
        }=this.state;
        fetch('http://localhost:9000/users/account/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:email,password:password})
  }).then(res=>res.json())
  .then(j=>{
    if(j.success){
      console.log(j); 
      alert("Login Successfull");
      this.setState({
        loginstatus:j.success,
        loginmsg:j.message,
        token:j.token
      });
    }
    else{
        alert(j.message);
    }
    });
    }
    render()
    {
        const{
            email,
            password,
            loginstatus,
            loginmsg,
            token
        }=this.state;
        setinstorage('account',{"token":token,"email":email});
        if(loginstatus)
        {
          
            return <Redirect to="/" />
        }
        return(

            <div className="container" style={{backgroundImage:"url('signup.jpg')"}}>
                <h2>LOGIN</h2><br />
                <input type="text" placeholder="Enter your Email ID:" value={email} onChange={this.getemail} className="form-control"/><br/>
                <input type="password" placeholder="Enter password:" value={password} onChange={this.getpassword} className="form-control"/><br/>
                <button onClick={this.login} className="btn btn-dark btn-lg btn-block">LOGIN</button>

                </div>
        )
    
    }
   
}