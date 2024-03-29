import { AppBar, Button, Card, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import UserContext from "../context/UserContext"
import { useContext, useEffect } from 'react';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ScanQR from './Scanqr';
import {ethers} from 'ethers';
import {contractAddress, abi} from '../common';
import {TailSpin} from "react-loader-spinner";
import { LandingPage } from './LandingPage';



function createData(date,reward,status,expdate) {
    return { date,reward,status,expdate };
  }

export const Viewnft = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const [token ,settoken] = useState("");
    const [walletAddress,setWalletAdd] = useState("");
    const [getSigner,setSigner] = useState("");
    const [isCard,setIsCard] = useState(false)
    const [rows,setrows] = useState([])
    const [memberShip,setMembership] = useState("")
    const [isloading,setIsloading]  = useState(false)
    const [NFTs,setNFTs] = useState([])
    const [isUser,setIsUser] = useState(true);
    const [nftIssueDate,setnftIssueDate] = useState()
    const handleChangetoken = (e) =>{
        settoken(e.target.value)
    }
    
    const lst=[]
    let issueDates=[]
    const user = useContext(UserContext)
    const getLog = async()=>{
        let redeem;
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
            setSigner(permAddr);
        console.log("USER INFO IS FETCHING...........")
        const userInfo = await contract.orgToUserInfo(permAddr,walletAddress);
        console.log(userInfo)
        const tokenInt = parseInt(userInfo[1]._hex,16);
        console.log(`TokenId:${tokenInt}`);
        settoken(tokenInt)
        console.log(`IsPremium:${userInfo[3]}`);

        userInfo[3] ? setMembership("PREMIUM") : setMembership("REGULAR")
        if (!userInfo[0]){
            setIsUser(false)
             
         }
        console.log("FETCHED SUCCESSFULLY")
        console.log("REWARD INFO FETCHING.......");
           const rewardArrLen = await contract.getRewardlen(permAddr,walletAddress);
           const numLen = parseInt(rewardArrLen._hex);
           console.log(numLen);
           let issueDate;
           let expiryDate;
           for(let i = 0;i<numLen;i++){
               const rewardInfo = await contract.orgToUserReward(permAddr,walletAddress,i);
               console.log(rewardInfo)
        /*#####################################Date Logic######################################################3 */
               const issueInt = parseInt((rewardInfo.issueDate._hex),16)+19800;
               const expiryInt = parseInt((rewardInfo.expiryDate._hex),16)+19800;
               //ISSUE DATE
                await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${issueInt}`).then(res=>res.json()).then(data=>issueDate = data);
                
                //EXPIRY DATE
                await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${expiryInt}`).then(res=>res.json()).then(data=>expiryDate = data);
        /*##################################################################################################3*/      
                console.log(`Reward:${rewardInfo.reward}`);
                console.log(`Status:${rewardInfo[4]}`)
                console.log(`Issue Date:${issueDate.slice(0,10)}`);
                console.log(`Expiry Date:${expiryDate.slice(0,10)}`);
                console.log(`Provider Address:${rewardInfo[5]}`);
                console.log(`isRedeemed:${rewardInfo[4]}`);
                rewardInfo[4] ? redeem='Yes' : redeem ="NO"
                issueDates.push(issueDate)
                // console.log(redeem,rewardInfo.reward)
                lst.push(createData(issueDate.slice(0,10),rewardInfo.reward,redeem,expiryDate.slice(0,10)))
                setrows(lst)
                console.log(issueDates)
                // console.log(rows)

            // //  console.log(rewardInfo[1]);
            }
        
            if (userInfo[0]){
                setIsCard(true)
                console.log(!userInfo[0])
            }
            setIsloading(false)
            setnftIssueDate(issueDates[0])

           
        }




        //for user multiple nfts....
        const NFTsLst=[]
        let issueDate;
        let expiryDate;
        let redeem;
        const viewAsUser = async()=>{
            let addr = await provider.send("eth_requestAccounts",[]);
            const permAddr = addr[0];
            console.log(permAddr);
            console.log("Rewards start fetching..")
            try {
                const rewOrgLen = await contract.getOrgLen(permAddr);
                const intLen = parseInt(rewOrgLen._hex,16);
                console.log(intLen);

                for(let i=0;i<intLen;i++){
                    const orgAddrs = await contract.userToOrgs(permAddr,i)
                    console.log(orgAddrs);
                    console.log("userInfo started fetching...");
                    const userInfo = await contract.orgToUserInfo(orgAddrs,permAddr);
                    console.log(userInfo);
                    const tokenInt = parseInt(userInfo[1]._hex,16);
                    console.log(`TokenId:${tokenInt}`);
                    settoken(tokenInt)
                    console.log(`IsPremium:${userInfo[3]}`);
                    let membership;
                    userInfo[3] ? membership="PREMIUM" : membership="REGULAR";
                    console.log("user fetched...")
                    console.log("Reward fetching Started")
                    const rewLen = await contract.getRewardlen(orgAddrs,permAddr);
                    const intRewLen = parseInt(rewLen._hex,16);
                    // console.log(intRewLen);
                    const rewardsLst=[]
                    for(let j=0;j<intRewLen;j++){
                        const userRews = await contract.orgToUserReward(orgAddrs,permAddr,j);
                        // console.log(userRews);
                        const issueInt = parseInt((userRews.issueDate._hex),16)+19800;
                        const expiryInt = parseInt((userRews.expiryDate._hex),16)+19800;
                        //ISSUE DATE
                        await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${issueInt}`).then(res=>res.json()).then(data=>issueDate = data);
                        //EXPIRY DATE
                        await fetch(`https://helloacm.com/api/unix-timestamp-converter/?cached&s=${expiryInt}`).then(res=>res.json()).then(data=>expiryDate = data);
                        console.log(`Reward:${userRews.reward}`);
                        console.log(`Status:${userRews[3]}`)
                        console.log(`Issue Date:${issueDate.slice(0,10)}`);
                        console.log(`Expiry Date:${expiryDate.slice(0,10)}`);
                        console.log(`Provider Address:${userRews[5]}`);
                        // console.log(`isRedeemed:${userRews[3]}`)
                        userRews[4] ? redeem='Yes' : redeem ="NO"
                        rewardsLst.push(createData(issueDate.slice(0,10),userRews.reward,redeem,expiryDate.slice(0,10)))
                        issueDates.push(issueDate)
                    }
                    NFTsLst.push({permAddr,token:tokenInt,memberShip:membership,orgAddrs,rewardsLst,issueDate:issueDates[0]})
                    

                }
                console.log("All user Nfts.....")
                console.log(NFTsLst)
                setNFTs(NFTsLst)
            } catch (error) {
                console.log(error)
            }
        }

      useEffect(()=>{
        if(user.isConnected){
            if(!user.admin){
                viewAsUser();
            }
        }
        },[user.isConnected])
    

    
    // const rows = [
    //     createData("22-12-2022","Flat 50% OFF*","YES","15-01-2025"),
    //     createData("08-02-2023","One Night Stay Free*","NO","12-05-2026"),
    //     createData("05-06-2024","Upto 30% OFF*","NO","21-03-2026"),
    // ];
    if (!user.isConnected || !user.iswalletAvailable){
        return (
            <LandingPage />
        )
    }
    // if (!isUser){
    //     return (
    //         <Box>
    //             <h1>You do not have NFTs</h1>
    //         </Box>
    //     )
    // }
    
    
  return (
   <Box>
   {user.admin && <><AppBar
        position="sticky"
        sx={{
            margin: 'auto',
            marginTop: 2,
            marginBottom: 2,
            width: '30%',
            borderRadius: 10,
            minWidth:"400px",
            background:"white"}}
        >
            <Toolbar>
            
                <Box margin={'auto'} marginBottom ='auto' style={{display:"flex"}} >
                    <TextField label="Wallet Address" value={walletAddress} onChange={(e)=>setWalletAdd(e.target.value)} variant="standard" sx={{borderRadius: 10,width:"400"}} />
                    {!isloading ? <Button type='submit' variant="contained" sx={{borderRadius: 10,marginLeft:"30px"}}
                    onClick={getLog}
                    >View NFT</Button> : <TailSpin color='#A3A6FA' height={30}/>}
                {/* <Button type='submit' variant="contained" sx={{borderRadius: 10,marginLeft:"30px"}}
                    onClick={viewAsUser}
                    >View User NFTs</Button> */}
                </Box>
            </Toolbar>
            
        </AppBar>
        <ScanQR 
        setWalletAdd={setWalletAdd}
        />
        </>
        }
       <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        {isCard &&<Card  sx={{ width:"30%",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"350px",padding:"10px"}}>
                                <Box sx={{marginTop:"5px"}} >
                                    <Box sx={{display:"flex",justifyContent:"center"}}>
                                        <Box>
                                        <img style={{margin:"auto"}} src="https://gateway.pinata.cloud/ipfs/Qmb52oqVqNh7gn6ZRfaB88FdykuzMZgDttek8yeJXooX5U" width={400} height={400}/>
                                        </Box>
                                        <Box sx={{marginTop:"40px",marginLeft:"10px"}}>
                                        <Typography variant='h5' sx={{fontWeight:"700",textAlign:"center"}}>ABC HOTEL</Typography>
                                        <Typography color={"green"} sx={{fontWeight:"600",marginTop:"20px"}}>MEMBERSHIP :</Typography>
                                        <Typography >{memberShip}</Typography>
                                        <Typography color={"green"} sx={{fontWeight:"600",marginTop:"20px"}}>TOKEN ID :</Typography>
                                        <Typography >{`000${token}`}</Typography>
                                        <Typography color={"green"} sx={{fontWeight:"600",marginTop:"20px"}}>ISSUE DATE :</Typography>
                                        <Typography >{nftIssueDate}</Typography>
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
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {rows.map((row) => 
                                                            {
                                                            return(
                                                                
                                                                <TableRow
                                                                key={row.date}
                                                                >
                                                                <TableCell component="th" scope="row">
                                                                    {row.date}
                                                                </TableCell>
                                                                <TableCell >{row.reward}</TableCell>
                                                                <TableCell >{row.status}</TableCell>
                                                                <TableCell >{row.expdate}</TableCell>
                                                                </TableRow>
                                                            )})}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                    </Box>
                                </Box>
                            
         </Card>}
         {
            NFTs && NFTs.map((item,index)=>{
              
                return(
                    <Card  sx={{ width:"30%",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"350px",padding:"10px"}}>
                                <Box sx={{marginTop:"5px"}} >
                                    <Box sx={{display:"flex",justifyContent:"center"}}>
                                        <Box>
                                        <img style={{margin:"auto"}} src="https://gateway.pinata.cloud/ipfs/Qmb52oqVqNh7gn6ZRfaB88FdykuzMZgDttek8yeJXooX5U" width={400} height={400}/>
                                        </Box>
                                        <Box sx={{marginTop:"40px",marginLeft:"10px"}}>
                                        <Typography variant='h5' sx={{fontWeight:"700",textAlign:"center"}}>ABC HOTEL</Typography>
                                        <Typography color={"green"} sx={{fontWeight:"600",marginTop:"20px"}}>MEMBERSHIP :</Typography>
                                        <Typography >{item.memberShip}</Typography>
                                        <Typography color={"green"} sx={{fontWeight:"600",marginTop:"20px"}}>TOKEN ID :</Typography>
                                        <Typography >{`000${item.token}`}</Typography>
                                        <Typography color={"green"} sx={{fontWeight:"600",marginTop:"20px"}}>ISSUE DATE :</Typography>
                                        <Typography >{item.issueDate}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{marginLeft:"15px"}}>
                                        <Typography sx={{fontSize:"16px",fontWeight:"600",marginTop:"20px"}} >Wallet Add : <span style={{color:"black",fontWeight:"500"}} >{item.permAddr}</span></Typography>
                                        <Typography sx={{fontSize:"16px",fontWeight:"600",marginTop:"20px"}} >ORG Add : <span style={{color:"black",fontWeight:"500"}} >{item.orgAddrs}</span></Typography>
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
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"100px"}}>Yes </Typography>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"100px"}}>05-10-2023</Typography>    
                                            </Box>
                                            <Box sx={{display:"flex"}}>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"10px"}}>One Breakfast  Free* </Typography>
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"black",fontWeight:"500",marginLeft:"100px"}}>NO </Typography>
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
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {(item.rewardsLst).map((row) => 
                                                            {
                                                            return(
                                                                
                                                                <TableRow
                                                                key={row.date}
                                                                >
                                                                <TableCell component="th" scope="row">
                                                                    {row.date}
                                                                </TableCell>
                                                                <TableCell >{row.reward}</TableCell>
                                                                <TableCell >{row.status}</TableCell>
                                                                <TableCell >{row.expdate}</TableCell>
                                                                </TableRow>
                                                            )})}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                    </Box>
                                </Box>
                                            
                    </Card>
                )   
            })
         }

         {
            !isUser &&<Box sx={{marginTop:"20px"}}>
                <Typography>NFT not found</Typography>
            </Box>
         }
         </Box>
   </Box>
  )
}