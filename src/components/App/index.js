import React, { Component, useState, useEffect } from 'react';
import Web3 from 'web3';

import Token from '../../abis/Token.json';
import EthSwap from '../../abis/EthSwap.json';

import Navbar from '../Navbar';
import Main from '../Main';

const App = () => {
  const [account, setAccount] = useState('');
  const [token, setToken] = useState({});
  const [ethSwap, setEthSwap] = useState({});
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  let content;

  useEffect(() => {
    const loadWeb3 = async () => {
      console.log('it calls this')
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying Metmaask');
      }
    };

    const loadBlockchainData = async () => {
      const eth = window.ethereum;
      const web3 = window.web3;

      const accounts = await eth.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const ethBalance = await eth.request({ method: 'eth_getBalance', params: [account] });
        setEthBalance(ethBalance);

        // load token
        const networkId = await eth.request({ method: 'net_version' });
        const tokenData = Token.networks[networkId];
        if (tokenData) {
          const token = new web3.eth.Contract(Token.abi, tokenData.address);
          setToken(token);
          let tokenBalance = await token.methods.balanceOf(account).call();
          setTokenBalance(tokenBalance.toString());
        } else {
          window.alert('Token contract not deployed to detected network');
        }

        // load ethSwap
        const ethSwapData = EthSwap.networks[networkId];
        if (ethSwapData) {
          const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
          setEthSwap(ethSwap);
        } else {
          window.alert('EthSwap contract not deployed to detected network');
        }

        setLoading(false);
    };

    // if (!window.web3) {
    //   loadWeb3();
    // }
    loadWeb3();

    if (account === '') {
      loadBlockchainData();     
    }
  }, []);

  const buyTokens = (etherAmount) => {
    setLoading(true);
    ethSwap.methods.buyTokens()
      .send({ from: account, value: etherAmount })
      .on('transactionHash', () => {
        setLoading(false);
      });
  }

  const sellTokens = (tokenAmount) => {
    setLoading(true);
    token.methods.approve(ethSwap.address, tokenAmount)
      .send({ from: account })
      .on('transactionHash', () => {
        ethSwap.methods.sellTokens(tokenAmount)
          .send({ from: account })
          .on('transactionHash', () => {
            setLoading(false);
          });
      });
  }

  if (loading) {
    content = <p id="loader" className="text-center">Loading...</p>
  }

  content = 
    <Main
      etherBalance={ethBalance}
      tokenBalance={tokenBalance}
      buyTokens={buyTokens}
      sellTokens={sellTokens}
    />;

  return (
    <div>
        <Navbar account={account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: 600 }}>
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>    
  );
}

export default App;
