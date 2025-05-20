import React from 'react';

const DeployInstructions = () => {
  return (
    <div className="bg-[#13131a] p-4 rounded-[10px] mt-4">
      <h2 className="font-epilogue font-bold text-[18px] text-white">How to Deploy Your Contract</h2>
      
      <div className="mt-4">
        <h3 className="font-epilogue font-semibold text-[16px] text-[#1dc071]">Option 1: Deploy using ThirdWeb</h3>
        <ol className="list-decimal pl-5 mt-2 text-[#e2e2e2]">
          <li className="mt-1">Visit <a href="https://thirdweb.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#9a6afd] underline">ThirdWeb Dashboard</a></li>
          <li className="mt-1">Connect your wallet</li>
          <li className="mt-1">Select "Deploy" and choose "Contract"</li>
          <li className="mt-1">Upload your CrowdFunding.sol contract file</li>
          <li className="mt-1">Complete the deployment process</li>
          <li className="mt-1">Copy the deployed contract address</li>
          <li className="mt-1">Update the contract address in <code className="bg-[#3a3a43] px-1 rounded">src/context/index.jsx</code></li>
        </ol>
      </div>
      
      <div className="mt-6">
        <h3 className="font-epilogue font-semibold text-[16px] text-[#1dc071]">Option 2: Deploy using Hardhat (Local Development)</h3>
        <ol className="list-decimal pl-5 mt-2 text-[#e2e2e2]">
          <li className="mt-1">Navigate to the web3 directory</li>
          <li className="mt-1">Run <code className="bg-[#3a3a43] px-1 rounded">npm install</code></li>
          <li className="mt-1">Create a <code className="bg-[#3a3a43] px-1 rounded">.env</code> file and add your private key<br/>
            <code className="bg-[#3a3a43] px-1 rounded text-sm">PRIVATE_KEY=your_private_key_without_0x_prefix</code>
          </li>
          <li className="mt-1">Deploy to a testnet (example: Goerli):<br/>
            <code className="bg-[#3a3a43] px-1 rounded text-sm">npx hardhat run scripts/deploy.js --network goerli</code>
          </li>
          <li className="mt-1">Copy the deployed contract address</li>
          <li className="mt-1">Update the contract address in <code className="bg-[#3a3a43] px-1 rounded">src/context/index.jsx</code></li>
        </ol>
      </div>
      
      <div className="mt-4 p-3 bg-[#3a3a43] rounded">
        <p className="text-[#e2e2e2] text-center">
          Once deployed, refresh this page to interact with your contract!
        </p>
      </div>
    </div>
  );
};

export default DeployInstructions; 