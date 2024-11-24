import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../utils/context";
import Button from "./Button";
import logo from "../assets/NFTorium-logo.png";

const Nav = () => {
  const [walletConnect, setWalletConnect] = useState("Connect Wallet");
  let {provider, setProvider} = useContext(MyContext);
  const handleWalletConnect = async () => {

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
    } else {
      console.log("clicked");
      let provide = new ethers.BrowserProvider(window.ethereum);
      setProvider(provide);
      console.log(provider);
    //   localStorage.setItem("provider", JSON.stringify(provider));
    }
  };

  function checkWalletConnect() {
    if (provider != undefined) {
      setWalletConnect("Connected");
    }
  }

  useEffect(() => {
    checkWalletConnect();
  }, [walletConnect,provider]);
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
          <Button
            className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent text-white sm:block hidden"
            onClick={handleWalletConnect}
            text={walletConnect}
          ></Button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
