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

  return (createHTML(buttonId, arbiter, beneficiary, value, contract, approved));
}

async function  configLink(buttonId, contract, approved){
  const contractABI = Escrow.abi;
  const deployedContract = new ethers.Contract(contract, contractABI, provider);
  const signer = provider.getSigner();

  // console.log('is Approved ?' , await deployedContract.connect(signer).isApproved());

  deployedContract.on('Approved', () => {
    document.getElementById(buttonId).className = 'complete';
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  await deployedContract.connect(signer).approve();
}

function createHTML(buttonId, arbiter, beneficiary, value, contract, approved) {

  
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
        <div class="button" id={buttonId}
        onClick={(e) => {
          e.preventDefault();
          configLink(buttonId, contract, approved);
        }}
        >
          Approve
        </div>
      </ul>
    </div>
  );
}
