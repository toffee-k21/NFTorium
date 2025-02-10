import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../utils/context";
import Button from "./Button";
import logo from "../assets/NFTorium-logo.png";
import { useWallet } from "../utils/WalletProvider";

const Nav = () => {
  const [walletConnect, setWalletConnect] = useState("Connect Wallet");
  // let {provider, setProvider} = useContext(MyContext);
 const { connectWallet, signer, account } = useWallet();
 

  return (
    <header className="fixed inset-x-0 top-0 z-50  px-4 ">
      <nav className="mx-auto flex max-w-7xl items-center py-2 w-full">
        <div className="flex justify-between w-full px-[10%] py-4">
          <div className="text-white">
            <span>
              <img src={logo} className="w-14 inline-block" />
            </span>
            <span className="mx-4 text-gray-500"> | </span> NFTorium
          </div>
          <button
            className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent text-white sm:block hidden  text-white font-semibold rounded-lg text-center bg-gradient-to-r p-2 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] cursor-pointer flex justify-center items-center "
            onClick={connectWallet}
          >
            {signer ? `${account}` : `Connect your Wallet`}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
