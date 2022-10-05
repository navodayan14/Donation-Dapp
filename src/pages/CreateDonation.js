import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react'
import { loadBlockchain } from '../components/BlockchainLoad';
import LoadingSpinner from '../components/LoadingSpinner';
import '../App.css'

const CreateDonation = () => {

    const handlechange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        setdonationreq({ ...donationreq, [name]: e.target.value });
    }

    const callblockchain = async (strdonation) => {
        const { accounts, donation } = await loadBlockchain()
        await donation.methods.createRequest(strdonation).send({ from: accounts[0] })
        console.log(strdonation)
        toast.success('Donation Request Added', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const strdonation = JSON.stringify(donationreq)
        await callblockchain(strdonation)
        alert('donation request created,Thanks')
        console.log(strdonation)
        setdonationreq({ name: '', address: '', discription: '' })
        setIsLoading(false)

    }

    const [donationreq, setdonationreq] = useState({ name: '', address: '', discription: '' })
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <ToastContainer />
            {isLoading ? <LoadingSpinner /> :
                <div className='donmain'>
                    <h2>Create Donation Request</h2>


                    <form onSubmit={handleSubmit}>


                        <div>
                            <input className='rcinp' placeholder='Name Of Person' type='text' value={donationreq.name} onChange={handlechange} name='name'></input>
                        </div>


                        <div>
                            <input size='50' placeholder='Permanent Address' className='addr' type='text' value={donationreq.address} onChange={handlechange} name='address'></input>
                        </div>

                        <div>
                            <textarea rows="8" cols="70" placeholder='Cause Of Donation ' className='rcinp' type='text' value={donationreq.discription} onChange={handlechange} name='discription' />
                        </div>

                        <button>Create Donation Request</button>
                    </form>
                </div>}
        </>
    )
}

export default CreateDonation