import React from 'react';
import '../style/navbar.css';
import Addproductpage from './addproductpage';
import Home from './home';
import Cart from './cart';
import Loginpage from './loginpage';
import Signuppage from './signuppage';
import Background from './background';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export  function Navbar(props)
{
    const{
        email,
        logout
    }=props;
    return(
        <div>
            <Router>
            <div class="topnav">
  <Link to="/home">Home</Link>
  <Link to="/addproduct">Add Product</Link>
  <Link to="/cart">Show Cart</Link>
 
  <div class="topnav-right">
  <p>{email}</p>
    <button onClick={logout}>Logout</button>
   
  </div>
</div>
<Switch>
<Route exact path="/addproduct">
            <Addproductpage></Addproductpage>
            </Route>
            <Route exact path="/home">
           <Home></Home>
           </Route>
           <Route exact path="/cart">
           <Cart></Cart>
           </Route>
           <Route exact path="/">
          <Background></Background>
          </Route>
           </Switch>
</Router>
        </div>
    )
}




export function Navbar1()
{
    return(
        <div>
             <Router>
            <div class="topnav">
  <div class="topnav-right">
  <Link to="/login">LOGIN</Link>
        <Link to="/signup">SIGN UP</Link>
  </div>
            </div>
            <Switch>
          <Route exact path="/login">
          <Loginpage></Loginpage>
          </Route>
          <Route exact path="/signup">
          <Signuppage></Signuppage>
          </Route>
        <Route exact path="/">
          <Background></Background>
          </Route>
          </Switch>
            </Router>
            </div>
    )
}