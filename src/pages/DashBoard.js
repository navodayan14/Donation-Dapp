import React, { useState,useEffect } from 'react'
import { loadBlockchain } from '../components/BlockchainLoad';
import LoadingSpinner from '../components/LoadingSpinner';
import DonationList from '../components/DonationList';
import '../App.css'

const DashBoard = () => {
    useEffect(() => {
        const fetchdata=async()=>{
      
      const { accounts, donation } = await loadBlockchain()
      setaccount(accounts[0])
      let donationids=await donation.methods.getuserreq(accounts[0]).call()
      
      console.log('donids',donationids)
      const prod = [];
      for (let i = 0; i < donationids.length; i++) {
          const donationret = await donation.methods.idtorequest(donationids[i]).call();
          const donationdata = JSON.parse(donationret.detail);
          prod.push({id:donationret.id,name:donationdata.name})
      }
      setdonationsreq(prod)
     
         }
         fetchdata()},[] )
 
 
      const [account,setaccount]=useState('')
      const [donationsreq, setdonationsreq] = useState([])
      const [detailpath,setdetailpath]=useState("/withdraw")

  return (
    <div className='dash'>
     <h1>Welcome</h1>
     <p>{account}</p>
     <h3>Your Valid Requests for Donation :</h3>
     <DonationList donationsreq={donationsreq} path={detailpath}/>

    </div>
  )
}

export default DashBoard