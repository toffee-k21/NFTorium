"use client";
import React, { useContext, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/functions";
// import { useMyContext } from './context';
import { ethers } from "ethers";
import { Contract } from "ethers";
import ABI from "../utils/ABI.json";
import { MyContext } from "../utils/context";
import Address from "../utils/Address.json";
import { useNavigate } from "react-router-dom";

export function PopUp() {

       const [file, setFile] = useState(null);
       const [desc, setDesc] = useState(null);
       const [name, setName] = useState(null);
       const [price, setPrice] = useState(null);
       const [fileUrl, setFileUrl] = useState(null);
       const [message, setMessage] = useState(null);
       const redirect = useNavigate();
      //  const { provider } = useContext(MyContext);
       const abi = ABI.abi;
       const contractAddress = Address.contractAddress;
           const uploadFile = async () => {
             const response = await uploadFileToIPFS(file);
             setFileUrl(response);
             console.log(fileUrl);
           };

           const uploadJSON = async () => {
             console.log({ name: name, description: desc, img_url: fileUrl });
             const response = await uploadJSONToIPFS({
               name: name,
               description: desc,
               image: fileUrl,
             });
            
             const provider = new ethers.BrowserProvider(window.ethereum);
             console.log("provider", provider);
             let signer = await provider.getSigner();
             console.log(
               "address:",
               contractAddress,
               "abi:",
               abi,
               "signer:",
               signer
              );
             const contract = new ethers.Contract(contractAddress, abi, signer);
             let valueInWei = "0";
             if (price != null) {
               valueInWei = ethers.parseEther(price.toString());
             }
             console.log("res", response);
             console.log("contract", contract);
             console.log("contract", typeof valueInWei.toString());
             const txn = await contract.createToken(response, valueInWei, {
               value: ethers.parseEther("0.01"),
             }); //takes in wei
             setMessage("Listed");
             await txn.wait(2);
             redirect("/view");
           };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl sm:p-4 pt-20 md:p-8 shadow-input bg-white dark:bg-black/70">
      {fileUrl ? (
        <div
          class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-neutral-900 dark:text-green-400 "
          role="alert"
        >
          <span class="font-medium">Successfully uploaded !</span> You have
          uploaded file on ipfs
        </div>
      ) : (
        <></>
      )}
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to NFT marketplace
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm my-2 dark:text-neutral-300">
        Explore the world of NFTs and create your own NFTs
      </p>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="firstname">Name of nft</Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Tyler"
            type="text"
          />
        </LabelInputContainer>
      </div>
      <LabelInputContainer className="mb-8">
        <Label htmlFor="twitterpassword">Select a image</Label>
        <Input
          type="file"
          accept="*.jpg, *.jpeg, *.png"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              // Set the selected file
              setFile(e.target.files[0]);
            } else {
              // Log a message if no files are selected
              console.log("No files selected.");
            }
          }}
        />
        <button
          type="button"
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={uploadFile}
        >
          upload
          <BottomGradient />
        </button>
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="Number">Set price of NFT</Label>
        <Input
          onChange={(e) => setPrice(e.target.value)}
          id="number"
          placeholder="0.01"
          type="number"
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="">Description of NFT</Label>
        <Input
          onChange={(e) => setDesc(e.target.value)}
          id=""
          placeholder="write about your nft"
          type="text"
        />
      </LabelInputContainer>
      {message == "Listed" ? (
        <div
          class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span class="font-medium">Wait !</span> You will be redirect after minting
        </div>
      ) : (
        <></>
      )}
      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        onClick={() => uploadJSON()}
      >
        List my NFT
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
