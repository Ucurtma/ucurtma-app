import React, { useContext } from 'react';
import {
  Heading,
  Text,
  Box,
  Button,
  Flex,
  RadioGroup,
  Radio,
  FormLabel,
  useToast,
  Link,
} from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
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

const deployContractSchema = t => {
  const { web3 } = window;
  return Yup.object().shape({
    numberOfPlannedPayouts: Yup.string().required(t('validations.required')),
    withdrawPeriod: Yup.string().required(t('validations.required')),
    campaignEndTime: Yup.string().required(t('validations.required')),
    owner: Yup.string()
      .required(t('validations.required'))
      .test(
        'Check Address',
        t('validations.incorrectAddress'),
        value => value && web3.utils.isAddress(value)
      ),
    tokenAddress: Yup.string().required(t('validations.required')),
  });
};

function ContractActions() {
  const { state: walletState } = useContext(WalletContext);
  const toast = useToast();
  const { t } = useTranslation('contractActions');
  const commonToastProps = {
    duration: 10000,
    isClosable: true,
    position: 'top-right',
  };

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
          validationSchema={deployContractSchema(t)}
          onSubmit={(values, { setSubmitting, setFieldValue }) => {
            setSubmitting(true);

            const deploymentManager = getDeploymentManagerContract();
            const eventFilter = deploymentManager.NewFundingContract({
              __owner: values.owner,
            });

            eventFilter.watch((error, event) => {
              if (error) {
                toast({
                  title: t('deployErrorTitle'),
                  description: t('deployErrorDesc'),
                  status: 'error',
                  ...commonToastProps,
                });
                console.log(`Error: ${error}`);
                setSubmitting(false);
              } else {
                toast({
                  title: t('deploySuccessTitle'),
                  description: (
                    <Link
                      href={getEtherscanAddressFor({
                        type: 'address',
                        hash: event.args.deployedAddress,
                      })}
                    >
                      {t('deploySuccessDesc')}
                    </Link>
                  ),
                  status: 'success',
                  ...commonToastProps,
                });
                setFieldValue('owner', '');
                setSubmitting(false);
                console.log('no error');
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
                      { hash: result }
                    )}`
                  );
                  toast({
                    title: t('deployStartedTitle'),
                    description: (
                      <Link href={getEtherscanAddressFor({ hash: result })}>
                        {t('deployStartedDesc')}
                      </Link>
                    ),
                    status: 'warning',
                    ...commonToastProps,
                  });
                } else {
                  toast({
                    title:
                      err.code === 4001
                        ? "MetaMask'tan izin alınamadı."
                        : 'Bir hata oluştu.',
                    description:
                      err.code === 4001
                        ? 'Bu işlem için MetaMask uygulamasından izin vermeniz gerekmektedir.'
                        : `Hata kodu: ${err.code}`,
                    status: 'error',
                    ...commonToastProps,
                  });
                  console.log('error');
                  setSubmitting(false);
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
              <Box mb={4}>
                <FormLabel color="paragraph">{t('tokenAddress')}</FormLabel>
                <RadioGroup defaultValue="biLira" isInline>
                  <Radio value="biLira" isDisabled key="biLira">
                    BiLira
                  </Radio>
                </RadioGroup>
              </Box>
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
