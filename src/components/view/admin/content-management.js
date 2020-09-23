import { useQuery } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/core';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { GET_CAMPAIGNS_WITH_LOWER_DETAIL } from '../../../graphql/queries';
import Card from '../../ui/card';
import SearchableStudent from '../../ui/searchable-student';

function ContentManagement() {
  const [studentSelected, setStudentSelected] = useState(false);
  const { loading, error, data } = useQuery(GET_CAMPAIGNS_WITH_LOWER_DETAIL, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('signedToken')}`,
      },
    },
  });
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
        <SearchableStudent
          loading={loading}
          error={error}
          data={data}
          onSelect={campaignId => {
            setStudentSelected(campaignId);
          }}
        />
        {studentSelected && (
          <Box>
            todo: add a table here, show posted contents for selected user.
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default ContentManagement;
