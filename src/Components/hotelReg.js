import {React,useState} from 'react';
import {ethers} from 'ethers';
import {contractAddress,abi} from '../common';
import { Box } from '@mui/system';
import { Button, Card, TextField, Typography } from '@mui/material';

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
         <Box style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
        <Card  sx={{ width:"30%",height:"600px",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"350px",padding:"10px"}}>
         <Box   component="form"
          sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display:'flex',
          flexDirection:"column",
          justifyContent:"center",
          alignContent:"center",
          alignItems:"center"
          }}
          noValidate
          autoComplete="off">
          <Typography variant='h5' sx={{textAlign:"center"}}>Complete Your KYC </Typography>
          <TextField id="standard-basic" label="Name" variant="standard" />
          <TextField id="standard-basic" label="Email" variant="standard" />
          <TextField id="standard-basic" label="Phone" variant="standard" />
          <TextField id="standard-basic" label="CIN" variant="standard" />
          <TextField id="standard-basic" label="Company Short Name" variant="standard" />
          <TextField id="standard-basic" label="Document Name" variant="standard" />
          <Button
            variant="contained"
            component="label"
          >
            Upload Document
            <input
              type="file"
              hidden
            />
          </Button>


          <Button 
          variant='contained'
          onClick={hotelReg}
          sx={{
            marginTop:"50px"
          }}
          >
            Register Orgnisation
          </Button>

         </Box>
         </Card>
         </Box>
        </>
    )
}

export default HotelRegister;