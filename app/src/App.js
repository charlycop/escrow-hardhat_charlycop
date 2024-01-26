import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';
import AddContract from './addContract';
import Escrows from './artifacts/contracts/Escrow.sol/Escrow';

import { fetchEscrows, persistEscrow } from './persistence';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
  console.log(approveTxn);
}

function test(escrows){
  let buttonId;
  const contractABI = Escrows.abi;
  let deployedContract;
  const signer = provider.getSigner()

  for(let i = 0 ; i < escrows.length ; i++){
    buttonId = `approve-${i}`;
    deployedContract = new ethers.Contract(escrows[i].contract, contractABI, provider);
    
    document.getElementById(buttonId).addEventListener('click', async () => {
      await deployedContract.connect(signer).approve();
    });

    deployedContract.on('Approved', () => {
      document.getElementById(buttonId).className = 'complete';
      document.getElementById(buttonId).innerText = "✓ It's been approved!";
      console.log("APPROVED!");
    });

  }


  // if (approved) {
  //   document.getElementById(buttonId).className = 'complete';
  //   document.getElementById(buttonId).innerText = "✓ It's been approved!";
  // } 
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [debug, setDebug] = useState();
  const [id, setId] = useState();

  
  useEffect(() => {

  
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
      setDebug(true);
      setId(0);
    }

    getAccounts();

    // Fetch escrows when the component mounts
    async function initializeEscrows() {
      const fetchedEscrows = await fetchEscrows();
      setEscrows(fetchedEscrows);
    }

    // Get the escrows from the persistent storage
    initializeEscrows();
    console.log("LONGUEUR : ", escrows.length);

  }, [account]);

  async function newContract() {
    const arbiterStr = '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E';
    const beneficiaryStr = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';


    const beneficiary = (debug) ? arbiterStr     : document.getElementById('beneficiary').value;
    const arbiter     = (debug) ? beneficiaryStr : document.getElementById('arbiter').value;
    const value       = (debug) ? ethers.utils.parseEther('1') : ethers.utils.parseEther(document.getElementById('wei').value);//ethers.BigNumber.from(document.getElementById('wei').value);

    const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    console.log(escrowContract);
    
    const escrow = {
      id : escrows.length,
      contract : escrowContract.address,
      arbiter,
      beneficiary,
      approved : false,
      value: value.toString()       
    };

    setId(id+1);
    setEscrows([...escrows, escrow]);
    console.log("LONGUEUR : ", escrows.length);
    // add in the server escrow list json file
    await persistEscrow(escrow);

  }


  return (
    <>
      <div className="contract">
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in ETH)
          <input type="text" id="wei" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">    

          {escrows.map((escrow) => {
            return  <AddContract key={escrow.contract} {...escrow}/>;
            console.log("test");
          })}
          
          
        </div>
      </div>
    </>
  );
}

export default App;
