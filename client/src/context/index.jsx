/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [isContractReady, setIsContractReady] = useState(false);
  
  // You need to deploy your own contract and replace this address
  const { contract } = useContract(
    "0xEaDF1A9E85a5ad682127D8cb24356aAf43c6c8EC"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    if (!contract) {
      console.error("Contract not available. Please deploy your own contract first.");
      return;
    }
    
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    if (!contract) {
      return [];
    }
    
    try {
      const campaigns = await contract.call("getCampaigns");

      const parsedCampaings = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pId: i,
      }));

      return parsedCampaings;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      return [];
    }
  };

  const getUserCampaigns = async () => {
    if (!contract) {
      return [];
    }
    
    try {
      const allCampaigns = await getCampaigns();

      const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner === address
      );

      return filteredCampaigns;
    } catch (error) {
      console.error("Error fetching user campaigns:", error);
      return [];
    }
  };

  const donate = async (pId, amount) => {
    if (!contract) {
      console.error("Contract not available. Please deploy your own contract first.");
      return;
    }
    
    try {
      const data = await contract.call("donateToCampaign", [pId], {
        value: ethers.utils.parseEther(amount),
      });

      return data;
    } catch (error) {
      console.error("Error donating:", error);
      return null;
    }
  };

  const getDonations = async (pId) => {
    if (!contract) {
      return [];
    }
    
    try {
      const donations = await contract.call("getDonators", [pId]);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (error) {
      console.error("Error fetching donations:", error);
      return [];
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        isContractReady,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
