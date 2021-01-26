pragma solidity ^0.5.0;

import './Token.sol';

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token; // public variable that represents the Token smart contract
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        // redemption rate = # of tokens they receive for 1 ether
        // amount of Ethereum * redemption rate
        uint tokenAmount = msg.value * rate;

        // require that this exchange has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        // emit an event that tokens were purchased
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        // user can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        // calculate amount of ether to redeem
        uint etherAmount = _amount / rate;

        // check if ethswap has enough ether
        require(address(this).balance >= etherAmount);

        // perform sale
        token.transferFrom(msg.sender, address(this), _amount); // allow smart contract to spend your tokens for you
        msg.sender.transfer(etherAmount);

        // emit token sold event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}