import React, { useContext } from 'react';
import { Heading, Text, Box, Button, Flex } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Card from '../../ui/card';
import Input from '../../ui/input';
import NumberInput from '../../ui/numeric-input';
import { WalletContext } from '../../../App';

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
            tokenAddress: '0x2c537e5624e4af88a7ae4060c022609376c8d0eb', // the ethereum address of biLira,
            adminAddress: walletState.wallet, // the ethereum address of user who make action with metamask
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { eth } = window;
            const tokenABI = JSON.parse(
              '[{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"deployedContracts","outputs":[{"internalType":"address","name":"deployer","type":"address"},{"internalType":"address","name":"contractAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_erc20Deployer","type":"address"}],"name":"updateERC20Deployer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_numberOfPlannedPayouts","type":"uint256"},{"internalType":"uint256","name":"_withdrawPeriod","type":"uint256"},{"internalType":"uint256","name":"_campaignEndTime","type":"uint256"},{"internalType":"address payable","name":"__owner","type":"address"},{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"deploy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"bool","name":"_isAllowed","type":"bool"}],"name":"updateAllowedUserPermission","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowedUsers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_recipient","type":"address"}],"name":"destroyAndSend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_erc20Deployer","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"deployedAddress","type":"address"},{"indexed":true,"internalType":"address","name":"deployer","type":"address"}],"name":"NewFundingContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]'
            );

            const byteCode =
              '608060405234801561001057600080fd5b5060405161072d38038061072d8339818101604052602081101561003357600080fd5b5051600080546001600160a01b0319908116339081178355600180546001600160a01b0390951694909216939093178155918152600260205260409020805460ff191690911790556106a38061008a6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638da5cb5b116100665780638da5cb5b1461015a578063e02286d11461017e578063f2fde38b146101ac578063f3d1306d146101d2578063f5074f411461020c57610093565b80634596755514610098578063609230ac146100ea578063799468ad1461011257806383197ef014610152575b600080fd5b6100c4600480360360408110156100ae57600080fd5b506001600160a01b038135169060200135610232565b604080516001600160a01b03938416815291909216602082015281519081900390910190f35b6101106004803603602081101561010057600080fd5b50356001600160a01b0316610276565b005b610110600480360360a081101561012857600080fd5b508035906020810135906040810135906001600160a01b03606082013581169160800135166102af565b610110610488565b6101626104ad565b604080516001600160a01b039092168252519081900360200190f35b6101106004803603604081101561019457600080fd5b506001600160a01b03813516906020013515156104bc565b610110600480360360208110156101c257600080fd5b50356001600160a01b0316610559565b6101f8600480360360208110156101e857600080fd5b50356001600160a01b03166105de565b604080519115158252519081900360200190f35b6101106004803603602081101561022257600080fd5b50356001600160a01b03166105f3565b6003602052816000526040600020818154811061024b57fe5b6000918252602090912060029091020180546001909101546001600160a01b03918216935016905082565b6000546001600160a01b0316331461028d57600080fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b3360009081526002602052604090205460ff1615156001146103025760405162461bcd60e51b81526004018080602001828103825260298152602001806106176029913960400191505060405180910390fd5b6001600160a01b0381166103475760405162461bcd60e51b815260040180806020018281038252602f815260200180610640602f913960400191505060405180910390fd5b600154604080516302c20beb60e61b81526004810188905260248101879052604481018690526001600160a01b03858116606483015284811660848301523360a48301529151600093929092169163b082fac09160c48082019260209290919082900301818787803b1580156103bc57600080fd5b505af11580156103d0573d6000803e3d6000fd5b505050506040513d60208110156103e657600080fd5b5051336000818152600360209081526040808320815180830183528581526001600160a01b038088168286018181528454600181810187559589529688209351600290970290930180549683166001600160a01b031997881617815592519290930180549290911691909416179092555193945091927f5ec743f1d0419091a427f519206ded3ef1711d57bdf2e82e2ad58a38b6165c259190a3505050505050565b6000546001600160a01b0316331461049f57600080fd5b6000546001600160a01b0316ff5b6000546001600160a01b031681565b6000546001600160a01b031633146104d357600080fd5b6001600160a01b03821661052e576040805162461bcd60e51b815260206004820152601c60248201527f55736572206d75737420626520612076616c6964206164647265737300000000604482015290519081900360640190fd5b6001600160a01b03919091166000908152600260205260409020805460ff1916911515919091179055565b6000546001600160a01b0316331461057057600080fd5b6001600160a01b03811661058357600080fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60026020526000908152604090205460ff1681565b6000546001600160a01b0316331461060a57600080fd5b806001600160a01b0316fffe596f7520617265206e6f7420616c6c6f77656420746f206465706c6f7920612063616d706169676e2e43616e206f6e6c79206465706c6f792045524332302046756e64696e672043616d706169676e20436f6e7472616374a265627a7a7231582082deeb6ed38e4d77a35141248e63065ccd03fd5d9f0dd41c92b44a263d68918d64736f6c634300050b00320000000000000000000000000b972a1fa7f2a3833f04e2b2b75a78b7096ace77';

            eth.accounts().then(account => {
              const SimpleStore = eth.contract(tokenABI, byteCode, {
                from: account[0],
                gas: 900000,
              });

              const simpleStoreInstance = SimpleStore.at(
                '0x0E21a3218EB8bF3aAF9b22d89b117A767DD6a2fF'
              );

              simpleStoreInstance
                .deploy(
                  values.numberOfPlannedPayouts,
                  parseInt(values.withdrawPeriod, 10) * 60 * 60 * 60 * 24,
                  parseInt(values.campaignEndTime, 10) * 60 * 60 * 60 * 24,
                  values.owner,
                  values.tokenAddress
                )
                .then(result => console.log(result))
                .catch(err => console.log(err));
            });

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
