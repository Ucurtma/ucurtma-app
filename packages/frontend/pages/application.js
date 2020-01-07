import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Heading, Box, Button, SimpleGrid, Textarea } from '@chakra-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Card from '../components/ui/card';
import Input from '../components/ui/input';
import { checkID } from '../utils/utils';
import ChangeProfilePicture from '../components/ui/settings/change-profile-pic';
import { withApollo } from '../utils/apollo';

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
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu/,
      'Email adresiniz öğrenci maili olmalıdır.'
    ),
  historyAchievements: Yup.string().required('Bu alan zorunludur.'),
  futureAchievements: Yup.string().required('Bu alan zorunludur.'),
  dreams: Yup.string().required('Bu alan zorunludur.'),
  whatIf: Yup.string().required('Bu alan zorunludur.'),
  whyYou: Yup.string().required('Bu alan zorunludur.'),
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
    ) {
      name
    }
  }
`;

function Application() {
  const [user, setUser] = useState({ avatarURL: null });
  const [status, setStatus] = useState('empty');

  const onAvatarChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      // now, we are settings our avatar locally which isn't ok because it is temporary.
      // upload it.
      const url = URL.createObjectURL(e.target.files[0]);
      setUser({ avatarURL: url });
    }

    if (type === 'delete') {
      setUser({ avatarURL: null });
    }
  };

  const profileQuestions = [
    { label: 'Kimlik Numarası', name: 'idNumber' },
    [
      { label: 'Adı', name: 'name' },
      { label: 'Soyadı', name: 'lastname' },
    ],
    [
      { label: 'Okul', name: 'schoolName' },
      { label: 'Alan/Bölümü', name: 'department' },
    ],
    { label: 'Adres', name: 'address' },
    { label: 'Öğrenci Emaili', name: 'studentEmail', type: 'email' },
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
      label: 'Burs alamazsanız ne olur?',
      name: 'whatIf',
    },
    {
      label: 'Siz olsaydınız, size neden burs verirdiniz?',
      name: 'whyYou',
    },
  ];

  const [apply] = useMutation(APPLY);

  return (
    <Card
      pl={{ base: 8, md: 12 }}
      pr={{ base: 8, md: 12 }}
      pb={{ base: 8, md: 12 }}
      mb={8}
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
          }}
          validationSchema={applicationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            const questions = commonQuestions.map(question => ({
              question: question.label,
              answer: values[question.name],
            }));

            try {
              await apply({
                variables: { ...values, questions },
              });
              setStatus(true);
            } catch (err) {
              setStatus(false);
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Box>
                <Heading my={4} size="sm" color="paragraph">
                  Profil
                </Heading>
                <SimpleGrid
                  columns={{ base: 1, lg: 2 }}
                  spacingX={{ base: 0, lg: 16 }}
                >
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
                  <Box>
                    <ChangeProfilePicture
                      onChange={(e, type) => onAvatarChange(e, type)}
                      isAvatarExist={!!user.avatarURL}
                      avatarURL={user.avatarURL}
                    />
                  </Box>
                </SimpleGrid>
              </Box>
              <Box>
                <Heading my={4} size="sm" color="paragraph">
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

              <Box textAlign="right" mt={4}>
                <Button
                  variant="outline"
                  color={!status ? 'red.500' : 'linkBlue'}
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={
                    (status && status !== 'empty') ||
                    isSubmitting ||
                    Object.keys(errors).length > 0
                  }
                >
                  {!status && 'Bir sorun oluştu, tekrar dene.'}
                  {status === 'empty' && 'Başvur'}
                  {status === true &&
                    'Başvurun için teşekkürler, en kısa sürede geri dönüş yapacağız.'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Card>
  );
}

export default withApollo(Application);
