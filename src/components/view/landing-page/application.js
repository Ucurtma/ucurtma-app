/* eslint-disable no-useless-escape */
import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import Reaptcha from 'reaptcha';
import { Formik, Form } from 'formik';
import {
  Heading,
  Box,
  Button,
  SimpleGrid,
  Textarea,
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
import { checkID } from '../../../utils/utils';
import ChangeProfilePicture from '../../ui/settings/change-profile-pic';
import config from '../../../config';

// todo: i delete calendar from here. we need new calendar.

const applicationSchema = Yup.object().shape({
  idNumber: Yup.string()
    .required('Bu alan zorunludur.')
    .matches(/^[0-9]{11}$/, 'Kimlik numarası 11 haneli olmalıdır.')
    .test('ID', 'Hatalı kimlik numarası girdiniz.', val => val && checkID(val)),
  name: Yup.string().required('Bu alan zorunludur.'),
  lastname: Yup.string().required('Bu alan zorunludur.'),
  schoolName: Yup.string().required('Bu alan zorunludur.'),
  department: Yup.string().required('Bu alan zorunludur.'),
  address: Yup.string().required('Bu alan zorunludur.'),
  studentEmail: Yup.string()
    .required('Bu alan zorunludur.')
    .matches(/[^@]+@[^\.]+\..+/, 'Geçerli bir email adresi girmelisiniz.'),
  historyAchievements: Yup.string().required('Bu alan zorunludur.'),
  futureAchievements: Yup.string().required('Bu alan zorunludur.'),
  dreams: Yup.string().required('Bu alan zorunludur.'),
  whatIf: Yup.string().required('Bu alan zorunludur.'),
  whyYou: Yup.string().required('Bu alan zorunludur.'),
  birthDate: Yup.string().required('Bu alan zorunludur.'),
  userPhoto: Yup.mixed().required('Bu alan zorunludur'),
  studentIdentification: Yup.mixed().required('Bu alan zorunludur'),
  applicationCheck: Yup.boolean().oneOf(
    [true],
    'Şartları onaylamanız gerekmektedir.'
  ),
});

const APPLY = gql`
  mutation collectCampaignApplication(
    $idNumber: String!
    $name: String!
    $lastname: String!
    $schoolName: String!
    $department: String!
    $address: String!
    $studentEmail: String!
    $questions: [Question!]!
    $userPhoto: Upload!
    $studentIdentification: Upload!
    $verificationCode: String
    $birthDate: String!
  ) {
    collectCampaignApplication(
      idNumber: $idNumber
      name: $name
      lastname: $lastname
      schoolName: $schoolName
      department: $department
      address: $address
      studentEmail: $studentEmail
      questions: $questions
      userPhoto: $userPhoto
      studentIdentification: $studentIdentification
      verificationCode: $verificationCode
      birthDate: $birthDate
    ) {
      name
    }
  }
`;

function Application() {
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState({ avatarURL: null });
  const [userPhoto, setUserPhoto] = useState();
  const [studentIdentification, setStudentIdentification] = useState();
  const [status, setStatus] = useState('empty');
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const captcha = useRef(null);

  const onFileChange = (e, type, documentType) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      if (documentType === 'photo') {
        setUser({ avatarURL: url });
        setUserPhoto(e.target.files[0]);
      }

      if (documentType === 'document') {
        setStudentIdentification(e.target.files[0]);
      }
    }

    if (type === 'delete') {
      if (documentType === 'photo') {
        setUserPhoto(undefined);
        setUser(undefined);
      }

      if (documentType === 'document') {
        setStudentIdentification(undefined);
      }
    }
  };

  const profileQuestions = [
    { label: 'Kimlik Numarası', name: 'idNumber' },
    [
      { label: 'Adı', name: 'name' },
      { label: 'Soyadı', name: 'lastname' },
    ],
    { label: 'Doğum Tarihi', name: 'birthDate', type: 'date' },
    [
      { label: 'Okulu', name: 'schoolName' },
      { label: 'Alanı/Bölümü', name: 'department' },
    ],
    { label: 'İkamet Ettiği Adres', name: 'address' },
    { label: 'E-Posta Adresiniz', name: 'studentEmail', type: 'email' },
  ];

  const commonQuestions = [
    {
      label: 'Geçmişinizdeki üç önemli başarınız neydi?',
      name: 'historyAchievements',
    },
    {
      label: 'Gelecekte hedeflediğiniz üç başarı ne olur?',
      name: 'futureAchievements',
    },
    {
      label: 'En uçuk hayaliniz nedir?',
      name: 'dreams',
    },
    {
      label: 'Destek alamazsanız ne olur?',
      name: 'whatIf',
    },
    {
      label: 'Siz olsaydınız, size neden destek verirdiniz?',
      name: 'whyYou',
    },
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
            idNumber: '',
            name: '',
            lastname: '',
            schoolName: '',
            department: '',
            address: '',
            studentEmail: '',
            historyAchievements: '',
            futureAchievements: '',
            dreams: '',
            whatIf: '',
            whyYou: '',
            birthDate: '',
            applicationCheck: false,
          }}
          validationSchema={applicationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            if (!verified) await captcha.current.execute();
            if (verified) {
              const questions = commonQuestions.map(question => ({
                question: question.label,
                answer: values[question.name],
              }));
              try {
                await apply({
                  variables: {
                    ...values,
                    questions,
                    userPhoto,
                    studentIdentification,
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
          {({ isSubmitting, errors, setFieldValue, handleSubmit }) => (
            <Form>
              <Box>
                <Heading my={4} size="sm" color="gray.600">
                  Profil
                </Heading>
                <SimpleGrid
                  columns={{ base: 1, lg: 2 }}
                  spacingX={{ base: 0, lg: 16 }}
                >
                  <Box>
                    {profileQuestions.map((question, i) => {
                      if (question.type === 'date') {
                        return (
                          <Box key={i.toString()} position="relative">
                            <Input
                              key={question.name}
                              {...question}
                              type="input"
                              isReadOnly
                              onClick={() => setDisplayCalendar(true)}
                            />
                            {displayCalendar && (
                              <Box position="absolute" right="0" zIndex="10">
                                <Box
                                  width="100vw"
                                  height="100vh"
                                  top="0"
                                  left="0"
                                  position="fixed"
                                  onClick={() => setDisplayCalendar(false)}
                                  zIndex="-1"
                                />
                                {/* <Calendar
                                  onChange={date => {
                                    setFieldValue('birthDate', date);
                                    setBirthDate(date);
                                    setDisplayCalendar(false);
                                  }}
                                  maxDate={new Date('2006')}
                                  value={birthDate || new Date('2006')}
                                /> */}
                              </Box>
                            )}
                          </Box>
                        );
                      }
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
                  <Box>
                    <ChangeProfilePicture
                      onChange={(e, type) => {
                        onFileChange(e, type, 'photo');
                        if (type === 'delete') {
                          setFieldValue('userPhoto', '', true);
                        } else {
                          setFieldValue('userPhoto', 'fileAdded', true);
                        }
                      }}
                      isFileExist={user && !!user.avatarURL}
                      avatarURL={user && user.avatarURL}
                      name="userPhoto"
                      accept="image/*"
                    />
                    <ChangeProfilePicture
                      onChange={(e, type) => {
                        onFileChange(e, type, 'document');
                        if (type === 'delete') {
                          setFieldValue('studentIdentification', '', true);
                        } else {
                          setFieldValue(
                            'studentIdentification',
                            'fileAdded',
                            true
                          );
                        }
                      }}
                      title="E-Devlet Öğrenci Belgesi"
                      isFileExist={!!studentIdentification}
                      name="studentIdentification"
                      accept="application/pdf"
                    />
                  </Box>
                </SimpleGrid>
              </Box>
              <Box>
                <Heading my={4} size="sm" color="gray.600">
                  Genel Sorular
                </Heading>
                <SimpleGrid
                  columns={{ base: 1, lg: 2 }}
                  spacingX={{ base: 0, lg: 16 }}
                >
                  {commonQuestions.map(question => (
                    <Input
                      key={question.name}
                      as={Textarea}
                      type="textarea"
                      {...question}
                    />
                  ))}
                </SimpleGrid>
              </Box>
              <Checkbox name="applicationCheck">
                Uçurtma ekibinin başvurumla ilgili benimle iletişime geçmesine
                ve başvurum onaylanana kadar verilerimi güvenli bir şekilde
                saklamasına izin veriyorum.
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
                          : 'Başvurun için teşekkürler.'}
                      </AlertTitle>
                      <AlertDescription>
                        {!status
                          ? 'Lütfen tekrar dene.'
                          : 'En kısa sürede geri dönüş yapacağız. Bu süre içerisinde mail kutunuzu, spam klasörü ile birlikte kontrol etmeyi unutmayın.'}
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
                  color="blue.400"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={
                    (status && status !== 'empty') ||
                    isSubmitting ||
                    Object.keys(errors).length > 0
                  }
                  width={{ base: '100%', md: 'auto' }}
                >
                  Başvur
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default Application;
