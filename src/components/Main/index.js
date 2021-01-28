import React, { useState } from 'react';

import BuyForm from '../BuyForm';
import SellForm from '../SellForm';

const Main = (props) => {
    const {
        etherBalance,
        tokenBalance,
        buyTokens,
        sellTokens,
    } = props;

    const [currentForm, setCurrentForm] = useState('buy');

    const onClickBuy = (event) => setCurrentForm('buy');
    const onClickSell = (event) => setCurrentForm('sell');

    return (
        <div id="content" className="mt-3">
            <div className="d-flex justify-content-between mb-3">
                <button
                    className="btn btn-light"
                    onClick={onClickBuy}
                >
                    Buy
                </button>
                <span className="text-muted">
                    &lt; &nbsp; &gt;
                </span>
                <button
                    className="btn btn-light"
                    onClick={onClickSell}
                >
                    Sell
                </button>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    {currentForm === 'buy' ? (
                        <BuyForm
                            etherBalance={etherBalance}
                            tokenBalance={tokenBalance}
                            buyTokens={buyTokens}
                        />
                    ): (
                        <SellForm
                            etherBalance={etherBalance}
                            tokenBalance={tokenBalance}
                            sellTokens={sellTokens}
                        />
                    )} 
                </div>
            </div>
        </div>
    );
}

export default Main;
