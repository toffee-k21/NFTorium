// import { ethers } from 'ethers';
import { useContext, useEffect, useState } from "react";
// import { ThreeDCardDemo } from "../components/3Dcard"
// import abi from "../utils/ABI.json";
import { MyContext } from '../utils/context';
// import Card from "../components/Card";
import CardContainer from "../components/CardContainer";
import Button from "../components/Button";
import Address from "../utils/Address.json";
import ABI from "../utils/ABI.json";
import { Contract } from "ethers";
// import axios from 'axios';

const Viewnft = () => {

  // Define the ABI and contract address
  // const contractAddress = '0xFF15d97254Fff70D9c46372d7584672F41f7C971';

  // Create a provider (no need for a signer for view functions)
  // const provider = localStorage.getItem("provider");

 const { provider } = useContext(MyContext);
 let abi = ABI.abi;
 const contractAddress = Address.contractAddress;
 const [result, setResult] = useState([]);
  // Create a contract instance
  // const contract = contractState.contract;

  async function getAllNFTs() {
    try {
      // const nfts = await contract?.getAllNFTs();
      // console.log(nfts)
      // console.log(contract);
       console.log("provider", provider);
       let signer = await provider.getSigner();
       console.log("address:", contractAddress, "abi:", abi, "signer:", signer);
       const contract = new Contract(contractAddress, abi, signer);
      let res = await contract.getAllNFTs();
      // console.log(Number(result.toString()));
      // console.log(result);
      setResult(res)
      // const exists = await contract.exists(1);
      // console.log("Token exists:", exists);

      // const uri = await contract.tokenURI(1);
      // const ans = await uri;
      // console.log(uri);
    } catch (error) {
      console.error('Error calling getAllNFTs:', error);
    }
  }

  useEffect(() => {
    getAllNFTs();
  }, [provider])


  return (
    <div className="dark:bg-neutral-950">
      <div className="h-[500px] w-full">
        <div className="sticky top-0 left-0 dark:bg-neutral-950 h-40 w-full">
          <form class=" relative top-24 mr-10 ml-36 w-[1000px]">
            <label
              // for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class=" relative flex justify-center items-center">
              <div className=" inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="absolute left-6 w-4 h-4 text-gray-500 dark:bg-neutral-950"
                
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="inline-block w-[100%] p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4 "
                placeholder="Search Mockups, Logos..."
                required
              />
            </div>
          </form>
        </div>
        <CardContainer nfts={result}/>
      </div>
    </div>
  );
}

export default Viewnft