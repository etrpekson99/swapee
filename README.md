# Swapee

Exchange custom token for Ethereum and vice-versa

## Requirements
- Ganache
- MetaMask
- Truffle
- NPM
- React

## Follow these steps to run
1. Open terminal in root foler and run `npm install`
2. Open Ganache on your machine and choose "Quickstart"
3. On your terminal in the root folder, run `truffle migrate`
4. Run `npm run start` to run the React / client-side application
5. On your browser, open the MetaMask extension and add Ganache as a custom RPC
6. In order to  add Ganache, you will need to take note of your RPC Server on the Ganache client (default is 7545)
7. Once Ganache is added, on your local client-side app, open the MetaMask extension and import a new account
8. Import the second account from your Ganache client by clicking on the key icon and copying the private key to MetaMask
9. Connect MetaMask to the client-side app by clicking "Not connected" and then "Connect" on the MetaMask extension

You can now trade custom tokens with Ethereum!

## Running tests
- In order to run tests, run `truffle test` on your root directory

## Make your own token
- Update the `Token.sol` file under `src/contracts` to change the name and symbol of the token
- Simple change the value of the `name` and `symbold` properties to however you like

## For improvement
- Use functional component for `App.js`
