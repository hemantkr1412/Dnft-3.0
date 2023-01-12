
import { Box } from '@mui/system';
import { AppBar, Button, Card, InputLabel, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ScanQR from './Scanqr';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CreateIPFSuri } from '../APIs/APIs';
import TransferOwner from './transferOwner';
import {ethers} from 'ethers';
import {contractAddress,abi} from '../common.js';


export const Issue = () => {
    const [memberShip,setMembership]=useState("REGULAR");
    const [inputDiscount,setInputDiscount] = useState("");
    const [scanner,setScanner] = useState(false);
    const [walletAddress,setWalletAdd] = useState("");
    const [isReward,setisReward]=useState(false);
    const [value, setValue] = React.useState(null);//ddmmyyyy
    const [reward,setreward] = useState("");

    

    //Contract Integration...
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const handleChange =(e) =>{
        setisReward((e.target.value))
    }

    const handleChangeMembership =(e) =>{
        setMembership(e.target.value)
    }

    const handleChangeWallet = (e) =>{
        setWalletAdd(e.target.value)
    }

    const handleChangeReward = (e) =>{
        setreward(e.target.value)
    }
    // const handleChangeDate = (e) =>{
    // }
    const handleClickissue = async() =>{
        const res =await CreateIPFSuri(reward);
        console.log(res);
        const jsonURI = "https://bit.infura-ipfs.io/ipfs/" + (res);
        console.log(jsonURI);
        let isRewarded; 
        if (isReward){
            isRewarded = true;
        }else{
            isRewarded = false;
        }
        let premium;
        if(memberShip == "REGULAR"){
           premium=false
        }
        else {premium=true}

       //Date
       let expiryDate;
       await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${value.$y}-${value.$M+1}-${value.$D} 23:59:59`)
       .then(res=>res.json())
       .then(data=>{expiryDate=data-19800});
       // unixToDate.then(data=>console.log(data));//VIEW NFT
       

       try {
         console.log("txn started")
            const issueNFT = await contract.safeMint(walletAddress,jsonURI,isRewarded,premium,reward,expiryDate);
            console.log(issueNFT);
            // console.log(reward);
            console.log("Txn completed......")
            
        } catch (error) {
            console.log(error)
            
        }
    }



  return (
      <Box>
        <AppBar 
        position="sticky"
        sx={{
            margin: 'auto',
            marginTop: 12,
            marginBottom: 2,
            width: '30%',
            borderRadius: 10,
            minWidth:"400px",
            background:"white"}}
        >
            <Toolbar>
            {/* <button type="button" onClick={transferOwner}>
        Transfer Ownership
      </button> */}
      {/* <input
        type="text"
        placeholder="New Owner Address"
        onChange={(e) => setNewOwner(e.target.value)}
      ></input> */}
                <Box margin={'auto'} marginBottom ='auto' style={{display:"flex"}} >
                    <TextField label="Wallet Address" value={walletAddress.split("ethereum:")} onChange={handleChangeWallet} variant="standard" sx={{borderRadius: 10,width:"400"}} />
                    <Button type='submit' variant="contained" sx={{borderRadius: 10,marginLeft:"30px"}}
                    onClick={(e) => {
                        setWalletAdd((e.target.value).split("ethereum:"))
                    }}
                    >Enter Manually</Button>
                    
                </Box>
            </Toolbar>
            
        </AppBar>
        <ScanQR 
        setWalletAdd={setWalletAdd}
        />
           {walletAddress && <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>

                            <>
                            <Card  sx={{ width:"25%",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"450px",padding:"10px"}}>
                                <Typography variant='h5' sx={{fontWeight:"700",textAlign:"center"}}>ABC HOTEL</Typography>
                                <Box sx={{}} >
                                    <Box sx={{marginLeft:"30px"}}>
                                        <img style={{margin:"auto"}} src="https://gateway.pinata.cloud/ipfs/Qmb52oqVqNh7gn6ZRfaB88FdykuzMZgDttek8yeJXooX5U" width={400} height={400}/>
                                    </Box>
                                    <Box sx={{marginLeft:"15px"}}>
                                        <Typography sx={{fontSize:"16px",fontWeight:"600"}} >Wallet: {walletAddress.split("ethereum:")}</Typography>
                                            <Box sx={{marginTop:"20px"}}>
                                                <Typography color={"green"} sx={{fontWeight:"600"}}>MEMBERSHIP : </Typography>

                                                    <FormControl sx={{mt:2 ,minWidth: 120 }} size="small">
                                                        <InputLabel id="demo-select-small">MEMBERSHIP</InputLabel>
                                                        <Select

                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={memberShip}
                                                            onChange={handleChangeMembership}
                                                            label="MEMBERSHIP"
                                                            >
                                                            <MenuItem value={"PREMIUM"}>PREMIUM</MenuItem>
                                                            <MenuItem value={"REGULAR"}>REGULAR</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"green",fontWeight:"600"}}>REWARD :</Typography>
                                                <Box sx={{display:"flex"}}>
                                                    <FormControl sx={{mt:2 ,minWidth: 120 }} size="small">
                                                        <InputLabel id="demo-select-small">REWARD</InputLabel>
                                                        <Select

                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={isReward}
                                                            onChange={handleChange}
                                                            label="REWARD"
                                                            >
                                                            <MenuItem value={true}>YES</MenuItem>
                                                            <MenuItem value={false}>NO</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                                {isReward && 
                                                <Box sx={{display:'flex',flexDirection:"column" ,width:"300px"}}>
                                                    <TextField sx={{marginTop:"18px",marginBottom:"10px"}} variant="standard" value={reward} onChange={handleChangeReward}  placeholder='Reward' /> 
                                                    {/* <TextField sx={{marginTop:"20px",marginLeft:"10px"}} variant="standard"  placeholder='Expire Date' />  */}
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="EXP. Date"
                                                            value={value}
                                                            onChange={(newValue) => {
                                                            setValue(newValue);
                                                            }}
                                                            sx={{marginTop:"25px",marginLeft:"10px"}}
                                                            formatDate={(date) => moment(new Date()).format('MM-DD-YYYY')}
                                                            renderInput={(params) => <TextField variant="standard" {...params} />}
                                                        />
                                                        </LocalizationProvider>
                                                 </Box>
                                                 }
                                            </Box>
                                           <Box sx={{marginTop:"25px",color:"black",display:"flex",justifyContent:"center"}} >
                                                <Button variant="outlined" 
                                                onClick={handleClickissue}
                                                >
                                                    Issue
                                                </Button>      
                                            </Box>
                                    </Box>
                                </Box>
                            
                            </Card>
            
                    </>


            </Box> }
    </Box>
  )
}
