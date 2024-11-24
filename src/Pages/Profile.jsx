import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../utils/context';
import ABI from '../utils/ABI.json';
import { ethers, Contract } from 'ethers';
import Address from '../utils/Address.json';
import { use } from 'framer-motion/client';
import Card from '../components/Card';

const Profile = () => {
    // const { provider } = useContext(MyContext);
    const abi = ABI.abi;
    const contractAddress = Address.contractAddress;
    const [result, setResult] = useState(null);                

    const fetchNFTDetails = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(contractAddress, abi, signer);
        const res = await contract.getMyNFTs();
        console.log("res", res);
        setResult(res);
    };

    useEffect(() => {
        fetchNFTDetails();
    }, []);

  return (
    <div className='bg-black pt-32 px-20 flex flex-col justify-center items-center'>
      <h1 className="text-white text-5xl font-bold">Your NFTs</h1>
      <div className="flex pt-20 px-20 flex-wrap bg-black justify-center">
        {result?.map((i) => (
          <Card
            key={"first-array" + i}
            className="h-80 w-[373px] rounded-lg text-white bg-gray-100 dark:bg-neutral-900 animate-pulse"
            tokenId={i[0].toString()}
          ></Card>
        ))}
      </div>
    </div>
  );
}

export default Profile