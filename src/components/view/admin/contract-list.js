import React, { useState } from 'react';
import { Heading, Text, Box } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import ContractListItem from '../../ui/contract-list-item';
import Card from '../../ui/card';
import {
  getDeploymentManagerContract,
  promisifyCall,
} from '../../../utils/contract-utils';

function ContractList() {
  const { t } = useTranslation('contractList');
  const [contractList, setContractList] = useState([]);

  React.useEffect(() => {
    const { ethereum } = window;
    const contract = getDeploymentManagerContract();
    promisifyCall({
      contract,
      method: 'contractsCount',
      params: [ethereum.selectedAddress],
      mapper: result => [window.web3.utils.toBN(result).toNumber()],
    }).then(([numberOfCalls]) => {
      const promises = [];
      let index = 0;
      while (index < numberOfCalls) {
        promises.push(
          promisifyCall({
            contract,
            method: 'deployedContracts',
            params: [ethereum.selectedAddress, index],
            mapper: result => {
              return { deployer: result[0], campaignAddress: result[1] };
            },
          })
        );
        index += 1;
      }
      Promise.all(promises).then(result => {
        setContractList(result);
      });
    });
  }, []);

  return (
    <Card paddingType="default">
      <Heading mb={4} size="sm" color="paragraph">
        {t('List')}
      </Heading>
      <Text color="paragraph">{t('ListDescription')}</Text>
      <Box mt={4}>
        {contractList.map(campaign => {
          return (
            <ContractListItem
              key={campaign.campaignAddress}
              contractAddress={campaign.campaignAddress}
            />
          );
        })}
      </Box>
    </Card>
  );
}

export default ContractList;
