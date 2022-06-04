import React, { useState } from "react";
import { ethers } from "ethers";
const WalletCard = () => {
  /*
    NOTES:
        Since we're going to be working with state and functional react componments, 
        we will need to initialize states to use them later on. 
        These states will include:
            - Error Message
            - Default Accounts
            - user Balance
            - Connect wallet to web3 button text (why the text tho)
     */

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText,] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    /* 
        NOTES: 
            We want this function to check if the user (who clicks this button)
                1. Has MetaMask installed
                2. Wants to connect their meta mask wallet and display infor
                    2A. Account Address
                    2B. Account Balance
        */

    if (window.ethereum) {
      //Awesome, MetaMask is here
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  const chainChangedHandler = () => {
    window.reload();
  };
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div className="walletCard">
      <h4>{"Connection to MetaMask using window.ethereum methods"}</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className="accountDisplay">
        <h3>Address : {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;
