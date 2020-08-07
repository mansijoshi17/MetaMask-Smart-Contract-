import React, { useState } from 'react';
import web3 from 'web3';


function Bank() {

    const [Balance, setBalance] = useState(0);
    const [Ammount, setAmmount] = useState(0); 


    var Web3 = new web3(web3.givenProvider);

    var address = "0x1978C1Ef6EAB171f39c96036996D0D42E59860b0"; //Get deployed contract address from Remix IDE.
    var abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "name": "",
                    "type": "int256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amt",
                    "type": "int256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amt",
                    "type": "int256"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }//Get this Abi from Compilation details.
    ];

    var contractor = new Web3.eth.Contract(abi, address);

    contractor.methods.getBalance().call().then(function (bal) {
        var balance = bal; 
        setBalance(balance);
    })//Get balance.

    const Withdraw = () => {
        Web3.eth.getAccounts().then(function(accounts){
            var acc = accounts[0];//Get first account from all the accounts
            return contractor.methods.withdraw(Ammount).send({from: acc});//withdraw method
        }).then(function(tx) {
            console.log(tx);
        }).catch(function(tx){
            console.log(tx);
        })
    }

    const Deposit = () => {
        Web3.eth.getAccounts().then(function(accounts){
            var acc = accounts[0];
            return contractor.methods.deposit(Ammount).send({from: acc});
        }).then(function(tx) {
            console.log(tx);
        }).catch(function(tx){
            console.log(tx);
        })
    }

    return (
        <div>
            <input type="text" placeholder="Enter Amount" onChange={(event) => setAmmount(event.target.value) } value={Ammount}></input>
            <div className="buttons">
                <button type="submit" onClick={Withdraw}>Withdraw</button>
                <button type="submit" onClick={Deposit}>Deposit</button>
            </div>
            <span className="balance">{Balance}</span>
        </div>
    )
}

export default Bank;