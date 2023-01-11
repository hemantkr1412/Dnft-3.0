import { React, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "../common";

function TransferOwner() {
  const [newOwner, setNewOwner] = useState("");
  const changeOwner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transfer = await contract.transferOwnership(newOwner);
      console.log(transfer);
    } catch (error) {
      console.log(`Error occured ${error}`);
    }
  };

  return (
    <>
      <button type="button" class="btn btn-primary" onClick={changeOwner}>
        Transfer Ownership
      </button>
      <input
        type="text"
        placeholder="New Owner Address"
        onChange={(e) => setNewOwner(e.target.value)}
      ></input>
    </>
  );
}
export default TransferOwner;
