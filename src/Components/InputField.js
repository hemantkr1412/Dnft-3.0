import React, { useState } from 'react';
import {  Box} from '@mui/material';
import {AppBar, Toolbar} from "@mui/material";
import { Button, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import UserContext from '../context/UserContext';


export const InputField = () => {
  const user = useContext(UserContext);
  
  const [wallet,setWallet] = useState("")
  const handleChange = (e)=>{
    setWallet(e.target.value)
  }

  return (
    <div>

      <AppBar 
      position="sticky"
      sx={{
        margin: 'auto',
        marginTop: 2,
        marginBottom: 2,
        width: '30%',
        borderRadius: 10,
        minWidth:"350px",
        background:"white"}}
      >
        <Toolbar>
          
            <Box margin={'auto'} marginBottom ='auto' style={{display:"flex"}} >
                <TextField label="Wallet Address" variant="standard" sx={{borderRadius: 10,width:"200"}} value={wallet} onChange={handleChange}/>
                <Button type='submit' variant="contained" sx={{borderRadius: 10,}}
                onClick={()=>{
                 
                }}
                >Get dNFT</Button>
            
            </Box>  
        </Toolbar>
    </AppBar>

    {/* <AppBar 
      position="sticky"
      sx={{
        margin: 'auto',
        marginTop: 1,
        marginBottom: 5,
        width: '30%',
        borderRadius: 10,
        minWidth:"350px",
        background:"white"}}
      >
        <Toolbar>
          
            <Box margin={'auto'} marginBottom ='auto' style={{display:"flex"}} >
                <TextField label="Wallet Address" variant="standard" sx={{borderRadius: 10,width:"350px"}} value={wallet} onChange={(e) => handleChange(e)} />
                <Button type='submit' variant="contained" sx={{borderRadius: 10,}}
                onClick={()=>{
                  handleGetDnftBywallet(wallet)
                }}
                >Get dNFT</Button>
            
            </Box>  
        </Toolbar>
    </AppBar> */}




  </div>
  )
}