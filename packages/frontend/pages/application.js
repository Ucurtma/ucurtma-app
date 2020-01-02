import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  Flex,
  Link,
  Icon,
  Heading,
  Box,
  Button,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import Card from '../components/ui/card';
import Container from '../components/ui/container';
import Input from '../components/ui/input';
import { checkID } from '../utils/utils';
import ChangeProfilePicture from '../components/ui/settings/change-profile-pic';

const applicationSchema = Yup.object().shape({
  idNumber: Yup.string()
    .required('Bu alan zorunludur.')
    .matches(/^[0-9]{11}$/, 'Kimlik numarası 11 haneli olmalıdır.')
    .test('ID', 'Hatalı kimlik numarası girdiniz.', val => val && checkID(val)),
  name: Yup.string().required('Bu alan zorunludur.'),
  surname: Yup.string().required('Bu alan zorunludur.'),
  school: Yup.string().required('Bu alan zorunludur.'),
  field: Yup.string().required('Bu alan zorunludur.'),
  address: Yup.string().required('Bu alan zorunludur.'),
  email: Yup.string()
    .required('Bu alan zorunludur.')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu/,
      'Email adresiniz öğrenci maili olmalıdır.'
    ),
});

function Application() {
  const [user, setUser] = useState({ avatarURL: null });

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
      { label: 'Soyadı', name: 'surname' },
    ],
    [
      { label: 'Okul', name: 'school' },
      { label: 'Alan/Bölümü', name: 'field' },
    ],
    { label: 'Adres', name: 'address' },
    { label: 'Öğrenci Emaili', name: 'email', type: 'email' },
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

  return (
    <Container>
      <Card
        pt={{ base: 8, md: 12 }}
        pl={{ base: 8, md: 12 }}
        pr={{ base: 8, md: 12 }}
        pb={{ base: 8, md: 12 }}
        mb={8}
      >
        <Flex
          flexDir="column"
          justifyContent={{ md: 'space-between' }}
          bg="red"
        >
          <NextLink href="/">
            <Link display="contents" id="logo">
              <Icon name="logo" size="4rem" />
            </Link>
          </NextLink>
        </Flex>
        <Box mt={16}>
          <Formik
            initialValues={{ idNumber: '' }}
            validationSchema={applicationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
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
                    color="linkBlue"
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                  >
                    Başvur
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Card>
    </Container>
  );
}

export default Application;
