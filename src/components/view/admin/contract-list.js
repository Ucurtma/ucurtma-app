import React, { useContext, useState } from 'react';
import { Heading, Text, Box } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import Card from '../../ui/card';
import { WalletContext } from '../../../App';
import {
  getDeploymentManagerContract,
  promisifyCall,
} from '../../../utils/contract-utils';

function ContractList() {
  const [contractList, setContractList] = React.useState([]);

  React.useEffect(() => {
    const { ethereum } = window;
    const contract = getDeploymentManagerContract();
    promisifyCall({
      contract,
      method: 'contractsCount',
      params: [ethereum.selectedAddress],
      mapper: result => result.c,
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
        index++;
      }
      Promise.all(promises).then(result => {
        setContractList(result);
      });
    });
  }, []);
  const { state: walletState } = useContext(WalletContext);
  const { t } = useTranslation('contractList');

  return (
    <Card paddingType="default">
      <Heading mb={4} size="sm" color="paragraph">
        {t('List')}
      </Heading>
      <Text color="paragraph">{t('ListDescription')}</Text>
      <Box mt={4}>
        {contractList.map(campaign => {
          return <Box>{campaign.campaignAddress}</Box>;
        })}
      </Box>
    </Card>
  );
}

export default ContractList;
