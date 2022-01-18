import { ethers } from "ethers";

import abi from "../utils/Keyboards.json"

const contractAddress = '0x26F7D14ec22BadB609e17fE7F97AA245B3FbEe88';
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if(ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
