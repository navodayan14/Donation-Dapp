
import React from 'react'
import { useEffect, useState } from 'react'
import { loadBlockchain } from '../components/BlockchainLoad';
import LoadingSpinner from '../components/LoadingSpinner';
import '../App.css'
import { SemanticClassificationFormat } from 'typescript';
import DonationList from '../components/DonationList';


const AllDonations = () => {

    useEffect(() => {

        setIsLoading(true)

        async function fetchData() {
            const { accounts, donation } = await loadBlockchain()
            const donationids = await donation.methods.getrequestids().call();
            console.log(donationids)
            const prod = [];
            for (let i = 0; i < donationids.length; i++) {
                const donationret = await donation.methods.idtorequest(donationids[i]).call();
                const donationdata = JSON.parse(donationret.detail);
                if(donationret.status==1)
                prod.push({id:donationret.id,name:donationdata.name})
            }
            setdonationsreq(prod)}
        try {
            fetchData()
        }
        catch (e) {
            alert(' error occured', e)
        }

        setIsLoading(false)

    }, [])


    const [isLoading, setIsLoading] = useState(false);
    const [donationsreq, setdonationsreq] = useState([])

    
    const [detailpath,setdetailpath]=useState("/donate")
    return (
        <>
            {isLoading ? <LoadingSpinner /> :
                <div className='donatel' >
                    <h3 >Donate On Followings</h3>
                    <DonationList donationsreq={donationsreq} path={detailpath}/>
                </div>}
        </>
    )
}

export default AllDonations