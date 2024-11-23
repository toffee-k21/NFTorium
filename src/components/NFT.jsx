import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MyContext } from '../utils/context';
import ABI from "../utils/ABI.json";
import { ethers, Contract } from "ethers";
import Address from "../utils/Address.json";
import { desc } from 'framer-motion/client';

const NFT = () => {
    const tokenId = useParams().id;
    console.log(tokenId)
    // const { provider } = useContext(MyContext);
    const abi = ABI.abi;
    const contractAddress = Address.contractAddress;
    // console.log(param);

     const [nftimg, setnftimg] = useState(null);
     const [owner, setOwner] = useState(null);
     const [seller, setSeller] = useState(null);
     const [price, setPrice] = useState(null);
     const [name, setName] = useState(null);
     const [desc, setDesc] = useState(null);
     const [displayPrice, setDisplayPrice] = useState(0);

     const { NFTdetails, setNFTdetails } = useContext(MyContext);

     const getNFTImage = async () => {
         const provider = new ethers.BrowserProvider(window.ethereum);
       const signer = await provider.getSigner();
       const contract = new Contract(contractAddress, abi, signer);
       const res = await contract.tokenURI(tokenId);
       console.log("res", res);
       const fetchedData = await fetch(res);
       const jsonData = await fetchedData.json();
       console.log("jsonData", typeof jsonData);
       jsonData.image ? setnftimg(jsonData.image) : setnftimg(jsonData.img_url);
       console.log(jsonData.image);
    //    console.log("nftimg", nftimg);
       setOwner(await contract.ownerOf(tokenId));
       const details = await contract.getListedTokenForId(tokenId);

       setName(jsonData.name);

       setSeller(details.seller);
       const wei = details.price;
       setPrice(wei);
       setDesc(jsonData.description);
       // setNFTdetails([...{tokenId:tokenId ,name:jsonData.name, image:nftimg, price:wei, owner:owner, seller:seller}]);
       console.log(nftimg)

       try {
         let priceETH = ethers.formatEther(wei.toString());
         setDisplayPrice(priceETH);
       } catch (err) {
         console.log(err);
       }
     };

     useEffect(() => {
       getNFTImage();
     }, []);


  return (
    <div className=" bg-black py-20 px-16">
      <section class=" bg-white md:py-16 dark:bg-black antialiased">
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img class="w-full dark:hidden" src={nftimg} alt="" />
              <img
                class="w-full hidden dark:block"
                src={nftimg}
                alt=""
              />
            </div>

            <div class="mt-6 sm:mt-8 lg:mt-0">
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {name}
              </h1>
              <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  {displayPrice} ETH
                </p>

              </div>

              <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href="#"
                  title=""
                  class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                >
                  <svg
                    class="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  Add to favorites
                </a>

                <a
                  href="#"
                  title=""
                  class="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                  role="button"
                >
                  <svg
                    class="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </a>
              </div>

              <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p class="mb-6 text-gray-500 dark:text-gray-400">
                {desc}
              </p>

              <p class="text-gray-500 dark:text-gray-400">
                <div>Owner : {owner} </div>
                <div>Seller : {seller} </div>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NFT