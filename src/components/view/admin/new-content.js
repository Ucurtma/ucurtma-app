import { Box, Button, Flex, FormLabel, Heading } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Card from '../../ui/card';
import Input from '../../ui/input';
import MdEditor from '../../ui/md-editor';

function NewContent() {
  const { t } = useTranslation('manager');
  const [type, setType] = useState('TEXT');

  const contentTypes = useMemo(() => {
    return ['TEXT', 'IMAGE', 'VIDEO', 'URL'];
  }, []);

  return (
    <Card paddingType="default">
      <Helmet>
        <title>{`${t('ContentList.addNew')} - Uçurtma Projesi`}</title>
      </Helmet>
      <Heading mb={4} size="sm" color="gray.600">
        {t('ContentList.addNew')}
      </Heading>
      <Box width="full" mb={4}>
        <FormLabel color="gray.600">{t(`NewContent.types.title`)}</FormLabel>
        <Flex mt={2}>
          {contentTypes.map(contentType => (
            <Button
              variant="unstyled"
              onClick={() => setType(contentType)}
              isActive={contentType === type}
              mr={4}
              p={4}
              h="unset"
              border="1px solid"
              borderColor="gray.300"
              color="gray.600"
              _active={{
                bg: 'green.100',
              }}
            >
              {t(`NewContent.types.${contentType}`)}
            </Button>
          ))}
        </Flex>
      </Box>
      <Formik
        initialValues={{
          title: '',
          content: '',
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Input name="title" label={t('NewContent.inputs.title')} />
            {type === 'TEXT' && (
              <MdEditor name="content" label={t('NewContent.inputs.text')} />
            )}
            {type === 'VIDEO' && (
              <Input name="content" label={t('NewContent.inputs.video')} />
            )}
            {type === 'URL' && (
              <Input name="content" label={t('NewContent.inputs.video')} />
            )}
            <Box w="full" textAlign="right">
              <Button
                type="submit"
                variant="outline"
                colorScheme="linkBlue"
                isLoading={isSubmitting}
                disabled={isSubmitting || !dirty || !isValid}
              >
                {t('NewContent.create')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default NewContent;
