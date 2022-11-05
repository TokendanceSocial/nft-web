import { ethers } from 'ethers';
import { contractAbi } from '../config/TicketContract';
import config from '../config/index';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const greet = new ethers.Contract(config.CONTRACT_ADDRESS, contractAbi.abi, signer);

export default {
  provider,
  signer,
  greet,
};
