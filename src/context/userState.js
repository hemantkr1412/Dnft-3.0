import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { ethers } from "ethers";
import {contractAddress,abi} from "../common";
const UserState = (props) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;
  const signer = provider != null ? provider.getSigner() : null;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const [isConnected, setIsConnected] = useState(false);
  const [userAccount, setUserAccount] = useState("");
  const [isToken, setIsToken] = useState(false);
  const [status,setStatus]= useState(true);
  const [admin,setAdmin] = useState(false);
  const [globaldNFT,setGlobaldNFT] = useState("")
  
 

  useEffect(() => {
    if (signer != null) {
      signer
        .getAddress()
        .then((res) => {
          setUserAccount(res);
          setIsConnected(true);
          if(userAccount==="0xcebFD12bA1e85a797BFdf62081785E9103A96Dd3"){
            setAdmin(true)
          }
         const isOrg = async()=>{
          const check = await contract.addressToOrgInfo(userAccount);
          console.log(check);
         }



        })
        .catch((err) => {
          setIsConnected(false);
        });
    } else {
      setIsConnected(false);
    }
  });

  const iswalletAvailable = window.ethereum != null;

  const login = async () => {
    await provider
      .send("eth_requestAccounts", [])
      .then((res) => {
        setIsConnected(true);
      })
      .catch((err) => {});

    if (signer != null) {
      await signer
        .getAddress()
        .then((res) => {
          setUserAccount(res);
          setIsConnected(true);
        })
        .catch((err) => {
          setIsConnected(false);
        });
    }
  };

  return (
    <UserContext.Provider
      value={{
        signer,
        provider,
        login,
        iswalletAvailable,
        isConnected,
        userAccount,
        isToken,
        setIsToken,
        status,
        setStatus,
        admin,
        setAdmin,
        globaldNFT,
        setGlobaldNFT
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
