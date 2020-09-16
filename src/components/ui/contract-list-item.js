import React, { useState, useEffect } from 'react';
import { Box, Badge, Link } from '@chakra-ui/core';
import {
  getCampaignContract,
  promisifyCall,
  getEtherscanAddressFor,
} from '../../utils/contract-utils';

function ContractListItem({ contractAddress }) {
  const { web3 } = window;
  const [campaignItem, setCampaignItem] = useState([]);
  useEffect(() => {
    const contract = getCampaignContract(contractAddress);
    Promise.all([
      promisifyCall({
        contract,
        method: 'totalBalance',
        params: [contractAddress],
        mapper: result => [web3.utils.toBN(result).toNumber()],
      }),
      promisifyCall({
        contract,
        method: 'lastWithdraw',
        params: [],
        mapper: result => [web3.utils.toBN(result).toNumber()],
      }),
      promisifyCall({
        contract,
        method: 'totalNumberOfPayoutsLeft',
        params: [],
        mapper: result => [web3.utils.toBN(result).toNumber()],
      }),
      promisifyCall({
        contract,
        method: 'cancelled',
        params: [],
      }),
    ]).then(results => {
      setCampaignItem({
        contractAddress,
        totalBalance: results[0],
        lastWithdraw: results[1],
        totalNumberOfPayoutsLeft: results[2],
        cancelled: results[3],
      });
    });
  }, [contractAddress, web3.utils]);
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      margin="20px"
      backgroundColor={campaignItem.cancelled ? 'tomato' : ''}
    >
      <Box p="2">
        <Badge rounded="full" px="2" variantColor="teal">
          <Link
            href={`${getEtherscanAddressFor({
              type: 'address',
              hash: campaignItem.contractAddress,
            })}`}
          >
            {campaignItem.contractAddress}
          </Link>
        </Badge>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        >
          Toplam {campaignItem.totalBalance} Bilira
        </Box>
      </Box>
    </Box>
  );
}

export default ContractListItem;
