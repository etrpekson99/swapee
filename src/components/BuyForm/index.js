import React, { useState } from 'react';

import ethLogo from '../../eth-logo.png';

const BuyForm = (props) => {
    const {
        etherBalance,
        tokenBalance,
        buyTokens,
    } = props;

    const [output, setOutput] = useState('0');
    const [input, setInput] = useState('0');

    const onChangeInput = (event) => {
        setInput(event.target.value);
        setOutput(event.target.value * 100);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        let etherAmount;
        etherAmount = input;
        etherAmount = window.web3.utils.toWei(etherAmount, 'Ether');
        buyTokens(etherAmount);
    };

    return (
        <form className="mb-3" onSubmit ={onSubmit}>
            <div>
                <label className="float-left">Input</label>
                <span className="float-right text-muted">
                    Balance: {window.web3.utils.fromWei(etherBalance, 'Ether')}
                </span>
            </div>
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="0"
                    required
                    onChange={onChangeInput}
                    value={input}
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
                    Balance: {window.web3.utils.fromWei(tokenBalance, 'Ether')}
                </span>
            </div>
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="0"
                    value={output}
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
};

export default BuyForm;
