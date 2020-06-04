import React from 'react';
import Loginpage from './components/loginpage';
import Signuppage from './components/signuppage';
import Addproductpage from './components/addproductpage';
import Cart from './components/cart';
import Home from './components/home';
import Background from './components/background';
import {Navbar,
        Navbar1} from './components/navbar';

import{
    getfromstorage  
} from './components/storage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
  constructor(props)
  {
    super(props);
  }
  state=
  {
    isloading:true,
    token:'',
    email:''
  }
  logout=()=>
  {
    const obj=getfromstorage('account');
    console.log(obj.token);
   
    if(obj.token)
    {
      console.log('logout');
        fetch('http://localhost:9000/users/account/logout?token='+obj.token).then(res=>res.json())
        .then(json=>{
          if(json.success){
            console.log(json);
            this.setState({
              token:'',
              isloading:false
            });
          }
          else{
            this.setState({
              isloading:false
            })
          }
        });
    }
    else{
      this.setState({
          isloading:false,
      });
    }
  }
  componentDidMount(){
    
    const obj=getfromstorage('account');
    //console.log(obj.token);
   
    if(obj)
    {
      if(obj.token)
      {
      console.log('1111');
        fetch('http://localhost:9000/users/account/verify?token='+obj.token).then(res=>res.json())
        .then(json=>{
          if(json.success){
            console.log(json);
            this.setState({
              token:obj.token,
              isloading:false,
              email:obj.email
            });
          }
          else{
            this.setState({
              isloading:false
            })
          }
        });
    }
    else{
      this.setState({
        isloading:false,
    });
    }
  }
    else{
      this.setState({
          isloading:false,
      });
    }
  }
  render()
  {
    const{
      token,
      isloading,
      email
    }=this.state;
    console.log(token);
    console.log(isloading);
    if(isloading)
    {
      return(
        <div><p>LOADING........</p></div>
      );
    }
    if(token)
    {
      return(
        
        <div>
        <Navbar email={email} logout={this.logout}></Navbar>
        
          {/* <Router>
            <Route exact path="/">
              
          <p>ACCOUNT</p>
         <Link to="/addproduct">ADD PRODUCT</Link><br />
         <Link to="/cart">Show Cart</Link><br />
         <Link to="/home">Home</Link><br />
         <button onClick={this.logout}>Logout</button>
         </Route> */}
         {/* <Route exact path="/addproduct">
            <Addproductpage></Addproductpage>
            </Route>
            <Route exact path="/home">
           <Home></Home>
           </Route>
           <Route exact path="/cart">
           <Cart></Cart>
           </Route>
          </Router> */}
        </div>

      );
    }
    else
    {

    
  return (
    <div>
       <Navbar1></Navbar1>
      <Router>
    
   
    </Router>
    </div>
  );
    }
  }
}

export default App;
