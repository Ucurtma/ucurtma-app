import React, { useContext } from 'react';
import { Heading, Text, Box, Button, Flex } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Card from '../../ui/card';
import Input from '../../ui/input';
import NumberInput from '../../ui/numeric-input';
import { WalletContext } from '../../../App';

function ContractList() {
  const { state: walletState } = useContext(WalletContext);
  const { t } = useTranslation('contractList');

  return (
    <Card paddingType="default">
      <Heading mb={4} size="sm" color="paragraph">
        {t('List')}
      </Heading>
      <Text color="paragraph">{t('ListDescription')}</Text>
      <Box mt={4}>
        <Formik
          initialValues={{
            numberOfPlannedPayouts: 48, // how much donation can be taken from this contract
            withdrawPeriod: 28, // donation per second. 28 days
            campaignEndTime: 30, // when will campaign end after started in seconds?
            owner: '', // the ethereum address of student
            tokenAddress: '0x2c537e5624e4af88a7ae4060c022609376c8d0eb', // the ethereum address of biLira,
            adminAddress: walletState.wallet, // the ethereum address of user who make action with metamask
          }}
        >
          {({ isSubmitting, errors }) => <Form></Form>}
        </Formik>
      </Box>
    </Card>
  );
}

export default ContractList;
