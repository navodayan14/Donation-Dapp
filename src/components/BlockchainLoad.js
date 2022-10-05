
import Web3 from 'web3'
import { contract } from './contract'
export const loadBlockchain = async () => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        const address = '0x1E384ad6D883C75960dcFA406CDE1649f3968B4B';
        const donation = new web3.eth.Contract(contract, address);
        return { accounts, donation }
    }
    else {
        alert('plz install metamask')
    }
};