import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginMetamask from '../components/Loginmetamask'

const Home=({isConnected,setIsConnected}) => {

  return (
    <div className='home'>
         
            <h2>
                Welcome to the Decentralised Donation Platform.
            </h2>
        
        <LoginMetamask isConnected={isConnected} setIsConnected={setIsConnected}/>
        <div>
      {isConnected && (
        <div className='homediv'>
       <p>
        Wallet Connected Successfully.
       </p>
        </div>
      
      )}
      </div>
    </div>
  )
}

export default Home