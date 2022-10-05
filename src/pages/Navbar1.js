
import React from 'react'
import { NavLink } from "react-router-dom";
import './Nav.css'

const Navbar1 = () => {
  return (
    
        <header className='navbar'>
            <div className='navbar__title navbar__item'>
            <NavLink to="/" >
                    Home
                </NavLink>
            </div>
            <div className='navbar__item'>
            <NavLink to="/donationreq" >
                Pending Requests
            </NavLink>
            </div>
            <div className='navbar__item'>
            <NavLink to="/alldonations" >
                    Accepted by admin
            </NavLink>
            </div>
            <div className='navbar__item'>
            <NavLink to="/createdonation" >
                    Create Donation Request
            </NavLink>

            </div>   
            <div className='navbar__item'>
            <NavLink to="/dashboard" >
                    DashBoard
            </NavLink>
            
            </div>        
        </header>
    );
  
}

export default Navbar1
