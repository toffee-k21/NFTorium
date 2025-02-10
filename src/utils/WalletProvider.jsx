import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();
        setProvider(browserProvider);
        setSigner(signer);
        setAccount(address);
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("No crypto wallet found!");

    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();
console.log("wallet clicked")
      setProvider(browserProvider);
      setSigner(signer);
      setAccount(address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <WalletContext.Provider
      value={{ provider, signer, account, connectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context)
    throw new Error("useWallet must be used within a WalletProvider");
  return context;
};
