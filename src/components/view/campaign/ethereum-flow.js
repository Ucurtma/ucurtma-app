import React, { useRef, useState } from 'react';
import {
  Flex,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  AlertTitle,
  Link,
  Box,
  Heading,
  Text,
  Image,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { Form, Formik } from 'formik';
import Reaptcha from 'reaptcha';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import moment from 'moment';
import Input from '../../ui/input';
import NumberInput from '../../ui/numeric-input';
import config from '../../../config';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from '../../ui/date-picker';
import { checkID } from '../../../utils/utils';
import Agreements from '../../ui/agreements';

const COLLECT_ETH_DONATION = gql`
  mutation collectEthDonation(
    $campaignCode: String!
    $tcIdentity: String!
    $name: String!
    $lastname: String!
    $email: String!
    $dateOfBirth: String!
    $amount: Float!
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
    dateOfBirth: Yup.string().required('Bu alan zorunludur.'),
    lastname: Yup.string().required('Bu alan zorunludur.'),
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz')
      .required('Bu alan zorunludur.'),
    amount: Yup.number()
      .typeError('Geçerli bir rakam giriniz.')
      .min(100, `Girdiğiniz değer 100'den küçük olamaz`)
      .max(1500, `Girdiğiniz değer 1500'den büyük olamaz`)
      .required('Bu alan zorunludur'),
    consentToReceiveNews: Yup.boolean().oneOf(
      [true],
      'Şartları onaylamanız gerekmektedir.'
    ),
    consentToUserAgreement: Yup.boolean().oneOf(
      [true],
      'Şartları onaylamanız gerekmektedir.'
    ),
  });
};

function EthereumFlow() {
  const captcha = useRef(null);
  const params = useParams();
  const [verified, setVerified] = useState(false);
  const [
    collectDonation,
    { loading, error, data },
  ] = useMutation(COLLECT_ETH_DONATION, { onError: err => err });

  return (
    <>
      {!data && (
        <>
          <Alert status="warning" bg="yellow.400" mt={2} mb={4}>
            <AlertIcon color="white" />
            <AlertDescription color="white">
              Bu kampanya sadece BiLira token&apos;ı kabul etmektedir. Bu
              kontrata göndereceğiniz diğer token&apos;lar geri döndürülemez
              biçimde kaybetmenize neden olacaktır.
            </AlertDescription>
          </Alert>
          <Alert bg="gray.50" color="gray.500" mt={2} mb={4}>
            <AlertIcon color="gray.500" />
            <AlertDescription>
              Ethereum cüzdanı ile destek olmak için T.C. Kimlik Numarası ile
              doğrulama yapılması gerekmektedir.
            </AlertDescription>
          </Alert>
        </>
      )}
      {error && (
        <Alert bg="red.400" color="white" mt={2} mb={4}>
          <AlertIcon color="white" />
          <AlertTitle mr={2}>Bir sorun oluştu.</AlertTitle>
          <AlertDescription textAlign="center">
            {error.graphQLErrors.map(err => {
              if (err.message === 'Failed KYC') {
                return 'Kimlik numarası doğrulanamadı.';
              }
              return 'Biz bu sorunu düzeltmek için çalışırken, lütfen daha sonra tekrar deneyin.';
            })}
          </AlertDescription>
        </Alert>
      )}
      {!data ? (
        <Formik
          initialValues={{
            tcIdentity: '',
            name: '',
            lastname: '',
            email: '',
            dateOfBirth: '',
            amount: '',
            consentToReceiveNews: false,
          }}
          validationSchema={collectEthSchema}
          onSubmit={(values, { setSubmitting }) => {
            collectDonation({
              variables: {
                ...values,
                campaignCode: params.id,
                dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD'),
                amount: parseFloat(values.amount),
              },
              context: {
                headers: {
                  captcha: verified,
                },
              },
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, handleSubmit, dirty }) => (
            <Form data-private>
              <Input
                label="T.C. Kimlik No"
                name="tcIdentity"
                placeholder="Kimlik Numaranızı giriniz"
              />
              <Flex flexDir={{ base: 'column', md: 'row' }}>
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
              <Flex flexDir={{ base: 'column', md: 'row' }}>
                <Input
                  label="Email Adresi"
                  name="email"
                  type="email"
                  placeholder="Email adresinizi giriniz"
                  mr={4}
                  controlProps={{ mr: 4 }}
                />
                <DatePicker
                  name="dateOfBirth"
                  openToDate={new Date('1992/08/20')}
                  placeholder="Doğum tarihinizi seçiniz"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  isReadOnly
                />
              </Flex>
              <NumberInput
                label="Destek Miktarı"
                name="amount"
                type="number"
                placeholder="Destek Miktarını giriniz"
                addon={{
                  left: (
                    <Image
                      maxW="12px"
                      width="full"
                      height="full"
                      src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
                      mr={1}
                    />
                  ),
                }}
              />

              <Agreements
                kvkkName="consentToReceiveNews"
                agreementName="consentToUserAgreement"
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
                variant="outline"
                color="linkBlue"
                isLoading={isSubmitting || loading}
                disabled={isSubmitting || !dirty || !isValid}
                width="full"
                onClick={() =>
                  verified ? captcha.current.execute() : handleSubmit()
                }
                mt={4}
              >
                Gönder
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <Alert status="success" bg="green.400" color="white" mt={2} mb={4}>
            <AlertIcon color="white" />
            <AlertDescription mr={2}>
              Kimliğiniz doğrulandı. Gönderdiğiniz destek için teşekkürler.
              Aşağıdaki cüzdan adresine, girdiğiniz destek miktarı kadar BiLira
              gönderdiğinizde, gönderdiğiniz destek kampanya sayfasına
              yansıyacaktır.
            </AlertDescription>
          </Alert>
          <Flex align="center">
            <Link
              mr={4}
              isExternal
              href={`https://etherscan.io/address/${data.collectEthDonation.address}`}
            >
              <Image
                flexShrink="0"
                src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${data.collectEthDonation.address}`}
              />
            </Link>
            <Box>
              <Box mb={4}>
                <Heading size="sm">Ethereum Adresi:</Heading>
                <Text wordBreak="break-all">
                  {data.collectEthDonation.address}
                </Text>
              </Box>
              <Box>
                <Heading size="sm">Göndereceğiniz Destek Miktarı:</Heading>
                <Text wordBreak="break-all">
                  {data.collectEthDonation.amount}
                </Text>
              </Box>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}

export default EthereumFlow;
