import React, { useState,useEffect } from 'react'
import '../App.css'

const DonationData = ({ ddata }) => {
   
    return (
        <div className='grid-container' >

            <div className='grid-item '>
                <p>Request ID: {ddata.id}</p>
                <p>Person Name: {ddata.name}</p>
                <p> Address : {ddata.address}</p>
                <p> Wallet Account :{ddata.walletac}</p>
                <p> Date Of Starting :{ddata.time}</p>
            </div>

            <div className='grid-item ' >
                <h3>Reason To Donate</h3>
                <p>{ddata.discription}</p>
            </div>

        </div>
    )
}

export default DonationData