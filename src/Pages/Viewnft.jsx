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
import { Contract, ethers } from "ethers";

const Viewnft = () => {

//  const { provider } = useContext(MyContext);
 let abi = ABI.abi;
 const contractAddress = Address.contractAddress;
 const [result, setResult] = useState([]);
 const [resultCopy, setResultCopy] = useState([]);
 const [search, setSearch] = useState([]);
 const { NFTdetails, setNFTdetails } = useContext(MyContext);
//  let provider;

  async function getAllNFTs() {
    try {
       const provider = new ethers.BrowserProvider(window.ethereum);
       console.log("provider", provider);
       let signer = await provider.getSigner();
       console.log("address:", contractAddress, "abi:", abi, "signer:", signer);
       const contract = new Contract(contractAddress, abi, signer);
      let res = await contract.getAllNFTs();
      setResult(res)
      setResultCopy(res)
    } catch (error) {
      console.error('Error calling getAllNFTs:', error);
    }
  }
  const handleSearch= () => {
    //  checkResultErrors.filter((r)=> NFTdetails.name == result.id);
  //  NFTdetails.filter((r)=>r.name == search);
  //  NFTdetails = NFTdetails?.filter((r) => r.name == search);
  //  console.log(NFTdetails.tokenId);

  //token id
  setResultCopy(result);
  search == "" ? setResultCopy(result): setResultCopy(result.filter((r)=>r[0].toString() == search))
  }

  useEffect(() => {
    getAllNFTs();
  }, [])


  return (
    <div className="dark:bg-neutral-950">
      <div className="h-[500px] w-full">
        <div className="sticky z-40 top-0 left-0 dark:bg-neutral-950 h-40 w-full">
          <form class=" relative top-24 w-full z-20" onSubmit={(e)=> e.preventDefault()}>
            <label
              // for="default-search"
              className=" mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative flex justify-center items-center">
              <input
                type="search"
                id="default-search"
                className="inline-block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:mr-4 "
                placeholder="Search Token ID"
                // value = {search}
onChange={(e)=> setSearch(e.target.value)}
             
              />
            <button className="text-neutral-400 border-[0.5px] border-neutral-700 rounded-lg p-[10.5px] " onClick={handleSearch}>search</button>
            </div>
          </form>
        </div>
        <CardContainer nfts={resultCopy}/>
      </div>
    </div>
  );
}

export default Viewnft