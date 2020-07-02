import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Stack } from '@chakra-ui/core';
import Container from '../../ui/container';
import { GET_CAMPAIGNS } from '../../../graphql/queries';
import CampaignList from './campaign-list';
import CampaignError from '../campaign/campaign-error';

function Campaigns() {
  const [activeButton, setActiveButton] = useState('all');
  const [filteredData, setFilteredData] = useState();
  const { t } = useTranslation('campaignList');
  const { loading, error, data } = useQuery(GET_CAMPAIGNS);
  const terms = ['all', 'LongTerm', 'ShortTerm'];

  const changeType = term => {
    setActiveButton(term);

    if (data) {
      const newData = data.campaigns.filter(
        campaign => campaign.campaignType === term
      );

      setFilteredData(term === 'all' ? data : { campaigns: newData });
    }
  };

  return (
    <Container
      maxW={{
        base: 'full',
        md: 'containers.md',
      }}
      flexDir="column"
      px={{ base: 4, lg: 0 }}
    >
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      {data && (
        <Stack isInline spacing={4} mb={4}>
          {terms.map((term, termIndex) => (
            <Button
              key={termIndex.toString()}
              variantColor="linkBlue"
              variant={activeButton === term ? 'solid' : 'link'}
              onClick={() => changeType(term)}
              size="sm"
              fontWeight={500}
            >
              {t(`filter.${term}`, { count: 10 })}
            </Button>
          ))}
        </Stack>
      )}
      <CampaignList
        error={error}
        data={filteredData || data}
        loading={loading}
      />
      {filteredData && filteredData.campaigns.length < 1 && (
        <CampaignError
          message={{
            title: t('error.title', { term: t(`filter.${activeButton}`) }),
            desc: (
              <Trans i18nKey="error.description" count={0}>
                Henüz hiç destek toplanmadı. İlk destek veren olmak için
                <Button
                  variant="link"
                  onClick={() => changeType('all')}
                  verticalAlign="inherit"
                  variantColor="linkBlue"
                >
                  buraya tıkla.
                </Button>
              </Trans>
            ),
          }}
        />
      )}
    </Container>
  );
}

export default Campaigns;
