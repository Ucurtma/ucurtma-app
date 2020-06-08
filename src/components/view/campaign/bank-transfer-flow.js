import React, { useContext, lazy, Suspense } from 'react';
import * as Yup from 'yup';
import {
  Box,
  Flex,
  Button,
  Alert,
  AlertIcon,
  Image,
  Link,
  Text,
  SimpleGrid,
  AlertDescription,
  ModalBody,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import gql from 'graphql-tag';
import Input from '../../ui/input';
import Checkbox from '../../ui/checkbox';
import { getBiLiraToken, removeBiLiraToken } from '../../../utils/utils';
import { WalletContext } from '../../../App';
import Loader from '../../ui/loader';

const ClarificationText = lazy(() => import('../clarification-text'));
const DirectConsent = lazy(() => import('../direct-consent'));

// todo: make different component for functions in this file.

const LoginWithBiLira = ({ href, ...otherProps }) => {
  return (
    <>
      <Box
        mb={4}
        p={4}
        bg="gray.100"
        border="1px solid"
        borderColor="gray.300"
        color="gray.600"
      >
        <Box as="p" mb={4}>
          Yapacağınız destekleri güvenli ve hızlı bir şekilde öğrencimize
          ulaştırabilmek için
          <Link
            href="https://www.bilira.com"
            isExternal="true"
            color="blue.500"
          >
            {' '}
            BiLira{' '}
          </Link>
          ile çalışıyoruz.
        </Box>
        <Box as="p">
          Aşağıdaki bağlantıyı kullanarak bu sayfayı terk etmeden hızlıca hesap
          oluşturabilir, varolan hesabınızla transferi yapacağınız banka
          hesabına kolayca ulaşabilirsiniz.
        </Box>
      </Box>
      <Link href={href}>
        <Button
          bg="#04144c"
          _hover={{ bg: '#020c2d' }}
          color="#fff"
          width="full"
          padding={3}
          height="auto"
          {...otherProps}
        >
          <Image
            alt="Login with BiLira"
            src={`${process.env.PUBLIC_URL}/images/bilira-logo.svg`}
            w="80px"
          />
          <Text ml={2} fontWeight={400}>
            ile giriş yap
          </Text>
        </Button>
      </Link>
    </>
  );
};

const SelectBank = ({ bankData, onSelect, selectedBank }) => {
  return (
    <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4} mb={4}>
      {bankData.systemBankAccounts.map(bankAccount => (
        <Button
          key={bankAccount.id}
          variant="ghost"
          border="1px solid"
          borderColor="gray.100"
          onClick={() => onSelect(bankAccount.id)}
          bg={selectedBank === bankAccount.id ? 'gray.100' : 'transparent'}
        >
          <Image
            alt={bankAccount.name}
            src={`${process.env.PUBLIC_URL}/images/banks/${bankAccount.id}.png`}
          />
        </Button>
      ))}
    </SimpleGrid>
  );
};

const GET_BANKS = gql`
  {
    systemBankAccounts {
      id
      name
      iban
    }
  }
`;

const GET_OAUTH_URL = gql`
  query biliraOAuthUrl($campaignId: String!) {
    biliraOAuthUrl(campaignId: $campaignId) {
      authorizationUri
    }
  }
`;

const COLLECT_DONATION = gql`
  mutation collectDonation(
    $campaignCode: String!
    $bankId: Int
    $email: String!
    $amount: Float!
  ) {
    collectDonation(
      campaignCode: $campaignCode
      bankId: $bankId
      email: $email
      amount: $amount
    ) {
      iban
      bankName
      referenceCode
    }
  }
`;

function createSchema(limit) {
  const donateSchema = Yup.object().shape({
    email: Yup.string()
      .required('Bu alan zorunludur.')
      .matches(/[^@]+@[^.]+\..+/, 'Geçerli bir email adresi girmelisiniz.'),
    amount: Yup.number()
      .min(
        limit || 100,
        `Girdiğiniz değer ${limit || 100} değerinden küçük olamaz`
      )
      .typeError('Geçerli bir rakam giriniz.')
      .required('Bu alan zorunludur.'),
    consentToReceiveNews: Yup.boolean().oneOf(
      [true],
      'Şartları onaylamanız gerekmektedir.'
    ),
  });

  return donateSchema;
}

