import React from 'react';
import '../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function Background()
{
    return(
        <div className='main'>
        <div className='heading'>
   <h1>MOBILE GALLERY</h1><br />
   <Link to="/login">EXPLORE→</Link>
   </div>
       </div>
    );
}