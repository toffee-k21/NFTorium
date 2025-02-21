import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import Address from "../utils/Address.json";
import ABI from "../utils/ABI.json";
import { Contract } from "ethers";
import { Link } from "react-router-dom";
import { useWallet } from "../utils/WalletProvider";

const Viewnft = () => {
  let abi = ABI.abi;
  const contractAddress = Address.contractAddress;
  const [result, setResult] = useState([]);
  const [resultCopy, setResultCopy] = useState([]);
  const [search, setSearch] = useState([]);
  const [length, setLength] = useState([]);

  const { signer } = useWallet();

  async function getAllNFTs() {
    console.log("address:", contractAddress, "abi:", abi, "signer:", signer);
    const contract = new Contract(contractAddress, abi, signer);
    console.log("contract", contract);
    let res;
    try {
       res = await contract.getAllNFTs();
    } catch (err) {
      alert("Please switch to sepolia testnet in your metamask !")
    }
    console.log("re.lems", res?.length);
    console.log("res", res);
    setLength(res?.length);
    setResult(res);
    setResultCopy(res);
    // } catch (error) {
    //   console.error('Error calling getAllNFTs:', error);
    // }
  }

  useEffect(() => {
    getAllNFTs();
  }, []);

  const handleSearch = () => {
    setResultCopy(result);
    search == ""
      ? setResultCopy(result)
      : setResultCopy(result.filter((r) => r[0].toString() == search));
  };

  return (
    <div className="dark:bg-neutral-950">
      <div className="h-[500px] w-full">
        <div className="sticky z-40 top-0 left-0 dark:bg-neutral-950 h-40 w-full">
          <form
            class=" relative top-24 w-full z-20"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className=" mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div class="relative flex justify-center items-center">
              <div className="text-neutral-400 w-1/3 p-[12.5px] border-[1px] border-neutral-200 rounded-lg mb-4 ml-4 font-bold flex justify-center bg-neutral-900">
                Total Minted NFTs : {length}
              </div>
              <Link
                to={`/view/${length}`}
                className="text-neutral-400 w-1/3 p-[12.5px] border-[1px] border-neutral-200 rounded-lg mb-4 mx-4 font-bold flex justify-center bg-neutral-900 cursor-pointer"
                // onClick={() => {console.log(length);setSearch(length)}} // not working try later
              >
                Recently Minted NFT{" "}
              </Link>
              <input
                type="search"
                id="default-search"
                className="inline-block w-full mb-4 ps-10 text-sm text-gray-900 border-[1px] border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:mr-4 p-4"
                placeholder="Search Token ID"
                // value = {search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="text-neutral-400 border-[1px] border-neutral-200 rounded-lg p-[12.5px] mb-4 mr-4"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <CardContainer nfts={resultCopy} />
      </div>
    </div>
  );
};

export default Viewnft;
