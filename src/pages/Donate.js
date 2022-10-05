import '../App.css'
import React from 'react';
import { loadBlockchain } from '../components/BlockchainLoad';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLocation } from 'react-router-dom';
import DonationData from '../components/DonationData';

const Donate = () => {
      const location = useLocation();
      useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            const { accounts, donation } = await loadBlockchain()
            const donationret = await donation.methods.idtorequest(location.state.data).call();
            const donationdata = JSON.parse(donationret.detail);

            const donationdet = {
                id: donationret.id,
                name: donationdata.name,
                address: donationdata.address,
                discription: donationdata.discription,
                walletac: donationret.sender,
                time: donationret.time
            }

            setddata(donationdet)
        }
        try {
            fetchData()
        }
        catch (e) {
            alert(' error occured', e)
        }
        setIsLoading(false)
    }, [])

   const donateth=async()=>{
    setIsLoading(true)
    const { accounts, donation } = await loadBlockchain()
    await donation.methods.donateeth(ddata.id).send({from:accounts[0],value:2000000000000000});
    setIsLoading(false)
    alert('Donated Succesfully. thanks')
   }

    const [isLoading, setIsLoading] = useState(false);
    const [ddata, setddata] = useState({ id: '', name: '', address: '', discription: '', walletac: '', time: '' })

    return (
        <>
            {isLoading ? <LoadingSpinner /> :
                <div className='foot'>
                    <DonationData ddata={ddata} />
                    <p>Donation Money: 0.002 eth</p>
                    <button className='btn' onClick={donateth}>Donate</button>
                </div>
            }
        </>
    )
}
export default Donate