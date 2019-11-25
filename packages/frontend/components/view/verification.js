import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  Heading,
  Text,
  Box,
  Button,
  SimpleGrid,
  FormLabel,
  Flex,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/react-hooks';
import Card from '../ui/card';
import Input from '../ui/input';
// import { checkID } from '../../utils/utils';
import { withApollo } from '../../utils/apollo';
import Dropbox from '../ui/dropbox';
import FileInput from '../ui/file-input';

// todo: refactor all file
// todo: add required
const verificationScheme = Yup.object().shape({
  idNumber: Yup.string(),
  // .matches(/^[0-9]{11}$/, 'Length should be 11')
  // .test('ID', 'ID Number is incorrect', val => val && checkID(val)),
  school: Yup.string(),
  field: Yup.string(),
  transcript: Yup.mixed()
    .required('File is required')
    .test('fileFormat', 'PDF only', value => {
      return value && ['application/pdf'].includes(value.type);
    }),
  address: Yup.string(),
  studentEmail: Yup.string().email('Invalid email'),
});

const UPLOAD_FILE = gql`
  mutation uploadFile($type: FileType!, $file: Upload!, $userId: String!) {
    uploadFile(type: $type, file: $file, userId: $userId) {
      fileId
      path
      type
    }
  }
`;

function Verification() {
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onDrop = useCallback((acceptedFile, type) => {
    console.log(acceptedFile, type);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: file => onDrop(file, 'Others'),
    noClick: true,
  });

  return (
    <Card paddingType="default">
      <Heading mb={4} size="sm" color="paragraph">
        Verification
      </Heading>
      <Text color="paragraph" mb={4}>
        Welcome to verification page. To verify your account, we need more
        information about you.
      </Text>
      <Formik
        initialValues={{
          idNumber: '',
          school: '',
          field: '',
          transcript: '',
          address: '',
          studentEmail: '',
          document: '',
        }}
        validationSchema={verificationScheme}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await uploadFile({
            variables: {
              type: 'PROOF_OF_EDUCATION',
              file: values.transcript,
              userId: Math.floor(Math.random() * 100).toString(), // todo: get userID from db when it is ready
            },
          });
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Input label="Identification Number" name="idNumber" type="text" />
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 0, lg: 16 }}
            >
              {/* todo: make select and recursive  */}
              <Input label="School" name="school" type="text" />
              <Input label="Field" name="field" type="text" />
            </SimpleGrid>
            <FileInput
              label="Transcript"
              name="transcript"
              accept="application/pdf"
            />
            <Input label="Address" name="address" type="text" />
            <Input label="Student Email" name="studentEmail" type="email" />
            <FormLabel color="paragraph">Verification Document</FormLabel>
            <Flex
              justifyContent="space-between"
              {...getRootProps()}
              className="mt-8"
            >
              <Dropbox
                icon="idCard"
                type="ID Card"
                onDrop={(file, type) => onDrop(file, type)}
                ml={0}
              />
              <Dropbox
                icon="drivingLicence"
                type="Driving Licence"
                onDrop={(file, type) => onDrop(file, type)}
              />
              <Dropbox
                icon="cloud"
                type="Others"
                onDrop={(file, type) => onDrop(file, type)}
                active={isDragActive}
                mr={0}
              />
            </Flex>
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
    </Card>
  );
}

export default withApollo(Verification);
