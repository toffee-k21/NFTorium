import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../utils/context';
import ABI from '../utils/ABI.json';
import { ethers, Contract } from 'ethers';
import Address from '../utils/Address.json';
import { use } from 'framer-motion/client';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const Profile = () => {
    // const { provider } = useContext(MyContext);
    const abi = ABI.abi;
    const contractAddress = Address.contractAddress;
    const [result, setResult] = useState([]);                

    const fetchNFTDetails = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(contractAddress, abi, signer);
        const res = await contract.getMyNFTs();
        console.log("res", res.name);
        setResult(res);
    };

    useEffect(() => {
        fetchNFTDetails();
    }, []);

  return (
    <div className="bg-black pt-32 px-44 flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-5xl font-bold p-6">Your NFTs</h1>{" "}
        {result.name == undefined && (
          <div className="text-white p-2 w-2/3">
            You may not own, even if you are the creater of NFT beacuse you are
            listing NFT by tranfering ownership to this NFT marketplace.
            <span className="text-neutral-500 cursor-pointer">
              {" "}
              If you really wants to own from this contract pay for ! dont worry
              ultimatley fee will be tranfer to you. 
            </span>{" "}
            for more query you can {" "}
            <a href="https://github.com/toffee-k21/NFTorium" className='text-blue-500'>reach out to us</a>
          </div>
        )}
      </div>

      {/* <div className="text-white">You don't own any NFT </div> */}
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