function BankTransferFlow({ minimumAmount }) {
  const params = useParams();
  const [currentBank, setCurrentBank] = React.useState(-1);
  const [tokenRemoved, setTokenRemoved] = React.useState(false);
  const { dispatch } = useContext(WalletContext);
  const [getOauthUrl, { data: oauthData }] = useLazyQuery(GET_OAUTH_URL, {
    variables: {
      campaignId: params.id,
    },
  });
  const [
    getBanks,
    { error: bankError, data: bankData, loading: bankLoading },
  ] = useLazyQuery(GET_BANKS, {
    context: {
      headers: {
        oauth2: getBiLiraToken(),
      },
    },
  });
  const [collectDonation, { data: donationData }] = useMutation(
    COLLECT_DONATION
  );

  React.useLayoutEffect(() => {
    const biLiraAuth = getBiLiraToken();
    if (biLiraAuth) {
      getBanks();
    } else {
      getOauthUrl();
    }
  }, [bankData, getBanks, getOauthUrl]);

  if (bankLoading) {
    return (
      <Box textAlign="center">
        <Skeleton count={4} />
      </Box>
    );
  }

  if (bankError) {
    bankError.graphQLErrors.forEach(error => {
      if (error.extensions.exception.statusCode === 401 && !tokenRemoved) {
        removeBiLiraToken();
        setTokenRemoved(true);
        getOauthUrl();
      }
    });

    return (
      <Box mt={2} mb={4}>
        <Alert status="error">
          <AlertIcon />
        </Alert>
        {oauthData && (
          <LoginWithBiLira
            mt={4}
            href={oauthData.biliraOAuthUrl.authorizationUri}
          />
        )}
      </Box>
    );
  }
  if (!getBiLiraToken() && oauthData) {
    return <LoginWithBiLira href={oauthData.biliraOAuthUrl.authorizationUri} />;
  }

  if (donationData) {
    const { bankName, iban, referenceCode } = donationData.collectDonation;
    return (
      <Box>
        <Alert status="success">
          <AlertDescription>
            Gönderdiğiniz destek için teşekkürler. Gönderdiğiniz desteğin
            onaylanması için{' '}
            <strong>
              {bankName} {iban}
            </strong>{' '}
            IBAN numarasına, Alıcı ismini <strong>Bilira Teknoloji A.Ş</strong>{' '}
            olarak belirtmek ve açıklamasına <strong>{referenceCode}</strong>{' '}
            yazarak desteklediğiniz kadar ücreti göndermeniz gerekmektedir.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  const setModalOpen = type => {
    const isClarificationText = type === 'clarificationText';

    dispatch({
      type: 'SET_MODAL',
      payload: {
        isOpen: true,
        otherProps: { size: '6xl' },
        content: (
          <>
            <Suspense fallback={<Loader />}>
              <ModalBody p={12}>
                {isClarificationText ? (
                  <ClarificationText />
                ) : (
                  <DirectConsent />
                )}
              </ModalBody>
            </Suspense>
          </>
        ),
      },
    });
  };

  return (
    <Box mt={2} mb={4}>
      {bankData && (
        <SelectBank
          bankData={bankData}
          onSelect={bankId => setCurrentBank(bankId)}
          selectedBank={currentBank}
        />
      )}
      {currentBank !== -1 && (
        <Formik
          initialValues={{
            email: '',
            amount: '',
            consentToReceiveNews: false,
          }}
          validationSchema={createSchema(minimumAmount)}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            collectDonation({
              variables: {
                campaignCode: params.id,
                bankId: parseInt(currentBank, 10),
                email: values.email,
                amount: parseFloat(values.amount),
              },
              context: {
                headers: {
                  oauth2: getBiLiraToken(),
                },
              },
            });
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Box>
                <Input label="E-Posta Adresi" name="email" type="email" />
                <Input label="Destek Miktarı" name="amount" />
              </Box>
              <Checkbox name="consentToReceiveNews">
                Kişisel verileri koruma kapsamında{' '}
                <Button
                  variant="link"
                  onClick={() => setModalOpen('clarificationText')}
                >
                  aydınlatma metnini
                </Button>{' '}
                ve{' '}
                <Button
                  variant="link"
                  onClick={() => setModalOpen('directConsent')}
                >
                  açık rıza beyan formunu
                </Button>{' '}
                okudum, anladım ve onaylıyorum.
              </Checkbox>
              <Flex
                alignItems="center"
                mt={4}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Button
                  variant="outline"
                  color="linkBlue"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  width="full"
                >
                  Gönder
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
}

export default BankTransferFlow;
