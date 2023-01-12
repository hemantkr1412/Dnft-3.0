import { AppBar, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ScanQR from './Scanqr';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { contractAddress,abi } from '../common';
import { ethers } from 'ethers';

function createData(date,reward,status,expdate) {
    return { date,reward,status,expdate };
}
export const Updatenft = () => {
    const [token ,settoken] = useState("");
    const handleChangetoken = (e) =>{
        settoken(e.target.value)
    }
    const [walletAddress,setWalletAdd] = useState("");
    const [reward,setreward] = useState("");
    const [redeem,setredeem] = useState("");
    const [isReward,setisReward]=useState(false);
    const [value, setValue] = React.useState(null);
    const rows = [
        createData("22-12-2022","Flat 50% OFF*","YES","15-01-2025"),
        createData("08-02-2023","One Night Stay Free*","NO","12-05-2026"),
        createData("05-06-2024","Upto 30% OFF*","NO","21-03-2026"),
        
    ];


    // Contract integration starts from here.......................................
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const [memberShip,setMembership]=useState("PREMIUM")

    let isPremium;
    if(memberShip == "PREMIUM"){
        isPremium = true;
    }
    else if(memberShip == "REGULAR"){
        isPremium = false;
    }
    const handleChange = (e)=>{
        setMembership(e.target.value)
        
    }
    //################################# Contract integration functions......############################
    const update = async()=>{
        let expiryDate;
       await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${value.$y}-${value.$M+1}-${value.$D} 23:59:59`)
        .then(res=>res.json())
        .then(data=>{expiryDate=data-19800});
        const change = await contract.updateNFT(0,walletAddress,isPremium,isReward,reward,expiryDate);
        console.log(change);
        console.log("updated successfully.......");
    }

    const redeemReward = async()=>{
    const utiliseReward = await contract.redeem(walletAddress,arrId);
    console.log(utiliseReward);
    }
/*#####################################################################################################3 */


    const handleChangeReward = (e) =>{
        setreward(e.target.value)
    }
    const handleChangeisreward =(e) =>{
        setisReward((e.target.value))
    }

    const handleChangeRedeem = (e) =>{
        setredeem(e.target.value)
    }

    const handleChangeWalletAddr = (e) =>{
        setWalletAdd(e.target.value)
    }

    const onClickAction = (reward) =>{
        setredeem(reward)
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
            
                <Box margin={'auto'} marginBottom ='auto' style={{display:"flex"}} >
                    <TextField label="Token ID" value={token} onChange={handleChangetoken} variant="standard" sx={{borderRadius: 10,width:"400"}} />

                    <TextField label="Wallet Address" value={walletAddress} onChange={handleChangeWalletAddr} variant="standard" sx={{borderRadius: 10,width:"400"}} />
                
                    <Button type='submit' variant="contained" sx={{borderRadius: 10,marginLeft:"30px"}}
                    >View NFT</Button>
                
                </Box>
            </Toolbar>
            
        </AppBar>
        <ScanQR 
        setWalletAdd={setWalletAdd}
        />
       <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        <Card  sx={{ width:"40%",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"350px",padding:"10px"}}>
                                <Box sx={{marginTop:"5px"}} >
                                    <Box sx={{display:"flex",justifyContent:"center"}}>
                                        <Box>
                                        <img style={{margin:"auto"}} src="https://gateway.pinata.cloud/ipfs/QmV2NaqzSgqgurypqm4UQYkRDLy6g8FMmvVoUkVdAhheN1" width={400} height={400}/>
                                        </Box>
                                        <Box sx={{marginTop:"40px",marginLeft:"50px"}}>
                                        <Typography variant='h5' sx={{fontWeight:"700",textAlign:"center"}}>ABC HOTEL</Typography>
                                        <Typography color={"green"} sx={{fontWeight:"600",marginTop:"20px"}}>MEMBERSHIP :</Typography>
                                        <FormControl sx={{mt:2 ,minWidth: 120 }} size="small">
                                                        <InputLabel id="demo-select-small">MEMBERSHIP</InputLabel>
                                                        <Select

                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={memberShip}
                                                            onChange={handleChange}
                                                            label="MEMBERSHIP"
                                                            >
                                                            <MenuItem value={"PREMIUM"}>PREMIUM</MenuItem>
                                                            <MenuItem value={"REGULAR"}>REGULAR</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                        <Typography color={"green"} sx={{fontWeight:"600",marginTop:"20px"}}>TOKEN ID :</Typography>
                                        <Typography >{token}</Typography>
                                        <Box sx={{display:"flex"}}>
                                                    <FormControl sx={{mt:2 ,minWidth: 120 }} size="small">
                                                        <InputLabel id="demo-select-small">REWARD</InputLabel>
                                                        <Select

                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={isReward}
                                                            onChange={handleChangeisreward}
                                                            label="REWARD"
                                                            >
                                                            <MenuItem value={true}>YES</MenuItem>
                                                            <MenuItem value={false}>NO</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                        {isReward && <Box>
                                        <TextField sx={{marginTop:"18px",marginBottom:"10px"}} value={reward} label="Reward" onChange={handleChangeReward} variant="standard"  placeholder='Reward' /> 
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
                                        </Box> }
                                        {/* <TextField sx={{marginTop:"18px",marginBottom:"10px"}} value={redeem} label="Redeem" variant="standard"  placeholder='Redeem' />  */}
                                        <Box>
                                        <Button sx={{marginTop:"35px"}} onClick={update} variant='outlined' >Update</Button>
                                        </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{marginLeft:"15px"}}>
                                        <Typography sx={{fontSize:"16px",fontWeight:"600",marginTop:"20px"}} >Wallet Add : <span style={{color:"black",fontWeight:"500"}} >{"0x47a83c2b3b7071f93b9dBeB6C7Ac21e45E711156"}</span></Typography>
                                            <Box sx={{marginTop:"10px"}}>
                                                {/* <Typography color={"green"} sx={{fontWeight:"600"}}>MEMBERSHIP : <span style={{color:"black",fontWeight:"200"}} >REGULAR</span></Typography> */}
                                                {/* <Typography sx={{display:"flex",marginTop:"10px",color:"green",fontWeight:"600"}}>REWARD :</Typography> */}
                                                {/* <Typography sx={{display:"flex",marginTop:"10px",fontWeight:"600"}}>One Night Stay Free*</Typography> */}
                                            </Box>
                                            {/* <Box sx={{display:"flex",justifyContent:"space-around",marginTop:"10px"}}>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"green",fontWeight:"600"}}>REWARD </Typography>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"green",fontWeight:"600"}}>REDEEM </Typography>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"green",fontWeight:"600"}}>EXP. DATE </Typography>
                                            </Box>
                                            <Box sx={{display:"flex"}}>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"10px"}}>One Night Stay Free* </Typography>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"50px"}}>Yes </Typography>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"100px"}}>05-10-2023</Typography>
                                            </Box>
                                            <Box sx={{display:"flex"}}>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"10px"}}>One Breakfast  Free* </Typography>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"60px"}}>NO </Typography>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"100px"}}>15-12-2023</Typography>
                                            </Box> */}
                                                        <TableContainer >
                                                        <Table>
                                                            <TableHead>
                                                            <TableRow>
                                                                <TableCell style={{color:"#025435",fontWeight:"700"}}>Date</TableCell>
                                                                <TableCell style={{color:"#025435",fontWeight:"700"}}>Reward</TableCell>
                                                                <TableCell style={{color:"#025435",fontWeight:"700"}}>Redeem</TableCell>
                                                                <TableCell style={{color:"#025435",fontWeight:"700"}}>EXP. DATE</TableCell>
                                                                <TableCell style={{color:"#025435",fontWeight:"700"}}>ACTION</TableCell>
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {rows.map((row) => (
                                                                <TableRow
                                                                key={row.date}
                                                                >
                                                                <TableCell component="th" scope="row">
                                                                    {row.date}
                                                                </TableCell>
                                                                <TableCell >{row.reward}</TableCell>
                                                                <TableCell >{row.status}</TableCell>
                                                                <TableCell >{row.expdate}</TableCell>
                                                                <TableCell >
                                                                {row.status === "NO" ?<Button variant="contained" color='warning'
                                                                    onClick={(e) =>{
                                                                        onClickAction(row.reward)
                                                                    }}
                                                                >
                                                                        Redeem
                                                                    </Button>:
                                                                    <Button variant="contained" disabled color='warning'>
                                                                        Redeem
                                                                    </Button>}
                                                                </TableCell>
                                                                </TableRow>
                                                            ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                    </Box>
                                </Box>
                            
         </Card>
         </Box>
   </Box>
  )
}
