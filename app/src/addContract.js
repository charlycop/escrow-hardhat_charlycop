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
  const buttonId = `approve-${id}`;
  const contractABI = Escrow.abi;

  const deployedContract = new ethers.Contract(contract, contractABI, provider);
  const signer = provider.getSigner()
  const container = document.getElementById('container');

  container.innerHTML += createHTML(buttonId, arbiter, beneficiary, value);
  console.log("ON ENTRE");
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


  // });
}

function createHTML(buttonId, arbiter, beneficiary, value) {
  return `
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
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
