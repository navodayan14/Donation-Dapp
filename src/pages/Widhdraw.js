import "../App.css";
import React from "react";
import { loadBlockchain } from "../components/BlockchainLoad";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLocation } from "react-router-dom";
import DonationData from "../components/DonationData";

const Withdraw = () => {
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const { accounts, donation } = await loadBlockchain();
      const donationret = await donation.methods
        .idtorequest(location.state.data)
        .call();
     const amt=await donation.methods
     .idtofund(location.state.data)
     .call();
     setamount(amt);
      const donationdata = JSON.parse(donationret.detail);

      const donationdet = {
        id: donationret.id,
        name: donationdata.name,
        address: donationdata.address,
        discription: donationdata.discription,
        walletac: donationret.sender,
        time: donationret.time,
      };

      setddata(donationdet);
    }
    try {
      fetchData();
    } catch (e) {
      alert(" error occured", e);
    }
    setIsLoading(false);
  }, []);

  const handlechange=(e)=>{
    e.preventDefault();
    setmoney(e.target.value);

 }
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const { accounts, donation } = await loadBlockchain()
    await donation.methods.withdraweth(money*1000000000000000000,ddata.id).send({ from: accounts[0] })
    alert("Widhdrawl Succefull!!!, Enjoy")
 }
const[money,setmoney]=useState(0)
const [amount,setamount]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [ddata, setddata] = useState({
    id: "",
    name: "",
    address: "",
    discription: "",
    walletac: "",
    time: "",
  });

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <DonationData ddata={ddata} />
          <div className="foot">
            <p>Total Fund Raised :{amount/1000000000000000000}</p>
            <form onSubmit={handlesubmit}>
              <div>
                <input
                  className="rcinp"
                  placeholder="Enter Money"
                  type="number"
                  value={money}
                  onChange={handlechange}
                ></input>
              </div>
              <button className="btn">Withdraw Money</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Withdraw;
