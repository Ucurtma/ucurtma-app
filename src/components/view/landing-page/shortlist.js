/* eslint-disable no-useless-escape */
import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import Reaptcha from 'reaptcha';
import { Formik, Form } from 'formik';
import {
  Box,
  Button,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
} from '@chakra-ui/core';
import { gql, useMutation } from '@apollo/client';
import Input from '../../ui/input';
import Checkbox from '../../ui/checkbox';
import config from '../../../config';

const applicationSchema = Yup.object().shape({
  fullName: Yup.string().required('Bu alan zorunludur.'),
  email: Yup.string()
    .required('Bu alan zorunludur.')
    .matches(/[^@]+@[^\.]+\..+/, 'Geçerli bir email adresi girmelisiniz.'),
  consentToReceiveNews: Yup.boolean().oneOf(
    [true],
    'Şartları onaylamanız gerekmektedir.'
  ),
});

const APPLY = gql`
  mutation collectDonationApplication(
    $fullName: String!
    $email: String!
    $consentToReceiveNews: Boolean!
  ) {
    collectDonationApplication(
      fullName: $fullName
      email: $email
      consentToReceiveNews: $consentToReceiveNews
    ) {
      fullName
    }
  }
`;

function Shorlist() {
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState('empty');
  const captcha = useRef(null);

  const profileQuestions = [
    { label: 'Ad Soyad', name: 'fullName' },
    { label: 'E-Posta Adresi', name: 'email', type: 'email' },
  ];

  const [apply] = useMutation(APPLY);

  return (
    <Box
      pl={{ base: 8, md: 12 }}
      pr={{ base: 8, md: 12 }}
      pb={{ base: 8, md: 12 }}
      bg="white"
    >
      <Box mt={8}>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            consentToReceiveNews: false,
          }}
          validationSchema={applicationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            if (!verified) await captcha.current.execute();
            if (verified) {
              try {
                await apply({
                  variables: {
                    ...values,
                    verificationCode: verified,
                  },
                });
                setStatus(true);
              } catch (err) {
                setStatus(false);
              }
            }
          }}
        >
          {({ isSubmitting, errors, handleSubmit }) => (
            <Form>
              <Box>
                <SimpleGrid columns={1} spacingX={{ base: 0, lg: 16 }}>
                  <Box>
                    {profileQuestions.map((question, i) => {
                      if (question.length > 1) {
                        return (
                          <SimpleGrid
                            key={i.toString()}
                            columns={{ base: 1, lg: question.length }}
                            spacingX={{ base: 0, lg: 5 }}
                          >
                            {question.map(item => (
                              <Input key={item.name} {...item} />
                            ))}
                          </SimpleGrid>
                        );
                      }
                      return <Input key={question.name} {...question} />;
                    })}
                  </Box>
                </SimpleGrid>
              </Box>
              <Checkbox name="consentToReceiveNews">
                Uçurtma ekibinin benimle iletişime geçmesine ve verilerimi
                güvenli bir şekilde saklamasına izin veriyorum.
              </Checkbox>
              <Flex
                justifyContent={
                  status === 'empty' ? 'flex-end' : 'space-between'
                }
                alignItems="center"
                mt={4}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Box display="none">
                  <Reaptcha
                    ref={captcha}
                    sitekey={config.recaptcha}
                    onVerify={response => {
                      setVerified(response);
                      handleSubmit();
                    }}
                    size="invisible"
                  />
                </Box>
                {status !== 'empty' && (
                  <Alert
                    pr={12}
                    mr={12}
                    visibility={status === 'empty' ? 'invisible' : 'visible'}
                    status={!status ? 'error' : 'success'}
                    mb={{ base: 4, md: 0 }}
                    width={{ base: '100%', md: 'auto' }}
                  >
                    <AlertIcon />
                    <Box
                      display={{ base: 'block', md: 'flex' }}
                      alignItems="center"
                    >
                      <AlertTitle mr={2}>
                        {!status
                          ? 'Bir sorun oluştu.'
                          : 'Kaydını oluşturduk, teşekkürler.'}
                      </AlertTitle>
                      <AlertDescription>
                        {!status
                          ? 'Lütfen tekrar dene.'
                          : 'Şu an için çalışmalarımız devam ediyor, en kısa sürede geri dönüş yapacağız.'}
                      </AlertDescription>
                    </Box>
                    <CloseButton
                      type="button"
                      onClick={() => setStatus('empty')}
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                )}
                <Button
                  variant="outline"
                  color="linkBlue.400"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={
                    (status && status !== 'empty') ||
                    isSubmitting ||
                    Object.keys(errors).length > 0
                  }
                  width={{ base: '100%', md: 'auto' }}
                >
                  Listeye Ekle
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Shorlist;
