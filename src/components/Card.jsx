import React, { useContext, useEffect, useState } from "react";
import { DirectionAwareHover } from "./ui/direction-aware-hover";
import { MyContext } from "../utils/context";
import ABI from "../utils/ABI.json";

import { ethers, Contract } from "ethers";

import Address from "../utils/Address.json";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Card({ tokenId }) {
  const { provider } = useContext(MyContext);
  const abi = ABI.abi;
  const contractAddress = Address.contractAddress;
  const [nftimg, setnftimg] = useState(null);
  const [owner, setOwner] = useState(null);
  const [seller, setSeller] = useState(null);
  const [price, setPrice] = useState(null);
  const [name, setName] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(0);

  const { NFTdetails, setNFTdetails  } = useContext(MyContext);

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
    console.log("nftimg", nftimg);
    setOwner(await contract.ownerOf(tokenId));
    const details = await contract.getListedTokenForId(tokenId);

    setName(jsonData.name);
    
    setSeller(details.seller);
    const wei = details.price;
    setPrice(wei);
    // setNFTdetails([...{tokenId:tokenId ,name:jsonData.name, image:nftimg, price:wei, owner:owner, seller:seller}]);

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

  // useEffect(() => {
  //   console.log("Updated Display Price:", displayPrice);
  // }, []);

  const handleBuyNFT = async () => {
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, abi, signer);
    const res = await contract.executeSale(tokenId, {
      value: price,
    });
    setOwner(await contract.ownerOf(tokenId));
  };

  // const imageUrl = { nftimg };
  return (
    <Link to={`/view/${tokenId}`}>
      <div className="m-[8px] w-[357px] relative flex items-center justify-center ">
        <DirectionAwareHover imageUrl={nftimg}>
          <p className="font-bold text-xl">{name}</p>
          <p className="font-normal text-sm">{displayPrice} ETH</p>
          {/* <p>{tokenId}</p>
        <p>owner: {owner}</p>
        <p>seller: {seller}</p> */}
          <Button
            onClick={handleBuyNFT}
            className=" rounded-sm w-44 p-2 my-2 z-20"
            text="Buy now"
          ></Button>
        </DirectionAwareHover>
      </div>
    </Link>
  );
}
