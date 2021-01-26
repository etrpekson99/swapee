import React, { Component } from 'react';
import Web3 from 'web3';

import Token from '../../abis/Token.json';
import EthSwap from '../../abis/EthSwap.json';

import Navbar from '../Navbar';
import Main from '../Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      ethBalance: 0,
      tokenBalance: 0,
      loading: true,
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const eth = window.ethereum;
    const web3 = window.web3;

    const accounts = await eth.request({ method: 'eth_requestAccounts' });
    this.setState({ account: accounts[0] });

    // const ethBalance = await web3.eth.getBalance(this.state.account);
    const ethBalance = await eth.request({ method: 'eth_getBalance', params: [this.state.account] });
    this.setState({ ethBalance });

    // load token
    const networkId = await eth.request({ method: 'net_version' });
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      this.setState({ token });
      let tokenBalance = await token.methods.balanceOf(this.state.account).call();
      this.setState({ tokenBalance: tokenBalance.toString() });
    } else {
      window.alert('Token contract not deployed to detected network');
    }

    // load ethSwap
    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      this.setState({ ethSwap });
    } else {
      window.alert('EthSwap contract not deployed to detected network');
    }

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying Metmaask');
    }
  }

  buyTokens = (etherAmount) => {
    this.setState({ loading: true });
    this.state.ethSwap.methods.buyTokens()
      .send({ from: this.state.account, value: etherAmount })
      .on('transactionHash', () => {
        this.setState({ loading: false });
      });
  }

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true });
    this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount)
      .send({ from: this.state.account })
      .on('transactionHash', () => {
        this.state.ethSwap.methods.sellTokens(tokenAmount)
          .send({ from: this.state.account })
          .on('transactionHash', () => {
            this.setState({ loading: false });
          });
      });
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = 
        <Main
          etherBalance={this.state.ethBalance}
          tokenBalance={this.state.tokenBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
        />;
    }
    return (
      <div>
        <Navbar account={this.state.account} />
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
}

export default App;
