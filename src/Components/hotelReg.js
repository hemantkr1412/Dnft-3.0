import {React,useState} from 'react';
import {ethers} from 'ethers';
import {contractAddress,abi} from '../common';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

function HotelRegister(){
  const hotelReg = async()=>{
    console.log("Registration starts");
    try {
        const reg = await contract.orgRegister();
        console.log(reg.hash);
    } catch (error) {
      const revertData = error.data.data;
      const decodeErr = contract.interface.parseError(revertData);
      console.log(`Decode:${decodeErr}`);
      console.log(`DecodeName: ${decodeErr.name}`);
    }

 
   }
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const contract = new ethers.Contract(contractAddress, abi, signer);


    return(

        <>
         <Box>
          <Button 
          variant='contained'
          onClick={hotelReg}
          >
            Register Orgnisation
          </Button>

         </Box>
        </>
    )
}

export default HotelRegister;