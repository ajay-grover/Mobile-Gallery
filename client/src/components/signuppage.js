import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Signuppage extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    state=
    {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        signupstatus:false,
        signupmsg:''
    } 
    getfn=(event)=>
    {
        const fn=event.target.value;
        this.setState({
                firstname:fn
        });
    }
    getln=(event)=>
    {
            const ln=event.target.value;
            this.setState({
                lastname:ln
            });
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
    signup=()=>
    {
        const{
            firstname,
            lastname,
            email,
            password
        }=this.state;
        fetch('http://localhost:9000/users/account/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({firstName:firstname,lastName:lastname,email:email,password:password})
  }).then(res=>res.json())
  .then(j=>{
    if(j.success){
      console.log(j); 
      alert("Successfully registered");
      this.setState({
      
        signupstatus:j.success,
        signupmsg:j.message
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
            firstname,
            lastname,
            email,
            password,
            signupstatus,
            signupmsg
        }=this.state;
        if(signupstatus)
        {
           
               return <Redirect to="/login" />
        }
        return(
            <div className="container">
                <h2>SIGN UP</h2><br />
                <input type="text" placeholder="Enter your First Name:" value={firstname} onChange={this.getfn} className="form-control"/><br/>
                <input type="text" placeholder="Enter your Last Name:" value={lastname} onChange={this.getln} className="form-control"/><br/>
                <input type="email" placeholder="Enter your Email ID:" value={email} onChange={this.getemail} className="form-control"/><br/>
                <input type="password" placeholder="Enter password:" value={password} onChange={this.getpassword} className="form-control"/><br/>
                <button onClick={this.signup} className="btn btn-dark btn-lg btn-block">SIGN UP</button>
                {console.log(signupstatus)}
               
            
              
       
                </div>
        )
    }
  

}