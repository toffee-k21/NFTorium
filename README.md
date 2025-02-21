# 🌟 Welcome to NFTorium 🌟
NFTorium is your gateway to the world of digital art and collectibles! Built on the Sepolia Ethereum Testnet, NFTorium is a decentralized marketplace where users can mint, buy, sell, and trade NFTs effortlessly. 🚀

This project is open source and thrives on collaboration! Join us in shaping the future of decentralized marketplaces. 💻✨

## 🎨 Features
- Mint NFTs: Craft unique digital assets with custom metadata and media.
- List & Sell: Seamlessly list your NFTs for sale with adjustable pricing.
- Buy & Trade: Securely purchase NFTs on the blockchain.
- Powered by Sepolia: Low-cost, fast transactions on the Ethereum testnet.
- Decentralized Storage: Files stored via IPFS for permanence and reliability.
- Elegant Design: A sleek, modern user interface built with the latest tech stack.
## 🛠️ Tech Stack
### Frontend
- React.js
- Tailwind CSS
- Ethers.js (v6.5)
  
### Onchain
- Blockchain
- Solidity (Smart Contracts)
- OpenZeppelin Standards (ERC721)
- Sepolia Ethereum Testnet
  
## 🚀 Getting Started
### Prerequisites
- Node.js (v18+)
- npm or yarn
- MetaMask or any Ethereum-compatible wallet
- Test ETH from Sepolia Faucet
- Clone the Repository

### Network Configuration
- The project is built specifically for the Sepolia Testnet and is not configured to work with the Ethereum Mainnet. Connecting with MetaMask using Mainnet may result in errors.
  
```git clone https://github.com/yourusername/nftorium.git``` 
```cd nftorium```

### Install Dependencies
```npm install```

### Configure Environment Variables
Create a .env file in the root directory with the following:
```REACT_APP_INFURA_API_KEY=your-infura-key```
```REACT_APP_CONTRACT_ADDRESS=your-smart-contract-address```  
```REACT_APP_NETWORK=sepolia```

### Deploy Smart Contracts
- Navigate to the contracts directory.
- Deploy the contract using Hardhat or Truffle:

```npx hardhat run scripts/deploy.js --network sepolia```
- Start the Development Server
```npm run dev```

# 🤝 Contributing
We love contributions! Here's how you can help:

Fork the repo.
Create a new branch: git checkout -b feature-xyz.
Make your changes and commit: git commit -m 'Add feature xyz'.
Push to your branch: git push origin feature-xyz.
Submit a pull request! 🎉

# 🌟 Join the Community
Follow the development and connect with contributors:

Twitter: @NFTorium
Discord: Join our server
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
