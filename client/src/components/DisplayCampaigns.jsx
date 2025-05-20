import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';
import { useStateContext } from '../context';
import DeployInstructions from './DeployInstructions';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const { contract } = useStateContext();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!contract && (
          <div className="w-full">
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              No contract detected. This application requires a deployed CrowdFunding contract.
            </p>
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              Please deploy your own contract and update the contract address in src/context/index.jsx.
            </p>
            <DeployInstructions />
          </div>
        )}

        {!isLoading && contract && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={uuidv4()}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns