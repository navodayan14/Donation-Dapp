import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import CreateDonation from './pages/CreateDonation';
import Donate from './pages/Donate';
import DonationDeatail from './pages/DonationDetails';
import AllDonations from './pages/AllDonations';
import Home from './pages/Home';
import DonationRequests from './pages/DonationRequests';
import Navbar1 from './pages/Navbar1';
import Web3 from 'web3';
import Withdraw from './pages/Widhdraw';
import DashBoard from './pages/DashBoard';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchdata=async()=>{
  const web3 = new Web3(window.ethereum);
  const userAccount  =await web3.eth.getAccounts();
  const account = userAccount[0];
  if(account) setIsConnected(true)}
 fetchdata()},[isConnected])
  return (
    <BrowserRouter>
    {isConnected && <Navbar1/>}
      <Routes>
        <Route path="/createdonation" element={<CreateDonation/>} />
        <Route path="/donate" element={<Donate/>} />
        <Route path="/donationdetails" element={<DonationDeatail/>} />
        <Route path="/" element={<Home isConnected={isConnected} setIsConnected={setIsConnected}/>} />
        <Route path="/alldonations" element={<AllDonations/>} />
        <Route path="/donationreq" element={<DonationRequests/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/withdraw" element={<Withdraw/>}/>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
