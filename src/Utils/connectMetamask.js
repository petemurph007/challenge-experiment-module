import { ethers } from "ethers";
import { toast } from "react-toastify";

export const checkMetaMaskInstallation = () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum === 'undefined') {
    toast.error('MetaMask is not installed. Please install MetaMask to continue.');
    return false;
  }
  return true;
};

export const connectMetamask = async () => {
  if (!checkMetaMaskInstallation()) {
    return null;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return { signer: signer, provider: provider };
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    toast.error('Error connecting to MetaMask. Please try again.');
    return null;
  }
};

export const checkIfWalletIsConnect = async (setAccount) => {
  if (!checkMetaMaskInstallation()) {
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setAccount(accounts[0]);
      toast.success('Connected to MetaMask wallet');
    } else {
      toast.info('Please connect your MetaMask wallet');
    }
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    toast.error('Error checking MetaMask connection. Please try again.');
  }
};
