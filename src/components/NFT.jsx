import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../utils/context';
import ABI from "../utils/ABI.json";
import { ethers, Contract } from "ethers";
import Address from "../utils/Address.json";
import { desc } from 'framer-motion/client';
import Button from './Button';

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
     const [reSellPrice, setReSellPrice] = useState(null);
     const [price, setPrice] = useState(null);
     const [name, setName] = useState(null);
     const [desc, setDesc] = useState(null);
     const [message, setMessage] = useState(null);
     const [result, setResult] = useState(null);
     const [relistMessage, setRelistMessage] = useState(null);
     const [displayPrice, setDisplayPrice] = useState(0);
     const [address,setAddress] = useState(null);
     const [pricePop, setPricePop] = useState(null);
     const navigate = useNavigate();
     let provider;


     const getNFTImage = async () => {
         provider = new ethers.BrowserProvider(window.ethereum);
       const signer = await provider.getSigner();
       setAddress(signer.address);
       const contract = new Contract(contractAddress, abi, signer);
       const res = await contract.tokenURI(tokenId);
       console.log("res", res);
       const fetchedData = await fetch(res);
       const jsonData = await fetchedData.json();
       console.log("jsonData", typeof jsonData);
       jsonData.image ? setnftimg(jsonData.image) : setnftimg(jsonData.img_url);
       console.log(jsonData.image);
       setOwner(await contract.ownerOf(tokenId));
       const details = await contract.getListedTokenForId(tokenId);
       
       setName(jsonData.name);
       setResult(details);
       setSeller(details.seller);
       const wei = details.price;
       setPrice(wei);
       setDesc(jsonData.description);
  

       try {
         let priceETH = ethers.formatEther(wei.toString());
         setDisplayPrice(priceETH);
       } catch (err) {
         console.log(err);
       }
     };

       const handleBuyNFT = async () => {
        provider = new ethers.BrowserProvider(window.ethereum);
         const signer = await provider.getSigner();
         const contract = new Contract(contractAddress, abi, signer);
         const res = await contract.executeSale(tokenId, {
           value: price,
         });
         await res.wait(2);
         setMessage("Listed");
         setOwner(await contract.ownerOf(tokenId));
       };

          const handleRelistNFT = async () => {
            if(reSellPrice == null || reSellPrice <= 0) return;
            provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            console.log(owner,signer.address);
            if(owner == signer.address){
              let valueInWei = "0";
              if (reSellPrice != null) {
                valueInWei = ethers.parseEther(reSellPrice.toString());
              }
              const contract = new Contract(contractAddress, abi, signer);
              const res = await contract.relistToken(tokenId, valueInWei, {
                value: ethers.parseEther("0.01"),
              });
              setRelistMessage("Listed");
              await res.wait(2);
              // setOwner(await contract.ownerOf(tokenId));
              navigate("/profile")
            }
            else{

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
              <img class="w-full hidden dark:block" src={nftimg} alt="" />
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
              <div className=" pb-4 pt-10 flex w-full ">
                {owner == address ? (
                  <div className='relative w-1/2 mr-4'>
                    <Button
                      text="Sell NFT"
                      className={"p-4"}
                      onClick={()=>setPricePop(true)}
                    />
                    {pricePop == true ? (
                      <div className="absolute -top-10 left-0 z-50 w-full h-[150px] flex flex-col justify-center bg-neutral-900 p-2">
                        <label className='text-white'>Enter Price</label>
                        <input
                          className="w-full rounded-md bg-neutral-900 my-2 border-[1px] p-2"
                          type="number"
                          onChange={(e) => setReSellPrice(e.target.value)}
                        />{" "}
                        <div className='flex '>
                        <Button className={"w-full mr-1"} text={"Sell !"} onClick={handleRelistNFT} />
                        <div className="w-full rounded-lg ml-1 bg-black text-white flex justify-center items-center font-semibold cursor-pointer" onClick={()=>setPricePop(false)}>X </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <button
                    className={
                      "w-1/2 bg-neutral-700 text-white p-4 font-semibold  mr-4 rounded-md cursor-default"
                    }
                  >
                    Sell NFT
                  </button>
                )}
                {result?.currentlyListed == true ? (
                  <Button
                    text="Buy NFT"
                    className={"w-1/2"}
                    onClick={handleBuyNFT}
                  />
                ) : (
                  <button
                    className={
                      "w-1/2 bg-neutral-700 text-white p-4 font-semibold  mr-4 rounded-md cursor-default"
                    }
                  >
                    Buy NFT
                  </button>
                )}
              </div>
              {message == "Listed" ? (
                <div
                  class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  <span class="font-medium">Wait !</span> Transfering ownership
                </div>
              ) : (
                <></>
              )}
              <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p class="mb-6 text-gray-500 dark:text-gray-400">{desc}</p>

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