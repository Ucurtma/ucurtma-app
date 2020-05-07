import React from 'react';
import { Heading, Text, Box, Button, Flex } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Card from '../../ui/card';
import Input from '../../ui/input';
import NumberInput from '../../ui/numeric-input';

function ContractActions() {
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
            tokenAddress: '0x2c537e5624e4af88a7ae4060c022609376c8d0eb', // the ethereum address of biLira,
            adminAddress: '0x2c537e5624e4af88a7ae4060c022609376c8d0eb', // the ethereum address of user who make action with metamask
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
                />
                <NumberInput
                  label={t('withdrawPeriod')}
                  name="withdrawPeriod"
                  type="number"
                  addon={{ right: 'Gün' }}
                />
              </Flex>
              <NumberInput
                label={t('campaignEndTime')}
                name="campaignEndTime"
                type="number"
                addon={{ right: 'Gün' }}
              />
              <Input label={t('owner')} name="owner" />
              <Input label={t('tokenAddress')} name="tokenAddress" disabled />
              <Input label={t('adminAddress')} name="adminAddress" disabled />
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
