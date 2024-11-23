// import { ethers } from 'ethers';
import { useContext, useEffect } from "react";
// import { ThreeDCardDemo } from "../components/3Dcard"
// import abi from "../utils/ABI.json";
import { MyContext } from '../utils/context';
// import Card from "../components/Card";
import CardContainer from "../components/CardContainer";
import Button from "../components/Button";
// import axios from 'axios';

const Viewnft = () => {

  // Define the ABI and contract address
  const contractAddress = '0xFF15d97254Fff70D9c46372d7584672F41f7C971';

  // Create a provider (no need for a signer for view functions)
  const provider = localStorage.getItem("provider");

  const contractState = useContext(MyContext);

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

  // useEffect(() => {
  //   getAllNFTs();
  // }, [])


  return (
    <div className="dark:bg-neutral-950">
      <div className="h-[500px] w-full">
        <div className="sticky top-0 left-0 dark:bg-neutral-950 h-40 w-full">
          <form class=" relative top-24 mr-10 ml-36 w-[1000px]">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class=" relative flex justify-center items-center">
              <div class=" inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="absolute left-6 w-4 h-4 text-gray-500 dark:bg-neutral-950"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="inline-block w-[100%] p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4 "
                placeholder="Search Mockups, Logos..."
                required
              />
            </div>
          </form>
        </div>
        <CardContainer />
      </div>
    </div>
  );
}

export default Viewnft