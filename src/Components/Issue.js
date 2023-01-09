
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


export const Issue = () => {
    const [memberShip,setMembership]=useState("PREMIUM");
    const [inputDiscount,setInputDiscount] = useState("");
    const [scanner,setScanner] = useState(false);
    const [walletAddress,setWalletAdd] = useState("");
    const [isReward,setisReward]=useState(false);
    const [value, setValue] = React.useState(null);
    const [reward,setreward] = useState("")

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
    
    const handleClickissue = () =>{
        const res = CreateIPFSuri(reward)
        const jsonURI = "https://bit.infura-ipfs.io/ipfs/"+ res
        // calll API
        
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
                    <TextField label="Wallet Address" value={walletAddress.split("ethereum:")} onChange={handleChangeWallet} variant="standard" sx={{borderRadius: 10,width:"400"}} />
                    <Button type='submit' variant="contained" sx={{borderRadius: 10,marginLeft:"30px"}}
                    onClick={(e) => {
                        setWalletAdd((e.target.value).split("ethereum:"))
                    }}
                    >Enter Menually</Button>
                
                </Box>
            </Toolbar>
            
        </AppBar>
        <ScanQR 
        setWalletAdd={setWalletAdd}
        />
           {walletAddress && <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>

                            <>

                            <Card  sx={{ width:"25%",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"350px",padding:"10px"}}>
                                <Typography variant='h5' sx={{fontWeight:"700",textAlign:"center"}}>ABC HOTEL</Typography>
                                <Box sx={{}} >
                                    <Box sx={{marginLeft:"30px"}}>
                                        <img style={{margin:"auto"}} src="https://gateway.pinata.cloud/ipfs/QmV2NaqzSgqgurypqm4UQYkRDLy6g8FMmvVoUkVdAhheN1" width={400} height={400}/>
                                    </Box>
                                    <Box sx={{marginLeft:"15px"}}>
                                        <Typography sx={{fontSize:"16px",fontWeight:"600"}} >Wallet Add : {walletAddress.split("ethereum:")}</Typography>
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
