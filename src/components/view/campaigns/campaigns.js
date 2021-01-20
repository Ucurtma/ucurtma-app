import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLazyQuery } from '@apollo/client';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Stack, Flex } from '@chakra-ui/react';
import Container from '../../ui/container';
import { GET_CAMPAIGNS } from '../../../graphql/queries';
import CampaignError from '../campaign/campaign-error';
import Pagination from '../../ui/pagination';
import CampaignCardList from './campaign-card-list';

const SHOWED_CAMPAIGN_COUNT = 4;

function Campaigns() {
  const terms = ['All', 'LongTerm', 'ShortTerm'];

  const [activeButton, setActiveButton] = useState(terms[0]);
  const [shouldResetPagination, setShouldResetPagination] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { t } = useTranslation('campaignList');
  const [getCampaigns, { loading, error, data, called }] = useLazyQuery(
    GET_CAMPAIGNS
  );

  useEffect(() => {
    if (!called && getCampaigns) {
      getCampaigns({
        variables: { start: 0, end: SHOWED_CAMPAIGN_COUNT, campaignType: null },
      });
    }

    if (data) {
      setTotalCount(data.campaigns.count);
    }
  }, [getCampaigns, data, called]);

  const changeType = term => {
    setActiveButton(term);
    setShouldResetPagination(!shouldResetPagination);
    getCampaigns({
      variables: {
        start: 0,
        end: SHOWED_CAMPAIGN_COUNT,
        campaignType: term === 'All' ? null : term,
      },
    });
  };

  return (
    <Container
      data-testid="campaigns-container"
      flexDir="column"
      px={{ base: 4, lg: 0 }}
      my={8}
    >
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={2}
        mb={4}
        align="center"
      >
        {terms.map((term, termIndex) => (
          <Button
            key={termIndex.toString()}
            colorScheme={activeButton === term ? 'blue' : 'gray'}
            variant="solid"
            onClick={() => changeType(term)}
            size="md"
            width={{ base: 'full', md: 'auto' }}
            fontWeight={400}
            isActive={term === activeButton}
            isDisabled={term === activeButton}
            _disabled={{ bg: 'blue' }}
          >
            {t(`filter.${term}`, { count: 10 })}
          </Button>
        ))}
      </Stack>
      <Flex
        px={{ base: 4, md: 0 }}
        wrap="wrap"
        justifyContent="space-between"
        w="full"
      >
        <CampaignCardList data={data} error={error} loading={loading} />
      </Flex>
      {activeButton !== 'All' && data?.campaigns?.count === 0 && (
        <CampaignError
          message={{
            title: t('error.title', { term: t(`filter.${activeButton}`) }),
            desc: (
              <Trans t={t} i18nKey="error.description" count={0}>
                Henüz hiç destek toplanmadı. İlk destek veren olmak için
                <Button
                  variant="link"
                  onClick={() => changeType('All')}
                  verticalAlign="inherit"
                  colorScheme="blue"
                >
                  buraya tıkla.
                </Button>
              </Trans>
            ),
          }}
        />
      )}
      {totalCount > 0 && (
        <Pagination
          totalRecords={totalCount}
          pageLimit={SHOWED_CAMPAIGN_COUNT}
          wrapperProps={{ my: 4 }}
          shouldResetPagination={shouldResetPagination}
          onPageChanged={({ currentPage }) => {
            getCampaigns({
              variables: {
                start: SHOWED_CAMPAIGN_COUNT * (currentPage - 1),
                end: SHOWED_CAMPAIGN_COUNT,
                campaignType: activeButton === 'All' ? null : activeButton,
              },
            });
          }}
        />
      )}
    </Container>
  );
}

export default Campaigns;
