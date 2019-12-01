import React, { useState } from 'react';
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
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Card from '../ui/card';
import Input from '../ui/input';
import { checkID } from '../../utils/utils';
import { withApollo } from '../../utils/apollo';
import Dropbox from '../ui/dropbox';
import FileInput from '../ui/file-input';
import VerificationSuccess from '../ui/verification-success';

// todo: refactor all file
// todo: add required
const verificationScheme = Yup.object().shape({
  idNumber: Yup.string()
    .matches(/^[0-9]{11}$/, 'Length should be 11')
    .test('ID', 'ID Number is incorrect', val => val && checkID(val)),
  school: Yup.string(),
  field: Yup.string(),
  transcript: Yup.mixed()
    .required('Transcript file is required')
    .test('fileFormat', 'PDF only', value => {
      return value && ['application/pdf'].includes(value.type);
    }),
  address: Yup.string(),
  studentEmail: Yup.string().email('Invalid email'),
  verificationDocument: Yup.mixed().required(
    'Verification Document is required'
  ),
  isTypeOthers: Yup.boolean(),
  verificationDocumentType: Yup.string().when('isTypeOthers', {
    is: true,
    then: Yup.string().required('Document Type is required'),
    otherwise: Yup.string(),
  }),
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
  const [activeDocumentType, setActiveDocumentType] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const documentTypes = [
    {
      icon: 'idCard',
      name: 'ID Card & Passport',
      otherProps: { ml: 0 },
      type: 'PASSPORT',
    },
    {
      icon: 'drivingLicence',
      name: 'Driving Licence',
      type: 'DRIVING_LICENCE',
    },
    {
      icon: 'cloud',
      name: 'Others',
      otherProps: { mr: 0 },
      type: 'others',
    },
  ];

  if (isSuccess) {
    return (
      <Card
        display="flex"
        flexDirection="column"
        paddingType="default"
        alignItems="center"
      >
        <VerificationSuccess />
      </Card>
    );
  }

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
          isTypeOthers: false,
          verificationDocument: '',
          verificationDocumentType: '',
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
          })
            .then(() =>
              uploadFile({
                variables: {
                  type: activeDocumentType, // todo: this value is going undefined, find why.
                  file: values.verificationDocument, // todo: make multiple file
                  userId: Math.floor(Math.random() * 100).toString(), // todo: get userID from db when it is ready
                },
              })
            )
            .then(() => setIsSuccess(true))
            .catch(() => setIsSuccess(false));
        }}
      >
        {({ isSubmitting, errors, setFieldValue, values }) => (
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
              withOutline
            />
            <Input label="Address" name="address" type="text" />
            <Input label="Student Email" name="studentEmail" type="email" />
            {activeDocumentType === 'others' && (
              <Input
                label="Verification Document Type"
                name="verificationDocumentType"
                type="text"
              />
            )}
            <FormLabel color="paragraph">Verification Document</FormLabel>
            <Flex
              justifyContent="space-between"
              flexWrap={values.verificationDocument !== '' ? 'wrap' : 'no-wrap'}
            >
              {values.verificationDocument === ''
                ? documentTypes.map((documentType, i) => (
                    <Dropbox
                      icon={documentType.icon}
                      type={documentType.name}
                      key={i.toString()}
                      onDrop={(file, type) => {
                        setActiveDocumentType(documentType.type);
                        if (documentType.type === 'others') {
                          setFieldValue('isTypeOthers', true);
                        }
                        setFieldValue('verificationDocument', { file, type });
                      }}
                      {...documentType.otherProps}
                    />
                  ))
                : values.verificationDocument.file.map((fileInfo, i) => (
                    <FileInput
                      key={i.toString()}
                      name="verificationDocument"
                      accept="application/pdf"
                      customName={fileInfo.name}
                      withOutline
                      onDelete={(field, element) => {
                        const files = values.verificationDocument.file;
                        const deletedElementIndex = files.findIndex(
                          file => file.name === element
                        );

                        if (deletedElementIndex > -1) {
                          const result = [
                            ...files.slice(0, deletedElementIndex),
                            ...files.slice(deletedElementIndex + 1),
                          ];

                          let newData = {
                            file: result,
                            type: values.verificationDocument.type,
                          };

                          if (!result.length) newData = '';

                          setFieldValue('verificationDocument', newData);
                        }
                      }}
                      disabled
                    />
                  ))}
            </Flex>
            {isSuccess === false && (
              <Alert status="error">
                <AlertIcon />
                There was an error processing your request
                <CloseButton
                  onClick={() => setIsSuccess(undefined)}
                  position="absolute"
                  right="8px"
                  top="8px"
                />
              </Alert>
            )}
            <Box textAlign="right" mt={4}>
              <Button
                variant="outline"
                color="linkBlue"
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Apply for Verification
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default withApollo(Verification);
