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
    .matches(/^[0-9]{11}$/, 'Kimlik numarası 11 haneli olmalıdır.')
    .test('ID', 'Hatalı kimlik numarası girdiniz.', val => val && checkID(val)),
});

function Application() {
  const [user, setUser] = useState({ avatarURL: null });

  const onAvatarChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      // now, we are settings our avatar locally which isn't ok because it is temporary.
      // todo: add user to state management because we should change this avatar in everywhere
      // todo: run change avatar query in here.
      const url = URL.createObjectURL(e.target.files[0]);
      setUser({ avatarURL: url });
    }

    if (type === 'delete') {
      setUser({ avatarURL: null });
    }
  };

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
                      <Input label="Kimlik Numarası" name="idNumber" />
                      <SimpleGrid
                        columns={{ base: 1, lg: 2 }}
                        spacingX={{ base: 0, lg: 5 }}
                      >
                        <Input label="Adı" name="name" />
                        <Input label="Soyadı" name="surnamename" />
                      </SimpleGrid>
                      <SimpleGrid
                        columns={{ base: 1, lg: 2 }}
                        spacingX={{ base: 0, lg: 5 }}
                      >
                        <Input label="Okul" name="school" />
                        <Input label="Alan/Bölümü" name="field" />
                      </SimpleGrid>
                      <Input label="Adres" name="address" />
                      <Input label="Öğrenci Emaili" name="email" type="email" />
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
                    <Input
                      as={Textarea}
                      label="Geçmişinizdeki üç önemli başarınız neydi?"
                      name="historicAchievements"
                      type="textarea"
                    />
                    <Input
                      as={Textarea}
                      label="Gelecekte hedeflediğiniz üç başarı ne olur?"
                      name="futureAchievements"
                      type="textarea"
                    />
                    <Input
                      as={Textarea}
                      label="En uçuk hayaliniz nedir?"
                      name="dreams"
                      type="textarea"
                    />
                    <Input
                      as={Textarea}
                      label="Burs alamazsanız ne olur?"
                      name="whatIf"
                      type="textarea"
                    />
                    <Input
                      as={Textarea}
                      label="Siz olsaydınız, size neden burs verirdiniz?"
                      name="whyYou"
                      type="textarea"
                    />
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
                    Update Info
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
