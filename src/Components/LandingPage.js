import { AppBar, Button, Card, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import walletLogo from "./wallet.png"
import {ethers} from 'ethers';
import {contractAddress,abi} from '../common.js';
import HotelRegister from './hotelReg';

export const LandingPage = () => {
    const user = useContext(UserContext)
  return (
    <Box>
        {user.iswalletAvailable ?
        <>
            {user.isConnected ?
            <>
               <Box style={{
                position:"relative",
                marginTop:"200px",
                display:"flex",
                justifyContent:"center",
               }}>
                {!user.admin && <HotelRegister />}
               </Box>
            </> :
            <>
            <Card sx={{ width:"40%",height:"60vh",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"auto",marginTop:"20px",minWidth:"350px"}}>
                    <Box sx={{ display:"flex",flexDirection:"column",justifyContent:'center',alignItems:"center",margin:"auto",marginTop:"10vh"}}>
                    <Box margin={"auto"}>
                    <img src={walletLogo} width={200}/>
                    </Box>
                <Button sx={{marginTop:"20px"}} color='warning' variant='contained'
                    margin={"auto"}
                onClick={() => {
                user.login();
                }}>
             Connect
             </Button>
             <Typography sx={{marginTop:"20px"}} variant='h6'>Connect Your Wallet</Typography>
            </Box>
            </Card>
            </>}
        </>
        :
        <>
         <Card sx={{ width:"40%",height:"60vh",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"auto",marginTop:"20px",minWidth:"350px"}}>

    <Box sx={{ display:"flex",flexDirection:"column",justifyContent:'center',alignItems:"center",margin:"auto",marginTop:"10vh"}}>
        <Box margin={"auto"}>
        <img src={walletLogo} width={200}/>
        </Box>
        <Button sx={{marginTop:"20px"}} variant='contained'
        margin={"auto"}
        onClick={() => {
            window.open("https://metamask.io");
        }}>
        GET WALLET
    </Button>
    <Typography sx={{marginTop:"20px"}} variant='h6'>Please Download Wellet</Typography>

    </Box>
</Card>

        </>
        
        }

    </Box>
  )
}
