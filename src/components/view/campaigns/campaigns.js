import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Stack, Flex } from '@chakra-ui/core';
import Container from '../../ui/container';
import { GET_CAMPAIGNS } from '../../../graphql/queries';
import CampaignError from '../campaign/campaign-error';
import Pagination from '../../ui/pagination';
import CampaignCardList from './campaign-card-list';

function Campaigns() {
  const [activeButton, setActiveButton] = useState('all');
  const [shouldResetPagination, setShouldResetPagination] = useState(false);
  const { t } = useTranslation('campaignList');
  const showedCampaignCount = 8;
  const { loading, error, data, refetch } = useQuery(GET_CAMPAIGNS, {
    variables: { start: 0, end: showedCampaignCount },
    fetchPolicy: 'cache-and-network',
  });
  const terms = ['all', 'LongTerm', 'ShortTerm'];

  const changeType = term => {
    setActiveButton(term);
    setShouldResetPagination(!shouldResetPagination);
    refetch({
      start: 0,
      end: showedCampaignCount,
      campaignType: term === 'all' ? undefined : term,
    });
  };

  return (
    <Container
      data-testid="campaigns-container"
      flexDir="column"
      px={{ base: 4, lg: 0 }}
    >
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      {data && (
        <Stack
          isInline
          flexDir={{ base: 'column', md: 'row' }}
          spacing={4}
          mb={4}
        >
          {terms.map((term, termIndex) => (
            <Button
              key={termIndex.toString()}
              variantColor={activeButton === term ? 'linkBlue' : 'gray'}
              variant="solid"
              mb={{ base: 2, md: 0 }}
              onClick={() => changeType(term)}
              size="sm"
              width={{ base: 'full', md: 'auto' }}
              fontWeight={400}
              isActive={term === activeButton}
              isDisabled={term === activeButton}
              _disabled={{ bg: 'linkBlue' }}
            >
              {t(`filter.${term}`, { count: 10 })}
            </Button>
          ))}
        </Stack>
      )}
      {/* <CampaignList
        error={error}
        data={filteredData || data}
        loading={loading}
      /> */}
      <Flex
        px={{ base: 4, md: 0 }}
        wrap="wrap"
        justifyContent="space-between"
        w="full"
      >
        <CampaignCardList data={data} error={error} loading={loading} />
      </Flex>
      {activeButton !== 'all' && data.campaigns.count === 0 && (
        <CampaignError
          message={{
            title: t('error.title', { term: t(`filter.${activeButton}`) }),
            desc: (
              <Trans i1showedCampaignCountnKey="error.description" count={0}>
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
      {data && data.campaigns.count > 0 && (
        <Pagination
          totalRecords={data.campaigns.count}
          pageLimit={showedCampaignCount}
          wrapperProps={{ my: 4 }}
          shouldResetPagination={shouldResetPagination}
          onPageChanged={({ currentPage }) => {
            refetch({
              start: showedCampaignCount * (currentPage - 1),
              end: showedCampaignCount,
              campaignType: activeButton === 'all' ? undefined : activeButton,
            });
          }}
        />
      )}
    </Container>
  );
}

export default Campaigns;
