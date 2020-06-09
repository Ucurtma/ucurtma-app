import React, { useRef, useState } from 'react';
import {
  Flex,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { Form, Formik } from 'formik';
import Reaptcha from 'reaptcha';
import * as Yup from 'yup';
import Input from '../../ui/input';
import config from '../../../config';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from '../../ui/date-picker';
import { checkID } from '../../../utils/utils';

const COLLECT_ETH_DONATION = gql`
  mutation collectEthDonation(
    $campaignCode: String!
    $tcIdentity: String!
    $name: String!
    $lastname: String!
    $email: String!
    $dateOfBirth: String!
    $amount: String!
  ) {
    collectEthDonation(
      campaignCode: $campaignCode
      tcIdentity: $tcIdentity
      name: $name
      lastname: $lastname
      email: $email
      dateOfBirth: $dateOfBirth
      amount: $amount
    ) {
      amount
      address
    }
  }
`;

const collectEthSchema = () => {
  return Yup.object().shape({
    tcIdentity: Yup.string()
      .required('Bu alan zorunludur.')
      .matches(/^[0-9]{11}$/, 'Kimlik numarası 11 haneli olmalıdır.')
      .test(
        'ID',
        'Hatalı kimlik numarası girdiniz.',
        val => val && checkID(val)
      ),
    name: Yup.string().required('Bu alan zorunludur.'),
    lastname: Yup.string().required('Bu alan zorunludur.'),
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz')
      .required('Bu alan zorunludur.'),
    amount: Yup.number()
      .typeError('Geçerli bir rakam giriniz.')
      .required('Bu alan zorunludur'),
  });
};

function EthereumFlow({ ethereumAddress }) {
  const captcha = useRef(null);
  const [verified, setVerified] = useState(false);

  return (
    <>
      <Alert status="error" bg="gray.50" mt={2} mb={4}>
        <AlertIcon color="gray.600" />
        <AlertDescription mr={2} color="gray.600">
          Bu kampanya sadece BiLira token&apos;ı kabul etmektedir. Bu kontrata
          göndereceğiniz diğer token&apos;lar geri döndürülemez biçimde
          kaybetmenize neden olacaktır.
        </AlertDescription>
      </Alert>
      <Alert status="error" bg="red.400" mt={2} mb={4}>
        <AlertIcon color="white" />
        <AlertDescription mr={2} color="white">
          Ethereum cüzdanı ile destek olmak için T.C. Kimlik Numarası ile
          doğrulama yapılması gerekmektedir.
        </AlertDescription>
      </Alert>
      <Formik
        initialValues={{
          tcIdentity: '',
          name: '',
          lastname: '',
          email: '',
          dateOfBirth: '',
          amount: '',
        }}
        validationSchema={collectEthSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, handleSubmit, dirty }) => (
          <Form>
            <Input
              label="T.C. Kimlik No"
              name="tcIdentity"
              placeholder="Kimlik Numaranızı giriniz"
            />
            <Flex>
              <Input
                label="İsim"
                name="name"
                placeholder="İsminizi giriniz"
                controlProps={{ mr: 4 }}
              />
              <Input
                label="Soyisim"
                name="lastname"
                placeholder="Soyisminizi giriniz"
              />
            </Flex>
            <Flex>
              <Input
                label="Email Adresi"
                name="email"
                placeholder="Email adresinizi giriniz"
                mr={4}
                controlProps={{ mr: 4 }}
              />
              <DatePicker
                name="dateOfBirth"
                openToDate={new Date('1992/08/20')}
                placeholder="Doğum tarihinizi seçiniz"
              />
              {/* <Input
                label="Doğum Tarihi"
                name="dateOfBirth"
                placeholder="Doğum Tarihinizi giriniz"
              /> */}
            </Flex>
            <Input
              label="Destek Miktarı"
              name="amount"
              placeholder="Destek Miktarını giriniz"
            />

            <Reaptcha
              ref={captcha}
              sitekey={config.recaptcha}
              onVerify={response => {
                setVerified(response);
                handleSubmit();
              }}
              size="invisible"
            />

            <Button
              type="button"
              width="100%"
              bg="primaryButton"
              fontWeight="regular"
              size="lg"
              mt={2}
              // isLoading={loading}
              disabled={
                // data ||
                isSubmitting || !dirty || !isValid
              }
              onClick={() => captcha.current.execute()}
            >
              Destek Gönder
            </Button>
          </Form>
        )}
      </Formik>
      {/* <Flex align="center">
        <Link
          mr={4}
          isExternal
          href={`https://etherscan.io/address/${ethereumAddress}`}
        >
          <Image
            flexShrink="0"
            src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${ethereumAddress}`}
          />
        </Link>
        <Box>
          <Heading size="sm">Ethereum Adresi:</Heading>{' '}
          <Text wordBreak="break-all">{ethereumAddress}</Text>
        </Box>
      </Flex> */}
    </>
  );
}

export default EthereumFlow;
