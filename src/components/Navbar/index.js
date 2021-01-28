import React from 'react';
import Identicon from 'identicon.js';

const Navbar = (props) => {
    const { account } = props;

    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a href="#" className="navbar-brand col-sm-3 col-md-2 mr-0">
                EthSwap
            </a>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-secondary">
                        <small id="account">{account}</small>
                    </small>
                    {account ? (
                        <img
                            className="ml-2"
                            width='30'
                            height='30'
                            src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                            alt=""
                        />
                    ) : <span />}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
