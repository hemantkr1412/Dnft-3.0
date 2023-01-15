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
import {TailSpin} from "react-loader-spinner";
import {ethers} from 'ethers';
import {contractAddress, abi} from '../common';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Loading from "../Loading.gif";

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
    const [arrId,setarrId] = useState("")
    const [rows,setrows] = useState([])
    const [isCard,setIsCard] = useState(false);
    const [isloading,setIsloading] = useState(false);
    const [memberShip,setMembership] = useState("")
    const [isCardloading,setIsCardloading] = useState(false)


    const lst=[]
    
    const getLog = async()=>{
        setIsloading(true)
        // console.log("Click");
        //       const reward = (argsSel.message).slice(11)
        //       let redeem;
        //       argsSel._isRedeemed ? redeem ==="Yes":redeem==="No"
        //       rows.push(createData("10-01-2023",reward,redeem,"02-05-2025"))
        //       setIsCard(true)

        //     console.log("user INfo fetching.....")
        //    const viewNFT = await contract.addressToUser(walletAddress);
        //    console.log(viewNFT);
        //    console.log("user Info fetched successfully....");
        let addr = await provider.send("eth_requestAccounts",[]);
            const permAddr = addr[0];
        console.log("USER INFO IS FETCHING...........")
        const userInfo = await contract.orgToUserInfo(permAddr,walletAddress);
        console.log(userInfo)
        const tokenInt = parseInt(userInfo[1]._hex,16);
        console.log(`TokenId:${tokenInt}`);
        settoken(tokenInt)
        console.log(`IsPremium:${userInfo[3]}`);

        userInfo[3] ? setMembership("PREMIUM") : setMembership("REGULAR")
        console.log("FETCHED SUCCESSFULLY")
        console.log("REWARD INFO FETCHING.......");
           const rewardArrLen = await contract.getLength(walletAddress);
           const numLen = parseInt(rewardArrLen._hex);
           console.log(numLen);
           let issueDate;
           let expiryDate;
           for(let i = 0;i<numLen;i++){
               const rewardInfo = await contract.addressToReward(walletAddress,i);
        /*##################################### Date Logic ######################################################   */
               const issueInt = parseInt((rewardInfo.issueDate._hex),16)+19800;
               const expiryInt = parseInt((rewardInfo.expiryDate._hex),16)+19800;
               //ISSUE DATE
                await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${issueInt}`).then(res=>res.json()).then(data=>issueDate = data);
                
                //EXPIRY DATE
                await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${expiryInt}`).then(res=>res.json()).then(data=>expiryDate = data);
        /*##################################################################################################3*/      
                console.log(`Reward:${rewardInfo.reward}`);
                console.log(`Status:${rewardInfo[3]}`)
                console.log(`Issue Date:${issueDate.slice(0,10)}`);
                console.log(`Expiry Date:${expiryDate.slice(0,10)}`);
                let redeem;
                rewardInfo[3]? redeem='Yes' : redeem ="NO"
                lst.push(createData(issueDate.slice(0,10),rewardInfo.reward,redeem,expiryDate.slice(0,10)))
                setrows(lst)
                // console.log(rows)

            // //  console.log(rewardInfo[1]);
            }
            setIsCard(true)
            setIsloading(false)
            setIsCardloading(false)

           
        }



    // const rows = [
    //     createData("22-12-2022","Flat 50% OFF*","YES","15-01-2025"),
    //     createData("08-02-2023","One Night Stay Free*","NO","12-05-2026"),
    //     createData("05-06-2024","Upto 30% OFF*","NO","21-03-2026"),
        
    // ];
 

    // Contract integration starts from here.......................................
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);


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
    const redeemReward = async(arrId)=>{
        setIsCard(false)
        setIsCardloading(true)
        console.log("Redeem..........")
        const utiliseReward = await contract.redeem(walletAddress,arrId);
        console.log(utiliseReward);
        alert("Sucessfully Redeem")
        // const refresh = () => window.location.reload(true)
        // refresh()
        // setIsCard(true)
        setIsCardloading(false)
     }

    const update = async()=>{
        setIsCard(false)
        setIsCardloading(true)
        if(isReward){
        let expiryDate;
        await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${value.$y}-${value.$M+1}-${value.$D} 23:59:59`)
        .then(res=>res.json())
        .then(data=>{expiryDate=data-19800});
        const change = await contract.updateNFT(token,walletAddress,isPremium,isReward,reward,expiryDate);
        console.log(change);
        console.log("updated successfully.......");
        alert("updated successfully.......")
        }
        setIsCardloading(false)
        // const refresh = () => window.location.reload(true)
        // refresh()
        // getLog()
        

        // redeem && redeemReward();

       


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

    const onClickAction = (reward,index) =>{
        setredeem(reward)
        setarrId(index)
        redeemReward(index)
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
                    <TextField label="Token ID" value={token} onChange={handleChangetoken} variant="standard" sx={{borderRadius: 10,width:"50"}} />
                    <p>|</p>

                    <TextField label="Wallet Address" value={walletAddress} onChange={handleChangeWalletAddr} variant="standard" sx={{borderRadius: 10,width:"400"}} />
                
                    {!isloading ? <Button type='submit' variant="contained" sx={{borderRadius: 10,marginLeft:"30px"}}
                    onClick={getLog}
                    >View NFT</Button> : <TailSpin color='#A3A6FA' height={30}/>}
                
                </Box>
            </Toolbar>
            
        </AppBar>
        <ScanQR 
        setWalletAdd={setWalletAdd}
        />
       <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        {isCard && <Card  sx={{ width:"40%",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"350px",padding:"10px"}}>
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
                                        <Typography >{`000${token}`}</Typography>
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
                                                {isReward && 
                                        <Box>
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
                                        </Box>
                                        }
                                        {/* <TextField sx={{marginTop:"18px",marginBottom:"10px"}} value={redeem} label="Redeem" variant="standard"  placeholder='Redeem' />  */}
                                        <Box>
                                        <Button sx={{marginTop:"35px"}} onClick={update} variant='outlined' >Update</Button>
                                        </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{marginLeft:"15px"}}>
                                        <Typography sx={{fontSize:"16px",fontWeight:"600",marginTop:"20px"}} >Wallet Add : <span style={{color:"black",fontWeight:"500"}} >{walletAddress}</span></Typography>
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
                                                            {rows.map((row,index) => (
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
                                                                        onClickAction(row.reward,index)
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
                            
         </Card>}
         {
            isCardloading &&
            <>
            <Box sx={{backgroundColor:"white",width:"350px",height:"40vh",display:"flex",flexDirection:"column",boxShadow:"10px 5px 5px #85878c"}}>
                <Box margin={"auto"}>
                <img src={Loading} />
                </Box>
                <Typography margin={"auto"}>Please Wait</Typography>
            </Box>
        </>
         }
         </Box>
   </Box>
  )
}
