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

  const [isConnected, setIsConnected] = useState(false);
  const [userAccount, setUserAccount] = useState("");
  const [isToken, setIsToken] = useState(false);
  const [status,setStatus]= useState(true);
  const [admin,setAdmin] = useState(false);
  const [globaldNFT,setGlobaldNFT] = useState("")
  const contract = new ethers.Contract(contractAddress, abi, signer)
 

  useEffect(() => {
    if (signer != null) {
      signer
        .getAddress()
        .then((res) => {
          setUserAccount(res);
          setIsConnected(true);


          const isOrg = async()=>{
            const check = await contract.addressToOrgInfo(userAccount);
            if (check[0]){
              setAdmin(true)
            
            }
           }
          
          isOrg()


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
