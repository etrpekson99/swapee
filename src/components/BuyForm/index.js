import React, { Component } from 'react';

import ethLogo from '../../eth-logo.png';

class BuyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          output: '0',
          input: '0',
        };
    }

    render() {
        return (
            <form className="mb-3" onSubmit ={(event) => {
                event.preventDefault();
                let etherAmount;
                etherAmount = this.state.input;
                etherAmount = window.web3.utils.toWei(etherAmount, 'Ether');
                this.props.buyTokens(etherAmount);
            }}>
                <div>
                    <label className="float-left">Input</label>
                    <span className="float-right text-muted">
                        Balance: {window.web3.utils.fromWei(this.props.etherBalance, 'Ether')}
                    </span>
                </div>
                <div className="input-group mb-4">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="0"
                        required
                        onChange={(event) => {
                            this.setState({
                                output: event.target.value * 100,
                                input: event.target.value,
                            });
                        }}
                        value={this.state.input}
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={ethLogo} height='32' alt="" />
                            &nbsp;&nbsp;&nbsp; ETH
                        </div>
                    </div>
                </div>
                <div>
                    <label className="float-left">Output</label>
                    <span className="float-right text-muted">
                        Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
                    </span>
                </div>
                <div className="input-group mb-4">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="0"
                        value={this.state.output}
                        disabled
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src="" height='32' alt="" />
                            &nbsp;&nbsp;&nbsp; HAN
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <span className="float-left text-muted">Exchange Rate</span>
                    <span className="float-right text-muted">1 ETH = 100 HAN</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP</button>
            </form>
        
        );
    }
}

export default BuyForm;
