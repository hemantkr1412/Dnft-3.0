import { React, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "../common";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

function TransferOwner() {
  const [newOwner, setNewOwner] = useState("");
  const changeOwner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transfer = await contract.transferOwnership(newOwner);
      console.log(transfer);
      alert("Done")
    } catch (error) {
      console.log(`Error occured ${error}`);
    }
  };

  return (
    <Box sx={{
      backgraoundColor:"red",
      width:"500px",
      height:"200px"
    }}>
      <Button color="warning" variant="contained"  onClick={changeOwner}>
        Transfer Ownership
      </Button>
      <input
        type="text"
        placeholder="New Owner Address"
        onChange={(e) => setNewOwner(e.target.value)}
      ></input>
    </Box>
  );
}
export default TransferOwner;
