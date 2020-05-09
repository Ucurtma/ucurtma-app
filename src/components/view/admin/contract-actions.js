import React, { useContext } from 'react';
import { Heading, Text, Box, Button, Flex } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Card from '../../ui/card';
import Input from '../../ui/input';
import NumberInput from '../../ui/numeric-input';
import { WalletContext } from '../../../App';
import {
  getDeploymentManagerContract,
  getEtherscanAddressFor,
} from '../../../utils/contract-utils';
import config from '../../../config';

function ContractActions() {
  const { state: walletState } = useContext(WalletContext);
  const { t } = useTranslation('contractActions');

  return (
    <Card paddingType="default">
      <Heading mb={4} size="sm" color="paragraph">
        {t('Deploy')}
      </Heading>
      <Text color="paragraph">{t('DeployDescription')}</Text>
      <Box mt={4}>
        <Formik
          initialValues={{
            numberOfPlannedPayouts: 48, // how much donation can be taken from this contract
            withdrawPeriod: 28, // donation per second. 28 days
            campaignEndTime: 30, // when will campaign end after started in seconds?
            owner: '', // the ethereum address of student
            tokenAddress: config.ethereum.biliraTokenAddress, // the ethereum address of biLira,
            adminAddress: walletState.wallet, // the ethereum address of user who make action with metamask
          }}
          onSubmit={(values, { setSubmitting }) => {
            const deploymentManager = getDeploymentManagerContract();
            const eventFilter = deploymentManager.NewFundingContract({
              __owner: values.owner,
            });
            eventFilter.watch((error, event) => {
              if (error) {
                // TODO: Or show error dialog
                console.log(`Error: ${error}`);
              } else {
                // TODO: Show success dialog.
                console.log(
                  `Campaign Contract Deployed at '${
                    event.args.deployedAddress
                  }'. Click here: ${getEtherscanAddressFor({
                    type: 'address',
                    hash: event.args.deployedAddress,
                  })}`
                );
              }
            });

            deploymentManager.deploy(
              values.numberOfPlannedPayouts,
              parseInt(values.withdrawPeriod, 10) * 60 * 60 * 60 * 24,
              parseInt(values.campaignEndTime, 10) * 60 * 60 * 60 * 24,
              values.owner,
              values.tokenAddress,
              (err, result) => {
                if (!err) {
                  // TODO: Show this transaction hash with some sort of notification and link to etherscan.
                  // TODO: https://etherscan.io/tx/${result} or https://rinkeby.etherscan.io/tx/${result}
                  console.log(
                    `Transaction hash: '${result}'. Click here: ${getEtherscanAddressFor(
                      {
                        hash: result,
                      }
                    )}`
                  );
                } else {
                  // TODO: show error dialog
                  console.log(`Error: ${err}`);
                }
              }
            );

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Flex>
                <NumberInput
                  label={t('numberOfPlannedPayouts')}
                  name="numberOfPlannedPayouts"
                  type="number"
                  controlProps={{ mr: 4 }}
                  disabled={!walletState.wallet}
                />
                <NumberInput
                  label={t('withdrawPeriod')}
                  name="withdrawPeriod"
                  type="number"
                  addon={{ right: 'Gün' }}
                  disabled={!walletState.wallet}
                />
              </Flex>
              <NumberInput
                label={t('campaignEndTime')}
                name="campaignEndTime"
                type="number"
                addon={{ right: 'Gün' }}
                disabled={!walletState.wallet}
              />
              <Input
                label={t('owner')}
                disabled={!walletState.wallet}
                name="owner"
              />
              <Input label={t('tokenAddress')} disabled name="tokenAddress" />
              <Input
                label={t('adminAddress')}
                value={walletState.wallet}
                disabled
                name="adminAddress"
              />
              <Flex justifyContent="flex-end">
                <Button
                  color="gray.800"
                  bg="linkGreen"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  width="full"
                  maxW="200px"
                  ml="auto"
                >
                  {t('DeployAction')}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Card>
  );
}

export default ContractActions;
