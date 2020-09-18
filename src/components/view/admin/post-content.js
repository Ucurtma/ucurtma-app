import { Box, Heading } from '@chakra-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Card from '../../ui/card';

function PostContent() {
  const { t } = useTranslation('manager');
  return (
    <Card paddingType="default">
      <Helmet>
        <title>{`${t('PostContent.title')} - Uçurtma Projesi`}</title>
      </Helmet>
      <Heading mb={4} size="sm" color="gray.600">
        {t('PostContent.title')}
      </Heading>
      <Box mt={4}>
        Area is disabled at the moment. We&apos;re working on it.
      </Box>
    </Card>
  );
}

export default PostContent;
