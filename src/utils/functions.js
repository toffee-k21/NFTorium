import axios from "axios";
import * as dotenv from "dotenv";

// dotenv.config();

const key = "d1fed96106d84d47a209";
const secret = "643c32b00e6b72e2a454b69d40d197837f07c8c844d8db2655fec2daff4bc791";
// const key = process.env.NEXT_PUBLIC_PINATA_KEY;
// const secret = process.env.PINATA_SECRET_KEY;
export const uploadFileToIPFS = async (file)=>{
      console.log("key",key,secret);
    //   console.log(process.env);
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', file);

    // const metadata = JSON.stringify({
    //     name: 'testname',
    //     keyvalues: {
    //         exampleKey: 'exampleValue'
    //     }
    // });
    // data.append('pinataMetadata', metadata);
    return axios.post(url,data,{
        maxBodyLength:99999999999,
        headers:{
            'Content-Type': `multipart/form-data;`,
            pinata_api_key: key,
            pinata_secret_api_key: secret,
        }
    })
    .then((response)=>{
        console.log("image uploaded", response.data.IpfsHash);
        return "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
    })
    .catch((err)=>{
        return err.message;
    })
}

export const uploadJSONToIPFS = async (jsonFile)=>{
  
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    return axios.post(url, jsonFile, {
        headers: {
            pinata_api_key: key,
            pinata_secret_api_key: secret,
        }
    })
        .then((response) => {
            console.log("file uploaded", response.data.IpfsHash);
            return "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        })
        .catch((err) => {
            return err.message;
        })
}