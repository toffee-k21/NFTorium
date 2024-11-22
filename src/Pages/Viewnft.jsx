'use client'
import { ethers } from 'ethers';
import { useContext, useEffect } from "react";
import { ThreeDCardDemo } from "../components/3Dcard"
import abi from "../utils/ABI.json";
import { useMyContext } from '../utils/context';
import axios from 'axios';

const Viewnft = () => {

  // Define the ABI and contract address
  const contractAddress = '0xFF15d97254Fff70D9c46372d7584672F41f7C971';

  // Create a provider (no need for a signer for view functions)
  const provider = localStorage.getItem("provider");

  const contractState = useMyContext();

  // Create a contract instance
  const contract = contractState.contract;

  async function getAllNFTs() {
    try {
      // const nfts = await contract?.getAllNFTs();
      // console.log(nfts)
      console.log(contract);
      const result = await contract.getCurrentToken();
      console.log(Number(result.toString()));
      console.log(result);
      const exists = await contract.exists(1);
      console.log("Token exists:", exists);
      const uri = await contract.tokenURI(1);
      const ans = await uri;
      // console.log(uri);
    } catch (error) {
      console.error('Error calling getAllNFTs:', error);
    }
  }

  useEffect(() => {
    getAllNFTs();
  }, [])


  return (
    <div>
      <ThreeDCardDemo />
    </div>
  )
}

export default Viewnft