import { AppBar, Button, Card, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import walletLogo from "./wallet.png"
import {ethers} from 'ethers';
import {contractAddress,abi} from '../common.js';
import HotelRegister from './hotelReg';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const user = useContext(UserContext)
    const navigate = useNavigate()
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
                {!user.admin &&
                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Button 
                    
                    variant='contained'
                    onClick={(e) => navigate('/hotel') }
                    >
                        Register Orgnisation
                    </Button>
                    <Button 
                    sx={{marginTop:"20px"}}
                       variant='contained'
                        onClick={(e) => navigate('/viewnft')}
                    >
                        User
                    </Button>
                </Box>
                }
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
