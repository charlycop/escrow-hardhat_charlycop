import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

 export default function AddContract({
  id,
  contract,
  arbiter,
  beneficiary,
  approved,
  value
}
) {
  //return (<div> Arbiter </div>);
  const buttonId = `approve-${id}`;
  // const contractABI = Escrow.abi;

  // const deployedContract = new ethers.Contract(contract, contractABI, provider);
  // const signer = provider.getSigner()
  //const container = document.getElementById('container');

  //container.innerHTML += createHTML(buttonId, arbiter, beneficiary, value);

  // if (approved) {
  //   document.getElementById(buttonId).className = 'complete';
  //   document.getElementById(buttonId).innerText = "✓ It's been approved!";
  // } 

  // document.getElementById(buttonId).addEventListener('click', async () => {
  //   await deployedContract.connect(signer).approve();
  // });

  // deployedContract.on('Approved', () => {
  //   document.getElementById(buttonId).className = 'complete';
  //   document.getElementById(buttonId).innerText = "✓ It's been approved!";
  //   console.log("APPROVED!");

  console.log("ON ENTRE");
  return (createHTML(buttonId, arbiter, beneficiary, value));
 //});
}

function createHTML(buttonId, arbiter, beneficiary, value) {
  return (
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> ID </div>
          <div> ${buttonId} </div>
        </li>
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {ethers.utils.formatEther(value)} ETH </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  );
}
